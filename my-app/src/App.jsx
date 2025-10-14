import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// --- CONFIG ---
const IMAGES = [
  // Replace these with your own images. You can use the provided image path: 
  // "/mnt/data/922d9071-cb05-4760-bc49-48ba1930d351.png" if running inside the provided environment.
 "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1000&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1000&q=80",
  "https://images.unsplash.com/photo-1505691723518-36aef3a3d6b9?w=1000&q=80",
  "https://images.unsplash.com/photo-1549187774-b4e9b0445b7d?w=1000&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1000&q=80",
  "https://images.unsplash.com/photo-1598300051094-36ec9b9f97f3?w=1000&q=80",
];

const CARD_COUNT = IMAGES.length;
const RADIUS = 3.5; // circle radius

function CardsGroup({ images }) {
  const groupRef = useRef();
  const textures = useTexture(images);
  const target = useRef(0);
  const { camera } = useThree();

  // Make page scrollable height so user can scroll to rotate
  useEffect(() => {
    document.body.style.height = "250vh"; // adjust for more/less scroll
    camera.position.set(0, 0, 8);
    return () => (document.body.style.height = "auto");
  }, [camera]);

  // scroll listener maps scroll progress to target rotation
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const t = maxScroll > 0 ? scrollTop / maxScroll : 0;
      // full circle (2PI). Multiply for a faster spin.
      target.current = t * Math.PI * 2 * 1.2;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // smooth rotate toward target
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Lerp the rotation.y
    groupRef.current.rotation.y += (target.current - groupRef.current.rotation.y) * 6 * delta;

    // subtle vertical bobbing
    groupRef.current.children.forEach((mesh, i) => {
      const offset = i * 0.6;
      mesh.rotation.z = Math.sin(state.clock.elapsedTime * 0.6 + offset) * 0.08;
      mesh.position.y = Math.sin(state.clock.elapsedTime * 0.6 + offset) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => {
        const angle = (i / CARD_COUNT) * Math.PI * 2;
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;
        const rotY = -angle + Math.PI / 2;
        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
            castShadow
            receiveShadow
          >
            <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.18} smoothness={8}>
              <meshStandardMaterial attach="material-0" map={tex} toneMapped={true} />
            </RoundedBox>
          </mesh>
        );
      })}
    </group>
  );
}

export default function ScrollRotateCardsScene() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto", background: "linear-gradient(180deg,#cbb8da,#d8bde9)" }}>
      {/* canvas is fixed so scrolling the page affects group rotation */}
      <Canvas shadows camera={{ fov: 35, position: [0, 0, 8] }} style={{ position: "fixed", inset: 0 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <CardsGroup images={IMAGES} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* UI hint that user should scroll */}
      <div style={{ position: "absolute", top: 24, left: 24, fontFamily: "sans-serif", color: "#111", fontWeight: 600 }}>
        Scroll up / down — cards will rotate
      </div>

      {/* small footer to show date / label like the design */}
      <div style={{ position: "absolute", bottom: 28, left: 28, fontFamily: "sans-serif", color: "#111" }}>
        pmnd.rs — dev collective
      </div>
    </div>
  );
}
