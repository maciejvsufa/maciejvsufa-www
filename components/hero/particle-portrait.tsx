"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { clampDpr, watchVisibility } from "@/lib/browser";

/**
 * Materiał: KOLOROWY pył ze zdjęcia — każde ziarno ma barwę swojego piksela
 * (skóra, marynarka, koszula), a głębia daje światłocień 3D (front jaśniejszy,
 * tył ciemniejszy). Efekt = zdjęcie 3D złożone z punktów, nie monochromatyczna
 * rzeźba. Brak płaskiego zdjęcia pod spodem — pył ZASTĘPUJE zdjęcie.
 */

/**
 * PORTRET CAŁY Z KROPEK (wymaga WYCINANKI — przezroczyste PNG, public/portrait-cutout.png).
 * Próbkuje TYLKO sylwetkę (alpha>0.5) → kropki tworzą całą postać, bez kołowego
 * kadru i bez ucinania czubka głowy. Hover = ziarna ROZSYPUJĄ SIĘ JAK PIASEK
 * (impuls od kursora + lekka grawitacja) i osiadają sprężynowo z powrotem w bryłę.
 *
 * Gdy podany obraz NIE ma przezroczystości (zwykłe zdjęcie z tłem) — komponent
 * świadomie nic nie rysuje (żeby nie pokazać prostokąta kropek z tłem); hero
 * pokazuje wtedy statyczne zdjęcie jako fallback. Wrzuć wycinankę → ożywa.
 */
