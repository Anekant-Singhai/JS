"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls } from "@react-three/drei";

// Illustrative site (not a client record): an architectural "white model" on a
// contour-map terrain, blocks coloured by status, a crane, and a drone survey loop.
// Loaded lazily by components/site-model.tsx so three.js never delays the page.

const INK = "#111315";
const ACCENT = "#E4572E";
const PAPER = "#F7F4EE";
const MODEL = "#FCFBF8";
const PAD = 3; // radius of the flat building pad
const RADIUS = 7.5; // terrain radius; fades out towards the edge
const FLOOR = 0.32; // floor-to-floor height for the floor lines

type Point = [number, number, number];
type Status = "complete" | "progress" | "planned";
type Block = { id: string; x: number; z: number; w: number; d: number; h: number; status: Status; progress?: number };

const blocks: Block[] = [
  { id: "A", x: -1.2, z: -0.6, w: 1.4, d: 2.2, h: 1.6, status: "complete" },
  { id: "B", x: 0.9, z: -0.9, w: 1.8, d: 1.2, h: 2.6, status: "progress", progress: 0.62 },
  { id: "C", x: 0.75, z: 1.1, w: 2.1, d: 1.0, h: 0.96, status: "complete" },
  { id: "D", x: -1.1, z: 1.4, w: 1.1, d: 1.0, h: 1.28, status: "planned" },
];

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

// Rolling hills around a flat pad in the middle.
function height(x: number, z: number) {
  const hills =
    0.55 * Math.sin(x * 0.45 + 1.3) * Math.cos(z * 0.38 - 0.4) +
    0.35 * Math.sin((x + z) * 0.6) +
    0.25 * Math.cos(x * 0.9 - z * 0.7 + 2);
  return (hills + 1.15) * 0.55 * smoothstep(PAD, PAD + 2.4, Math.hypot(x, z));
}

const terrainVertex = /* glsl */ `
  varying vec3 vLocal;
  varying vec3 vNormal;
  void main() {
    vLocal = position;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

// Paper-coloured terrain with anti-aliased contour lines (minor every 0.1, major every 0.5),
// a faint survey grid on the pad, and a soft fade at the edge.
const terrainFragment = /* glsl */ `
  uniform vec3 uPaper;
  uniform vec3 uInk;
  uniform float uRadius;
  uniform float uPad;
  varying vec3 vLocal;
  varying vec3 vNormal;

  float isoLine(float v, float width) {
    float d = abs(fract(v - 0.5) - 0.5) / max(fwidth(v), 1e-4);
    return 1.0 - min(d / width, 1.0);
  }

  void main() {
    float r = length(vLocal.xz);
    float slope = smoothstep(0.015, 0.06, vLocal.y);
    float minor = isoLine(vLocal.y / 0.1, 1.0) * slope;
    float major = isoLine(vLocal.y / 0.5, 1.6) * slope;
    float grid = max(isoLine(vLocal.x, 1.0), isoLine(vLocal.z, 1.0)) * (1.0 - smoothstep(uPad - 0.6, uPad + 0.4, r));
    float light = clamp(dot(normalize(vNormal), normalize(vec3(-0.45, 1.0, 0.3))), 0.0, 1.0);
    vec3 col = uPaper * (0.9 + 0.1 * light);
    col = mix(col, uInk, max(max(minor * 0.22, major * 0.42), grid * 0.07));
    gl_FragColor = vec4(col, 1.0 - smoothstep(uRadius * 0.55, uRadius * 0.97, r));
    #include <colorspace_fragment>
  }
