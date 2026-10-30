"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Line } from "@react-three/drei";
import { ACCENT, ACCENT_SOFT, FloorLines, INK, MODEL, ModelLights, SoftShadow, type Point } from "./scene-kit";

// Hero "digital twin" (illustrative): a drifting point cloud of a small district
// snaps into place and becomes a white model as a scan plane sweeps up through it,
// then dissolves back, on a loop. Loaded by components/hero-model.tsx.

const PLINTH = 3.4; // radius of the round model base
const BOTTOM = -0.6; // scan rests below the base...
const TOP = 5.4; // ...and finishes above the spire
const CYCLE = 16; // seconds per build-and-dissolve loop
const SPIRE: [Point, Point] = [[0, 4.5, 0], [0, 5.15, 0]];
const DOWN = new THREE.Vector3(0, -1, 0);

type Tier = { w: number; d: number; h: number };
type Box = Tier & { x: number; y: number; z: number };

const towers: { x: number; z: number; tiers: Tier[] }[] = [
  { x: 0, z: 0, tiers: [{ w: 1.3, d: 1.3, h: 2.2 }, { w: 1.05, d: 1.05, h: 1.4 }, { w: 0.75, d: 0.75, h: 0.9 }] },
  { x: -1.55, z: -0.25, tiers: [{ w: 1.0, d: 1.7, h: 2.3 }] },
  { x: 1.5, z: 0.35, tiers: [{ w: 1.0, d: 1.1, h: 2.0 }, { w: 0.8, d: 0.8, h: 0.9 }] },
  { x: 0.15, z: -1.6, tiers: [{ w: 1.7, d: 0.9, h: 1.5 }] },
  { x: -0.2, z: 1.55, tiers: [{ w: 1.4, d: 0.9, h: 1.0 }] },
  { x: 1.55, z: -1.45, tiers: [{ w: 0.9, d: 0.9, h: 2.6 }] },
  { x: -1.6, z: 1.5, tiers: [{ w: 1.0, d: 1.0, h: 0.7 }] },
  { x: 1.45, z: 1.65, tiers: [{ w: 1.0, d: 0.9, h: 1.3 }] },
  { x: -1.55, z: -1.75, tiers: [{ w: 1.0, d: 0.75, h: 1.1 }] },
];

// Stack each tower's tiers into boxes.
const boxes: Box[] = towers.flatMap((t) => {
  let y = 0;
  return t.tiers.map((tier) => {
    const box = { x: t.x, y, z: t.z, ...tier };
    y += tier.h;
    return box;
  });
});

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Scan height over one loop: rest, build up (7s), hold, dissolve down (2.2s), rest.
function scanAt(t: number) {
  const c = t % CYCLE;
  if (c < 1.2) return BOTTOM;
  if (c < 8.2) return BOTTOM + (TOP - BOTTOM) * easeInOut((c - 1.2) / 7);
  if (c < 12.4) return TOP;
  if (c < 14.6) return TOP - (TOP - BOTTOM) * easeInOut((c - 12.4) / 2.2);
  return BOTTOM;
}

// Small seeded random so the point cloud is identical on every visit.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Points on every visible surface and edge of the district, each with a random seed and drift direction.
function buildCloud() {
  const rand = mulberry32(42);
  const pos: number[] = [];
  const seed: number[] = [];
  const dir: number[] = [];
  const add = ([x, y, z]: Point) => {
    pos.push(x, y, z);
    seed.push(rand());
    const a = rand() * Math.PI * 2;
    const u = rand() * 2 - 1;
    const s = Math.sqrt(1 - u * u);
    dir.push(s * Math.cos(a), u, s * Math.sin(a));
  };
  const surface = (area: number, at: (u: number, v: number) => Point, density = 220) => {
    for (let i = Math.round(area * density); i > 0; i--) add(at(rand(), rand()));
  };
  const edge = (a: Point, b: Point) => {
    const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) / 0.02);
    for (let i = 0; i <= n; i++) add([a[0] + (b[0] - a[0]) * (i / n), a[1] + (b[1] - a[1]) * (i / n), a[2] + (b[2] - a[2]) * (i / n)]);
  };

  for (const b of boxes) {
    const [x0, x1, z0, z1, y0, y1] = [b.x - b.w / 2, b.x + b.w / 2, b.z - b.d / 2, b.z + b.d / 2, b.y, b.y + b.h];
    surface(b.w * b.d, (u, v) => [x0 + u * b.w, y1, z0 + v * b.d]);
    surface(b.d * b.h, (u, v) => [x0, y0 + u * b.h, z0 + v * b.d]);
    surface(b.d * b.h, (u, v) => [x1, y0 + u * b.h, z0 + v * b.d]);
    surface(b.w * b.h, (u, v) => [x0 + u * b.w, y0 + v * b.h, z0]);
    surface(b.w * b.h, (u, v) => [x0 + u * b.w, y0 + v * b.h, z1]);
    const corners = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
    corners.forEach(([x, z], i) => {
      const [nx, nz] = corners[(i + 1) % 4];
      edge([x, y1, z], [nx, y1, nz]);
      edge([x, y0, z], [x, y1, z]);
    });
  }
  surface(Math.PI * PLINTH * PLINTH, (u, v) => {
    const r = PLINTH * Math.sqrt(u);
    return [r * Math.cos(v * Math.PI * 2), 0, r * Math.sin(v * Math.PI * 2)];
  }, 70);
  for (let i = 0; i < 1400; i++) {
    const a = (i / 1400) * Math.PI * 2;
    add([Math.cos(a) * PLINTH, -rand() * 0.16, Math.sin(a) * PLINTH]);
  }
  edge(...SPIRE);

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(new Float32Array(seed), 1));
  g.setAttribute("aDir", new THREE.BufferAttribute(new Float32Array(dir), 3));
  return g;
}

