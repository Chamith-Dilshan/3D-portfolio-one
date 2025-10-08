import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const RotatingCube = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0x9cdba6} />

      <Sparkles
        count={100}
        size={1}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        speed={0.002}
        noise={1}
        color='red'
      />
    </mesh>
  );
};

const ReactThreeFiberDreiTest = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Canvas>
        <OrbitControls enableZoom enablePan enableRotate />
        <directionalLight
          position={[5, 5, 5]}
          intensity={10}
          color={0x9cdba6}
        />
        <color attach="background" args={["#F0F0F0"]} />

        <RotatingCube />
      </Canvas>
    </section>
  );
};

export default ReactThreeFiberDreiTest;
