"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { clampDpr, watchVisibility } from "@/lib/browser";

/**
 * TEKSTUROWANY ODLEW 3D z kropek.
 * Ładuje mesh (.glb z TRELLIS/Hunyuan — front niesie likeness ze zdjęcia),
 * gęsto próbkuje POWIERZCHNIĘ na chmurę punktów i koloruje każdy punkt kolorem
 * z tekstury (UV) → widać twarz/zarost/oczy, a bryła ma realną głębię 3D.
 * Kursor rzeźbi formę wzdłuż normalnej; powolne auto-kołysanie + parallax myszy.
 * aria-hidden, dekoracyjne, pauzuje poza ekranem. Desktop only (mobile = foto).
 *
 * STROJENIE (po wrzuceniu realnego .glb dostroimy z Maciejem):
 *  - SAMPLES: gęstość punktów (im więcej, tym wyraźniejsza twarz, ale wolniej)
 *  - POINT_SIZE: wielkość kropki
 *  - ROT_X/ROT_Y: korekta orientacji mesha (TRELLIS bywa obrócony)
 *  - TARGET_H: docelowa wysokość bryły w jednostkach sceny
 */
const SAMPLES = 48000;
const POINT_SIZE = 0.04;
const TARGET_H = 15;
const ROT_X = 0;
const ROT_Y = 0;