// Points above the scan drift loosely (further the higher they are) and snap into
// place as it arrives, glowing in the accent colour; once passed, they vanish and the solid shows.
const cloudVertex = /* glsl */ `
  uniform float uScan;
  uniform float uTime;
  uniform float uSize;
  attribute float aSeed;
  attribute vec3 aDir;
  varying float vAlpha;
  varying float vGlow;
  void main() {
    float d = position.y - uScan;
    float pending = smoothstep(-0.02, 0.05, d);
    float loose = smoothstep(0.0, 2.5, d);
    vec3 p = position + aDir * (0.015 + 0.16 * loose) * pending;
    p.y += sin(uTime * 0.9 + aSeed * 6.2831) * 0.02 * pending;
    vGlow = exp(-abs(d) * 9.0);
    vAlpha = pending * (0.14 + 0.3 * aSeed + 0.7 * vGlow);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.7 + 0.7 * aSeed + 1.4 * vGlow) / -mv.z;
  }
`;

const cloudFragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vGlow;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    gl_FragColor = vec4(mix(uInk, uAccent, min(vGlow * 1.3, 1.0)), vAlpha * smoothstep(0.5, 0.15, r));
    #include <colorspace_fragment>
  }
`;

// Round gradient used for the floor shadow and the scan sheet.
function radialTexture(inner: number) {
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      const r = Math.hypot((i + 0.5) / size - 0.5, (j + 0.5) / size - 0.5) * 2;
      const fade = 1 - THREE.MathUtils.smoothstep(r, inner, 1);
      const k = (j * size + i) * 4;
      data[k] = data[k + 1] = data[k + 2] = 255;
      data[k + 3] = fade * fade * 255;
    }
  }
  const t = new THREE.DataTexture(data, size, size);
  t.magFilter = t.minFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

function usePointer(enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled]);
  return pointer;
}

function Twin({ reduce, parallax, onProgress }: { reduce: boolean; parallax: boolean; onProgress: (built: number) => void }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const sheet = useRef<THREE.Group>(null);
  const slices = useRef<(THREE.Group | null)[]>([]);
  const shadow = useRef<THREE.MeshBasicMaterial>(null);
  const beacon = useRef<THREE.MeshBasicMaterial>(null);
  const lastPct = useRef(-1);
  const pointer = usePointer(parallax);
  const dpr = useThree((s) => s.viewport.dpr);

  // Solids, edges and floor lines are all clipped to what lies below the scan.
  const clip = useMemo(() => [new THREE.Plane(DOWN.clone(), TOP)], []);
  const cloudGeometry = useMemo(buildCloud, []);
  const cloud = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: cloudVertex,
        fragmentShader: cloudFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uScan: { value: BOTTOM },
          uTime: { value: 0 },
          uSize: { value: 34 },
          uInk: { value: new THREE.Color(INK) },
          uAccent: { value: new THREE.Color(ACCENT) },
        },
      }),
    [],
  );
  const floorTexture = useMemo(() => radialTexture(0.1), []);
  const sheetTexture = useMemo(() => radialTexture(0.75), []);
  const ring = useMemo(
    () => Array.from({ length: 129 }, (_, i): Point => [Math.cos((i / 128) * Math.PI * 2) * (PLINTH + 0.15), 0, Math.sin((i / 128) * Math.PI * 2) * (PLINTH + 0.15)]),
    [],
  );
  const streets = useMemo(() => {
    const pts: Point[] = [];
    for (let k = -3; k <= 3; k += 0.5) {
      const half = Math.sqrt(PLINTH * PLINTH - k * k) - 0.05;
      pts.push([k, 0.003, -half], [k, 0.003, half], [-half, 0.003, k], [half, 0.003, k]);
    }
    return pts;
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const scan = reduce ? TOP : scanAt(t);
    const built = (scan - BOTTOM) / (TOP - BOTTOM);

    if (spin.current && !reduce) spin.current.rotation.y += delta * 0.07;
    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, pointer.current.x * 0.35, 3, delta);
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, pointer.current.y * 0.08, 3, delta);
    }
    if (spin.current) {
      spin.current.updateWorldMatrix(true, false);
      clip[0].set(DOWN, scan).applyMatrix4(spin.current.matrixWorld);
    }

    cloud.uniforms.uScan.value = scan;
    cloud.uniforms.uTime.value = t;
    cloud.uniforms.uSize.value = 34 * dpr;

    boxes.forEach((b, i) => {
      const s = slices.current[i];
      if (!s) return;
      s.visible = scan > b.y + 0.01 && scan < b.y + b.h;
      s.position.y = scan;
    });
    if (sheet.current) {
      sheet.current.visible = scan > BOTTOM + 0.05 && scan < TOP - 0.05;
      sheet.current.position.y = scan;
    }
    if (shadow.current) shadow.current.opacity = 0.05 + 0.13 * built;
    if (beacon.current) beacon.current.opacity = scan >= TOP - 0.01 ? (reduce ? 0.9 : 0.55 + 0.45 * Math.sin(t * 3)) : 0;

    const pct = Math.round(built * 100);
    if (pct !== lastPct.current) {
      lastPct.current = pct;
      onProgress(built);
    }
  });

  return (
    <group ref={tilt}>
      <group position-y={-1.9}>
        <mesh rotation-x={-Math.PI / 2} position-y={-0.5}>
          <planeGeometry args={[PLINTH * 2.6, PLINTH * 2.6]} />
          <meshBasicMaterial ref={shadow} map={floorTexture} color={INK} transparent opacity={0.05} depthWrite={false} />
        </mesh>

        <group ref={spin}>
          <mesh position-y={-0.08}>
            <cylinderGeometry args={[PLINTH, PLINTH, 0.16, 96]} />
            <meshStandardMaterial color={MODEL} roughness={0.9} clippingPlanes={clip} />
            <Edges color={INK} transparent opacity={0.45} clippingPlanes={clip} />
          </mesh>
          <Line points={streets} segments color={INK} lineWidth={1} transparent opacity={0.07} clippingPlanes={clip} />

          {boxes.map((b, i) => (
            <group key={i} position={[b.x, b.y, b.z]}>
              {b.y === 0 && <SoftShadow w={b.w} d={b.d} clip={clip} />}
              <mesh position-y={b.h / 2}>
                <boxGeometry args={[b.w, b.h, b.d]} />
                <meshStandardMaterial color={MODEL} roughness={0.9} clippingPlanes={clip} />
                <Edges color={INK} transparent opacity={0.6} clippingPlanes={clip} />
              </mesh>
              <FloorLines w={b.w} d={b.d} h={b.h} color={INK} opacity={0.16} floor={0.3} clip={clip} />
            </group>
          ))}
          <Line points={SPIRE} color={INK} lineWidth={1} transparent opacity={0.6} clippingPlanes={clip} />
          <mesh position={[0, SPIRE[1][1] + 0.03, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial ref={beacon} color={ACCENT} transparent opacity={0} />
          </mesh>

          {/* The glowing slice where the scan cuts through each block. */}
          {boxes.map((b, i) => (
            <group key={i} ref={(el) => void (slices.current[i] = el)} position={[b.x, BOTTOM, b.z]} visible={false}>
              <mesh rotation-x={-Math.PI / 2}>
                <planeGeometry args={[b.w, b.d]} />
                <meshBasicMaterial color={ACCENT_SOFT} />
              </mesh>
              <Line
                points={[[-b.w / 2, 0.002, -b.d / 2], [b.w / 2, 0.002, -b.d / 2], [b.w / 2, 0.002, b.d / 2], [-b.w / 2, 0.002, b.d / 2], [-b.w / 2, 0.002, -b.d / 2]]}
                color={ACCENT}
                lineWidth={1.5}
              />
            </group>
          ))}

          {/* Scan sheet: a faint accent plane with a ring, rising through the model. */}
          <group ref={sheet} position-y={BOTTOM} visible={false}>
            <mesh rotation-x={-Math.PI / 2} renderOrder={2}>
              <planeGeometry args={[(PLINTH + 0.35) * 2, (PLINTH + 0.35) * 2]} />
              <meshBasicMaterial map={sheetTexture} color={ACCENT} transparent opacity={0.05} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            <Line points={ring} color={ACCENT} lineWidth={1} transparent opacity={0.5} />
          </group>

          <points geometry={cloudGeometry} material={cloud} frustumCulled={false} />
        </group>
      </group>
    </group>
  );
}

export default function HeroScene({
  active,
  reduce,
  parallax,
  onReady,
  onProgress,
}: {
  active: boolean;
  reduce: boolean;
  parallax: boolean;
  onReady: () => void;
  onProgress: (built: number) => void;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      frameloop={!active ? "never" : reduce ? "demand" : "always"}
      camera={{ position: [12.8, 7.3, 12.8], fov: 30, near: 1, far: 80 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
        onReady();
      }}
      fallback={null}
    >
      <ModelLights />
      {/* Fill from the viewer's side: the model turns, so the faces you see never fall into deep shade. */}
      <directionalLight position={[9, 4, 11]} intensity={1.1} />
      <Twin reduce={reduce} parallax={parallax} onProgress={onProgress} />
    </Canvas>
  );
}