`;

function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(RADIUS * 2, RADIUS * 2, 180, 180);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) p.setY(i, height(p.getX(i), p.getZ(i)));
    g.computeVertexNormals();
    return g;
  }, []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: terrainVertex,
        fragmentShader: terrainFragment,
        transparent: true,
        uniforms: {
          uPaper: { value: new THREE.Color(PAPER) },
          uInk: { value: new THREE.Color(INK) },
          uRadius: { value: RADIUS },
          uPad: { value: PAD },
        },
      }),
    [],
  );
  return <mesh geometry={geometry} material={material} renderOrder={-1} />;
}

// Soft contact shadow under a footprint, like the shading on a physical model.
function SoftShadow({ w, d }: { w: number; d: number }) {
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
      <meshBasicMaterial map={texture} color={INK} transparent opacity={0.2} depthWrite={false} />
    </mesh>
  );
}

function FloorLines({ w, d, h, color, opacity }: { w: number; d: number; h: number; color: string; opacity: number }) {
  const points = useMemo(() => {
    const pts: Point[] = [];
    const x = w / 2 + 0.004;
    const z = d / 2 + 0.004;
    for (let y = FLOOR; y < h - 0.05; y += FLOOR) {
      const c: Point[] = [[-x, y, -z], [x, y, -z], [x, y, z], [-x, y, z]];
      c.forEach((p, i) => pts.push(p, c[(i + 1) % 4]));
    }
    return pts;
  }, [w, d, h]);
  if (!points.length) return null;
  return <Line points={points} segments color={color} lineWidth={1} transparent opacity={opacity} />;
}

function BlockModel({ b, reduce }: { b: Block; reduce: boolean }) {
  const fill = useRef<THREE.Group>(null);
  const target = b.progress ?? 1;

  // In-progress blocks "build up" to their progress once the model appears.
  useFrame(({ clock }) => {
    if (!fill.current || b.status !== "progress") return;
    const t = reduce ? 1 : Math.min(Math.max((clock.elapsedTime - 0.4) / 2.4, 0), 1);
    fill.current.scale.y = Math.max((1 - Math.pow(1 - t, 3)) * target, 0.001);
  });

  if (b.status === "planned") {
    const x = b.w / 2;
    const z = b.d / 2;
    const outline: Point[] = [[-x, 0.02, -z], [x, 0.02, -z], [x, 0.02, z], [-x, 0.02, z], [-x, 0.02, -z]];
    return (
      <group position={[b.x, 0, b.z]}>
        <Line points={outline} color={INK} lineWidth={1} dashed dashSize={0.1} gapSize={0.07} transparent opacity={0.5} />
        <mesh position-y={b.h / 2}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshBasicMaterial visible={false} />
          <Edges color={INK} transparent opacity={0.14} />
        </mesh>
      </group>
    );
  }

  const solid = (
    <mesh position-y={b.h / 2}>
      <boxGeometry args={[b.w, b.h, b.d]} />
      <meshStandardMaterial color={MODEL} roughness={0.9} />
      <Edges color={INK} transparent opacity={0.65} />
    </mesh>
  );

  return (
    <group position={[b.x, 0, b.z]}>
      <SoftShadow w={b.w} d={b.d} />
      {b.status === "complete" ? (
        <>
          {solid}
          <FloorLines w={b.w} d={b.d} h={b.h} color={INK} opacity={0.18} />
        </>
      ) : (
        <>
          <group ref={fill} scale-y={reduce ? target : 0.001}>
            {solid}
          </group>
          <mesh position-y={b.h / 2}>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshBasicMaterial visible={false} />
            <Edges color={ACCENT} transparent opacity={0.6} />
          </mesh>
          <FloorLines w={b.w} d={b.d} h={b.h} color={ACCENT} opacity={0.32} />
          <Html position={[0, b.h + 0.45, 0]} center zIndexRange={[5, 0]} className="pointer-events-none select-none">
            <div className="whitespace-nowrap rounded-full border border-line bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm">
              Block {b.id} · {Math.round(target * 100)}% built
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

function Crane({ reduce }: { reduce: boolean }) {
  const jib = useRef<THREE.Group>(null);
  const mast = 3.5;
  useFrame(({ clock }) => {
    if (jib.current && !reduce) jib.current.rotation.y = -2.55 + Math.sin(clock.elapsedTime * 0.22) * 0.45;
  });
  return (
    <group position={[2.1, 0, -1.7]}>
      <mesh position-y={mast / 2}>
        <boxGeometry args={[0.09, mast, 0.09]} />
        <meshStandardMaterial color={MODEL} />
        <Edges color={INK} transparent opacity={0.55} />
      </mesh>
      <group ref={jib} position-y={mast} rotation-y={-2.55}>
        <mesh position-x={0.6}>
          <boxGeometry args={[2.6, 0.07, 0.07]} />
          <meshStandardMaterial color={MODEL} />
          <Edges color={INK} transparent opacity={0.55} />
        </mesh>
        <mesh position={[-0.55, -0.08, 0]}>
          <boxGeometry args={[0.3, 0.16, 0.18]} />
          <meshStandardMaterial color={MODEL} />
          <Edges color={INK} transparent opacity={0.55} />
        </mesh>
        <Line points={[[1.5, -0.035, 0], [1.5, -0.95, 0]]} color={INK} lineWidth={1} transparent opacity={0.45} />
      </group>
    </group>
  );
}

// Dashed drone flight path with a small marker travelling around it.
function SurveyLoop({ reduce }: { reduce: boolean }) {
  const drone = useRef<THREE.Group>(null);
  const at = (a: number): Point => [Math.cos(a) * 3.4, 3.2, Math.sin(a) * 2.9];
  const path = useMemo(() => Array.from({ length: 129 }, (_, i) => at((i / 128) * Math.PI * 2)), []);
  useFrame(({ clock }) => {
    drone.current?.position.set(...at(reduce ? 0.8 : clock.elapsedTime * 0.3));
  });
  return (
    <>
      <Line points={path} color={INK} lineWidth={1} dashed dashSize={0.1} gapSize={0.12} transparent opacity={0.28} />
      <group ref={drone} position={at(0.8)}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.15} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

function Site({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !reduce) group.current.rotation.y += delta * 0.06;
  });
  return (
    <group ref={group} position-y={-1.2}>
      <Terrain />
      {blocks.map((b) => (
        <BlockModel key={b.id} b={b} reduce={reduce} />
      ))}
      <Crane reduce={reduce} />
      <SurveyLoop reduce={reduce} />
    </group>
  );
}

export default function SiteModelScene({
  active,
  reduce,
  interactive,
  onReady,
}: {
  active: boolean;
  reduce: boolean;
  interactive: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      frameloop={!active ? "never" : reduce ? "demand" : "always"}
      camera={{ position: [10, 7.5, 10], fov: 28, near: 1, far: 60 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={onReady}
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-ink-3">
          The 3D preview isn&apos;t supported on this device.
        </div>
      }
    >
      {/* Bright, soft light so the blocks read as a white card model: lit faces near white, far faces pale grey. */}
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffffff", "#e9e2d4", 1.3]} />
      <directionalLight position={[-5, 9, 4]} intensity={2.6} />
      <Site reduce={reduce} />
      {/* Drag-to-rotate on mouse/trackpad only, so the model never traps page scrolling on phones. */}
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          rotateSpeed={0.5}
          minPolarAngle={0.75}
          maxPolarAngle={1.25}
        />
      )}
    </Canvas>
  );
}
