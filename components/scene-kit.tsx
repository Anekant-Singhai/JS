"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";

// Shared palette and pieces for the three.js scenes (colours match tailwind.config.ts).
export const INK = "#111315";
export const ACCENT = "#E4572E";
export const ACCENT_SOFT = "#FBE3D9";
export const PAPER = "#F7F4EE";
export const MODEL = "#FCFBF8";

export type Point = [number, number, number];

// Bright, soft light so blocks read as a white card model: lit faces near white, far faces pale grey.
// (three.js lights are physically based, so these intensities are roughly π× what looks "normal".)
export function ModelLights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffffff", "#e9e2d4", 1.3]} />
      <directionalLight position={[-5, 9, 4]} intensity={2.6} />
    </>
  );
}

// Soft contact shadow under a w × d footprint, like the shading on a physical model.
export function SoftShadow({ w, d, clip }: { w: number; d: number; clip?: THREE.Plane[] }) {
  const m = 0.55;
  const texture = useMemo(() => {
    const size = 64;
    const data = new Uint8Array(size * size * 4);
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const x = Math.abs(((i + 0.5) / size - 0.5) * (w + m * 2)) - w / 2;
        const z = Math.abs(((j + 0.5) / size - 0.5) * (d + m * 2)) - d / 2;
        const fade = 1 - Math.min(Math.hypot(Math.max(x, 0), Math.max(z, 0)) / m, 1);
        const k = (j * size + i) * 4;
        data[k] = data[k + 1] = data[k + 2] = 255;
        data[k + 3] = fade * fade * 255;
      }
    }
    const t = new THREE.DataTexture(data, size, size);
    t.magFilter = t.minFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  }, [w, d]);
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={0.01} renderOrder={1}>
      <planeGeometry args={[w + m * 2, d + m * 2]} />
      <meshBasicMaterial map={texture} color={INK} transparent opacity={0.2} depthWrite={false} clippingPlanes={clip} />
    </mesh>
  );
}

// Thin horizontal lines marking each floor around a w × d × h block standing at y = 0.
export function FloorLines({
  w,
  d,
  h,
  color,
  opacity,
  floor = 0.32,
  clip,
}: {
  w: number;
  d: number;
  h: number;
  color: string;
  opacity: number;
  floor?: number;
  clip?: THREE.Plane[];
}) {
  const points = useMemo(() => {
    const pts: Point[] = [];
    const x = w / 2 + 0.004;
    const z = d / 2 + 0.004;
    for (let y = floor; y < h - 0.05; y += floor) {
      const c: Point[] = [[-x, y, -z], [x, y, -z], [x, y, z], [-x, y, z]];
      c.forEach((p, i) => pts.push(p, c[(i + 1) % 4]));
    }
    return pts;
  }, [w, d, h, floor]);
  if (!points.length) return null;
  return <Line points={points} segments color={color} lineWidth={1} transparent opacity={opacity} clippingPlanes={clip} />;
}
