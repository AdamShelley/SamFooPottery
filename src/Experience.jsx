import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <Canvas
      flat
      camera={{ fov: 45, near: 0.1, far: 200, position: [2, 3, 10] }}
    >
      <color args={["#dfdfd9"]} attach="background" />
      <OrbitControls
        makeDefault
        enableDamping
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <ambientLight intensity={3} />
      <Room />
    </Canvas>
  );
}