export function ParticleCast({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let disposed = false;
    let cleanup = () => {};

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (disposed) return;

        // 1) zbierz wszystkie meshe + przygotuj próbniki powierzchni
        type Entry = { sampler: MeshSurfaceSampler; tex: ImageData | null; area: number };
        const entries: Entry[] = [];
        const tmpA = new THREE.Vector3();
        const tmpB = new THREE.Vector3();
        const tmpC = new THREE.Vector3();

        gltf.scene.updateMatrixWorld(true);
        gltf.scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!mesh.isMesh) return;
          const geom = mesh.geometry as THREE.BufferGeometry;
          geom.applyMatrix4(mesh.matrixWorld); // upiecz transform świata w geometrię

          // tekstura → ImageData (do czytania koloru po UV)
          const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as
            | THREE.MeshStandardMaterial
            | undefined;
          const map = mat?.map;
          const image = map?.image as
            | (CanvasImageSource & { width: number; height: number })
            | undefined;
          let tex: ImageData | null = null;
          if (image) {
            const tc = document.createElement("canvas");
            tc.width = image.width;
            tc.height = image.height;
            const tctx = tc.getContext("2d", { willReadFrequently: true });
            if (tctx) {
              tctx.drawImage(image, 0, 0);
              tex = tctx.getImageData(0, 0, tc.width, tc.height);
            }
          }

          // przybliżone pole powierzchni (do podziału próbek między meshe)
          let area = 0;
          const pos = geom.attributes.position;
          const idx = geom.index;
          if (idx) {
            for (let i = 0; i < idx.count; i += 3) {
              tmpA.fromBufferAttribute(pos, idx.getX(i));
              tmpB.fromBufferAttribute(pos, idx.getX(i + 1));
              tmpC.fromBufferAttribute(pos, idx.getX(i + 2));
              area += tmpB.sub(tmpA).cross(tmpC.sub(tmpA)).length() * 0.5;
            }
          } else area = 1;

          const sampler = new MeshSurfaceSampler(mesh).build();
          entries.push({ sampler, tex, area });
        });

        if (!entries.length) return;
        const totalArea = entries.reduce((s, e) => s + e.area, 0) || 1;

        // 2) próbkowanie: pozycje, kolory (z tekstury po UV), normalne
        const positions = new Float32Array(SAMPLES * 3);
        const colors = new Float32Array(SAMPLES * 3);
        const normals = new Float32Array(SAMPLES * 3);
        const p = new THREE.Vector3();
        const n = new THREE.Vector3();
        const col = new THREE.Color();
        const uv = new THREE.Vector2();

        let k = 0;
        for (const e of entries) {
          const nSamp = e === entries[entries.length - 1] ? SAMPLES - k : Math.round((e.area / totalArea) * SAMPLES);
          for (let s = 0; s < nSamp && k < SAMPLES; s++, k++) {
            e.sampler.sample(p, n, col, uv);
            positions[k * 3] = p.x;
            positions[k * 3 + 1] = p.y;
            positions[k * 3 + 2] = p.z;
            normals[k * 3] = n.x;
            normals[k * 3 + 1] = n.y;
            normals[k * 3 + 2] = n.z;
            if (e.tex) {
              const tx = Math.min(e.tex.width - 1, Math.max(0, Math.floor(uv.x * e.tex.width)));
              const ty = Math.min(e.tex.height - 1, Math.max(0, Math.floor((1 - uv.y) * e.tex.height)));
              const ti = (ty * e.tex.width + tx) * 4;
              colors[k * 3] = e.tex.data[ti] / 255;
              colors[k * 3 + 1] = e.tex.data[ti + 1] / 255;
              colors[k * 3 + 2] = e.tex.data[ti + 2] / 255;
            } else {
              colors[k * 3] = col.r;
              colors[k * 3 + 1] = col.g;
              colors[k * 3 + 2] = col.b;
            }
          }
        }

        // 3) wycentruj i przeskaluj bryłę do TARGET_H
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.computeBoundingBox();
        const bb = geometry.boundingBox!;
        const center = new THREE.Vector3();
        bb.getCenter(center);
        const size = new THREE.Vector3();
        bb.getSize(size);
        const scale = TARGET_H / (size.y || 1);
        for (let i = 0; i < SAMPLES; i++) {
          positions[i * 3] = (positions[i * 3] - center.x) * scale;
          positions[i * 3 + 1] = (positions[i * 3 + 1] - center.y) * scale;
          positions[i * 3 + 2] = (positions[i * 3 + 2] - center.z) * scale;
        }
        geometry.attributes.position.needsUpdate = true;
        const baseArr = positions.slice();

        const material = new THREE.PointsMaterial({
          size: POINT_SIZE,
          vertexColors: true,
          transparent: true,
          opacity: 1,
          depthWrite: true,
          sizeAttenuation: true,
        });
        const points = new THREE.Points(geometry, material);
        points.rotation.x = ROT_X;

        // 4) scena
        let width = host.clientWidth;
        let height = host.clientHeight;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(clampDpr());
        renderer.setSize(width, height, false);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const group = new THREE.Group();
        group.add(points);
        scene.add(group);

        const camDist = 22;
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.set(0, 0, camDist);
        let visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camDist;
        let visW = visH * camera.aspect;

        const mouse = { x: 1e9, y: 1e9 };
        const onMouseMove = (ev: MouseEvent) => {
          const rect = host.getBoundingClientRect();
          const nx = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
          const ny = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
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
        const radius = 2.6;
        let raf = 0;
        let t = 0;
        let last = 0;
        let running = false;
        let yaw = ROT_Y;
        let pitch = 0;

        const animate = (ts: number) => {
          if (!running) return;
          raf = requestAnimationFrame(animate);
          if (ts - last < 33) return; // ~30 fps
          last = ts;
          t += 0.02;

          const hasMouse = mouse.x < 1e8;
          const targetYaw = ROT_Y + Math.sin(t * 0.16) * 0.26 + (hasMouse ? (mouse.x / visW) * 0.5 : 0);
          const targetPitch = hasMouse ? (mouse.y / visH) * -0.32 : Math.sin(t * 0.11) * 0.04;
          yaw += (targetYaw - yaw) * 0.05;
          pitch += (targetPitch - pitch) * 0.05;

          // mysz (świat) → lokalny XY bryły (odwrotny obrót wokół Y)
          const cy = Math.cos(-yaw);
          const mlx = hasMouse ? mouse.x * cy : 1e9;
          const mly = hasMouse ? mouse.y : 1e9;

          for (let i = 0; i < SAMPLES; i++) {
            const bx = baseArr[i * 3];
            const by = baseArr[i * 3 + 1];
            const bz = baseArr[i * 3 + 2];
            const nx = normals[i * 3];
            const ny = normals[i * 3 + 1];
            const nz = normals[i * 3 + 2];
            const idle = Math.sin(bx * 0.5 + by * 0.5 + t) * 0.06;

            let push = idle;
            if (hasMouse) {
              const dx = bx - mlx;
              const dy = by - mly;
              const d2 = dx * dx + dy * dy;
              if (d2 < radius * radius) {
                const d = Math.sqrt(d2) || 0.0001;
                push += (1 - d / radius) * 1.8;
              }
            }
            // rzeźbienie wzdłuż NORMALNEJ (bryła nie spłaszcza się)
            const tx = bx + nx * push;
            const ty = by + ny * push;
            const tz = bz + nz * push;
            pos[i * 3] += (tx - pos[i * 3]) * 0.16;
            pos[i * 3 + 1] += (ty - pos[i * 3 + 1]) * 0.16;
            pos[i * 3 + 2] += (tz - pos[i * 3 + 2]) * 0.16;
          }
          geometry.attributes.position.needsUpdate = true;
          group.rotation.y = yaw;
          group.rotation.x = pitch;
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
      },
      undefined,
      (err) => {
        // brak pliku .glb (jeszcze nie wygenerowany) — cicho, hero pokazuje foto
        console.warn("ParticleCast: nie wczytano mesha", src, err);
      },
    );

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
