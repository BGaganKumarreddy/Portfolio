import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const count = 2000;
  const mesh = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 50;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { factor, speed, xFactor, yFactor, zFactor } = particle;
      let t = (particle.t += speed / 2);
      
      const s = Math.cos(t);
      
      // Mouse interaction
      particle.mx += (state.pointer.x * 20 - particle.mx) * 0.02;
      particle.my += (state.pointer.y * 20 - particle.my) * 0.02;
      
      dummy.position.set(
        (particle.mx / 2) + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 2) + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 2) + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshStandardMaterial color="#06b6d4" roughness={0.3} emissive="#06b6d4" emissiveIntensity={0.6} />
    </instancedMesh>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.1, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.1, 0.05);
  });
  return <group ref={group}>{children}</group>;
}

export default function SpaceScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none mt-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <CameraRig>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
          <Particles />
        </CameraRig>
        <Preload all />
      </Canvas>
    </div>
  );
}