export function ParticlePortrait({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let disposed = false;
    let cleanup = () => {};

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (disposed) return;

      const maxCols = 440; // bardzo gęsto → ostra, wyraźna postać z pyłu
      const step = Math.max(1, Math.round(img.width / maxCols));
      const oc = document.createElement("canvas");
      oc.width = img.width;
      oc.height = img.height;
      const ctx = oc.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;

      // wykryj wycinankę: ile pikseli jest przezroczystych?
      let transparent = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 13) {
        total++;
        if (data[i] < 128) transparent++;
      }
      const hasCutout = total > 0 && transparent / total > 0.04;
      if (!hasCutout) {
        // brak konturu — nie rysuj prostokąta kropek; hero pokaże zdjęcie
        console.warn(
          "ParticlePortrait: brak wycinanki (przezroczystego tła) w " +
            src +
            " — wrzuć public/portrait-cutout.png, żeby kropki utworzyły całą postać.",
        );
        return;
      }

      const targetH = 17;
      const scale = targetH / img.height;
      const positions: number[] = [];
      const colors: number[] = [];

      // środek sylwetki (do reliefu „kopuły") liczony z bbox alpha
      let minX = img.width;
      let maxX = 0;
      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          if (data[(y * img.width + x) * 4 + 3] > 128) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
        }
      }
      const cxFig = (minX + maxX) / 2;
      const halfW = Math.max(1, (maxX - minX) / 2);

      const reliefDepth = 2.4;
      const domeDepth = 3.0;

      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const i = (y * img.width + x) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.16) continue; // poza sylwetką (tło) — pomiń
          // miękka krawędź: ziarna na brzegu gasną do czerni → postać WTAPIA się
          // w tło zamiast ostrego wycięcia
          const edge = Math.min(1, (a - 0.16) / 0.5);

          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          // głębia: relief z jasności + delikatna kopuła wg pozycji poziomej
          const hx = (x - cxFig) / halfW; // -1..1 w poprzek postaci
          const dome = Math.sqrt(Math.max(0, 1 - hx * hx)) * domeDepth;
          const relief = (Math.pow(lum, 0.85) - 0.5) * reliefDepth;
          const z = dome + relief;

          positions.push((x - img.width / 2) * scale, (img.height / 2 - y) * scale, z);
          // KOLOR = piksel zdjęcia; głębia → światłocień (front jaśniejszy)
          const zNorm = Math.min(1, Math.max(0, (z + 1) / 6.2));
          const shade = (0.62 + 0.6 * zNorm) * edge; // światłocień 3D × miękka krawędź
          colors.push(
            Math.min(1, r * shade),
            Math.min(1, g * shade),
            Math.min(1, b * shade),
          );
        }
      }

      const count = positions.length / 3;
      const baseArr = new Float32Array(positions);
      const posArr = new Float32Array(positions);
      const colArr = new Float32Array(colors);
      // przesunięcie (ziarno odsypane od bazy) + prędkość — fizyka piasku
      const off = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colArr, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        depthWrite: true,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geometry, material);

      let width = host.clientWidth;
      let height = host.clientHeight;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(clampDpr());
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const group = new THREE.Group();
      points.position.z = -domeDepth * 0.5;
      group.add(points);
      scene.add(group);

      const camDist = 24;
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.set(0, 0, camDist);
      let visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camDist;
      let visW = visH * camera.aspect;

      const mouse = { x: 1e9, y: 1e9 };
      const onMouseMove = (e: MouseEvent) => {
        const rect = host.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.x = (nx * visW) / 2;
        mouse.y = (ny * visH) / 2;
      };
      const onLeave = () => {
        mouse.x = 1e9;
        mouse.y = 1e9;
      };
      host.addEventListener("mousemove", onMouseMove);
      host.addEventListener("mouseleave", onLeave);

      const onResize = () => {
        width = host.clientWidth;
        height = host.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camDist;
        visW = visH * camera.aspect;
      };
      window.addEventListener("resize", onResize);
      const ro = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
      ro?.observe(host);

      const pos = geometry.attributes.position.array as Float32Array;
      const scatterR = 1.1; // mała strefa przy kursorze (wielkości kursora)
      let raf = 0;
      let t = 0;
      let last = 0;
      let running = false;
      let yaw = 0;

      const animate = (ts: number) => {
        if (!running) return;
        raf = requestAnimationFrame(animate);
        if (ts - last < 33) return; // ~30 fps
        last = ts;
        t += 0.02;

        const hasMouse = mouse.x < 1e8;
        // łagodne kołysanie + parallax (bryła żyje)
        const targetYaw = Math.sin(t * 0.14) * 0.16 + (hasMouse ? (mouse.x / visW) * 0.3 : 0);
        yaw += (targetYaw - yaw) * 0.05;
        const cy = Math.cos(-yaw);
        const mlx = hasMouse ? mouse.x * cy : 1e9;
        const mly = hasMouse ? mouse.y : 1e9;

        for (let k = 0; k < count; k++) {
          const bx = baseArr[k * 3];
          const by = baseArr[k * 3 + 1];
          const bz = baseArr[k * 3 + 2];

          let ox = off[k * 3];
          let oy = off[k * 3 + 1];
          let oz = off[k * 3 + 2];
          let vx = vel[k * 3];
          let vy = vel[k * 3 + 1];
          let vz = vel[k * 3 + 2];

          // impuls rozsypania, gdy kursor blisko (mierzone na bazie, w lokalnym XY)
          if (hasMouse) {
            const dx = bx - mlx;
            const dy = by - mly;
            const d2 = dx * dx + dy * dy;
            if (d2 < scatterR * scatterR) {
              const d = Math.sqrt(d2) || 0.0001;
              const f = (1 - d / scatterR) * 1.8; // mocny odrzut (wyraźne rozsypanie)
              vx += (dx / d) * f + (Math.random() - 0.5) * 0.4;
              vy += (dy / d) * f + (Math.random() - 0.2) * 0.4;
              vz += f * 1.4 + (Math.random() - 0.5) * 0.4;
            }
          }

          // całkowanie + SILNA sprężyna ku bazie (szybki powrót na miejsce,
          // bez czekania na ruch myszy) + tłumienie. Brak grawitacji → wraca
          // dokładnie tam, gdzie było.
          ox += vx;
          oy += vy;
          oz += vz;
          vx = vx * 0.78 - ox * 0.16;
          vy = vy * 0.78 - oy * 0.16;
          vz = vz * 0.78 - oz * 0.16;

          off[k * 3] = ox;
          off[k * 3 + 1] = oy;
          off[k * 3 + 2] = oz;
          vel[k * 3] = vx;
          vel[k * 3 + 1] = vy;
          vel[k * 3 + 2] = vz;

          const idleZ = Math.sin(bx * 0.5 + by * 0.5 + t) * 0.06;
          pos[k * 3] = bx + ox;
          pos[k * 3 + 1] = by + oy;
          pos[k * 3 + 2] = bz + oz + idleZ;
        }
        geometry.attributes.position.needsUpdate = true;
        group.rotation.y = yaw;
        renderer.render(scene, camera);
      };

      const start = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(animate);
      };
      const stop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(raf);
      };
      const stopVisibility = watchVisibility(host, (v) => (v ? start() : stop()));

      cleanup = () => {
        stop();
        stopVisibility();
        host.removeEventListener("mousemove", onMouseMove);
        host.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("resize", onResize);
        ro?.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
