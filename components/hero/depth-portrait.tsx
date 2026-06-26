"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { clampDpr, watchVisibility } from "@/lib/browser";

/**
 * PORTRET 2.5D „ŻYWE ZDJĘCIE" — fotorealistyczny, subtelny.
 * NIE obracamy bryły (to wygląda plastikowo). Zamiast tego: PARALLAX W PIKSELACH
 * wg mapy głębi — bliższe partie (klapa, bark) przesuwają się inaczej niż dalsze
 * (tło twarzy), gdy ruszasz kursorem. Zdjęcie pozostaje ostre i NIEZMIENIONE
 * kolorystycznie (zero podbijania kontrastu). Premium, jak żywa fotografia.
 *
 * color = wycinanka (alpha = sylwetka), depth = mapa głębi (0 głębia .. 1 przód).
 */
export function DepthPortrait({
  color = "/portrait-cutout.png",
  depth = "/portrait-depth.png",
}: {
  color?: string;
  depth?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest(".portrait-wrap") as HTMLElement | null;
    if (!canvas || !host) return;

    let disposed = false;
    let cleanup = () => {};

    const loader = new THREE.TextureLoader();
    Promise.all([loader.loadAsync(color), loader.loadAsync(depth)])
      .then(([colorTex, depthTex]) => {
        if (disposed) return;

        let width = host.clientWidth;
        let height = host.clientHeight;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(clampDpr(2));
        renderer.setSize(width, height, false);
        renderer.setClearColor(0x000000, 0);

        const maxAniso = renderer.capabilities.getMaxAnisotropy();
        colorTex.colorSpace = THREE.SRGBColorSpace;
        colorTex.minFilter = THREE.LinearMipmapLinearFilter;
        colorTex.magFilter = THREE.LinearFilter;
        colorTex.generateMipmaps = true;
        colorTex.anisotropy = maxAniso;
        depthTex.minFilter = THREE.LinearFilter;
        depthTex.magFilter = THREE.LinearFilter;

        const iw = colorTex.image.width as number;
        const ih = colorTex.image.height as number;
        const imgAspect = iw / ih;

        const material = new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            uColor: { value: colorTex },
            uDepth: { value: depthTex },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uStrength: { value: 0.11 },
          },
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            precision highp float;
            uniform sampler2D uColor;
            uniform sampler2D uDepth;
            uniform vec2 uMouse;
            uniform float uStrength;
            varying vec2 vUv;
            void main() {
              float d = texture2D(uDepth, vUv).r;          // 0 głębia .. 1 przód
              // bliższe partie przesuwają się mocniej (parallax)
              vec2 off = (d - 0.5) * uStrength * uMouse;
              vec2 uv = vUv + off;
              vec4 c = texture2D(uColor, uv);
              if (c.a < 0.5) discard;                      // poza sylwetką
              gl_FragColor = c;                            // kolor zdjęcia 1:1
            }
          `,
        });

        // płaski quad dopasowany do proporcji obrazu (object-contain w kadrze)
        const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
        const mesh = new THREE.Mesh(geometry, material);
        const scene = new THREE.Scene();
        scene.add(mesh);
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const fit = () => {
          width = host.clientWidth;
          height = host.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          const viewAspect = width / height;
          // contain: skaluj quad, by obraz mieścił się w kadrze bez rozciągania
          let sx = 1;
          let sy = 1;
          if (viewAspect > imgAspect) sx = imgAspect / viewAspect;
          else sy = viewAspect / imgAspect;
          mesh.scale.set(sx, sy, 1);
          // object-bottom: dół sylwetki przy dolnej krawędzi kadru (jak CSS object-bottom)
          mesh.position.y = viewAspect > imgAspect ? 0 : -1 + sy;
        };
        fit();

        const target = new THREE.Vector2(0, 0);
        const cur = new THREE.Vector2(0, 0);
        let hasMouse = false;
        const onMove = (e: MouseEvent) => {
          const r = host.getBoundingClientRect();
          target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
          target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
          hasMouse = true;
        };
        const onLeave = () => {
          hasMouse = false;
        };
        host.addEventListener("mousemove", onMove);
        host.addEventListener("mouseleave", onLeave);

        window.addEventListener("resize", fit);
        const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null;
        ro?.observe(host);

        let raf = 0;
        let last = 0;
        let running = false;
        let t = 0;

        const animate = (ts: number) => {
          if (!running) return;
          raf = requestAnimationFrame(animate);
          if (ts - last < 33) return; // ~30 fps
          last = ts;
          t += 0.02;
          // bez kursora — bardzo wolny, ledwie wyczuwalny dryf (żywa fotografia)
          if (!hasMouse) {
            target.x = Math.sin(t * 0.12) * 0.28;
            target.y = Math.cos(t * 0.1) * 0.18;
          }
          cur.lerp(target, 0.07);
          material.uniforms.uMouse.value.copy(cur);
          renderer.render(scene, camera);
        };
        const start = () => {
          if (running) return;
          running = true;
          raf = requestAnimationFrame(animate);
        };
        const stop = () => {
          running = false;
          cancelAnimationFrame(raf);
        };
        const stopVisibility = watchVisibility(host, (v) => (v ? start() : stop()));
        start();

        cleanup = () => {
          stop();
          stopVisibility();
          host.removeEventListener("mousemove", onMove);
          host.removeEventListener("mouseleave", onLeave);
          window.removeEventListener("resize", fit);
          ro?.disconnect();
          geometry.dispose();
          material.dispose();
          colorTex.dispose();
          depthTex.dispose();
          renderer.dispose();
        };
      })
      .catch(() => {
        /* WebGL niedostępny — zostaje statyczne zdjęcie pod spodem */
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [color, depth]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
