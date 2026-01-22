"use client";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

// Helper: Deterministic random position based on string (tag)
function stringToVector(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const x = (Math.sin(hash) * 10);
  const y = (Math.cos(hash) * 10);
  const z = (Math.sin(hash * 2) * 5); // Flatter z-axis for better readability
  return new THREE.Vector3(x, y, z);
}

const ConnectionLines = ({ nodes }) => {
  const hoveredNode = useStore((state) => state.hoveredNode);

  // Only calculate lines for the hovered node to save performance
  const lines = useMemo(() => {
    if (!hoveredNode) return [];

    const source = nodes.find(n => n.id === hoveredNode);
    if (!source) return [];

    const connections = [];
    source.links.forEach(targetId => {
      const target = nodes.find(n => n.id === targetId);
      if (target) {
        connections.push([source.position, target.position]);
      }
    });
    return connections;
  }, [nodes, hoveredNode]);

  if (!lines.length) return null;

  return (
    <group>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line[0], ...line[1]])}
              itemSize={50}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#fffd99" transparent opacity={0.4} />
        </line>
      ))}
    </group>
  );
};

const NodePoint = ({ node }) => {
  const router = useRouter();
  const setHovered = useStore((state) => state.setHoveredNode);
  const hoveredNode = useStore((state) => state.hoveredNode);
  const isHovered = hoveredNode === node.id;

  // simplified for scaffold:
  const scale = isHovered ? 1.5 : 1;

  return (
    <group position={node.position}>
      <mesh
        onClick={() => router.push(`/nodes/${node.id}`)}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(node.id); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(null); }}
        scale={[scale, scale, scale]}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={isHovered ? "#fffd99" : "#F2EFEA"}
          emissive={isHovered ? "#fffd99" : "#000"}
          emissiveIntensity={0.9}
          roughness={0.7}
        />
      </mesh>

      {/* Label only appears on hover or close proximity */}
      <Html
        position={[0.2, 0.2, 0]}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
          width: '200px'
        }}
      >
        <div className="font-display text-text text-lg italic tracking-wide">
          {node.title}
        </div>
        <div className="font-body text-xs text-accent uppercase tracking-widest mt-1">
          {node.type}
        </div>
      </Html>
    </group>
  );
};

export default function ConstellationScene({ data }) {
  // Pre-calculate positions
  const nodesWithPos = useMemo(() => {
    return data.map(node => {
      // Cluster by primary tag, then add random jitter
      const clusterCenter = stringToVector(node.tags[0] || "void");
      const jitter = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).multiplyScalar(3);
      return { ...node, position: clusterCenter.add(jitter).toArray() };
    });
  }, [data]);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-0">
      <Canvas camera={{ position: [0, 0, 25], fov: 90 }}>
        <fog attach="fog" args={['#fffd99', 10, 40]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="##fe62da" />

        <group>
          {nodesWithPos.map(node => (
            <NodePoint key={node.id} node={node} />
          ))}
          <ConnectionLines nodes={nodesWithPos} />
        </group>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={20}
          maxDistance={50}
          autoRotate={true}
          autoRotateSpeed={0.8} // The "Drift"
        />
      </Canvas>
    </div>
  );
}