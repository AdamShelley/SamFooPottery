import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";

import Loader from "./Loader";
import Background from "./Background";

export default function Experience({ mainRef, setShowHTML }) {
  const [loaded, setLoaded] = useState(false);

  const square1 = useRef();
  const square2 = useRef();

  return (
    <>
      <Canvas
        shadows
        flat
        camera={{ fov: 45, near: 0.1, far: 200, position: [2, 3, 10] }}
      >
        <Suspense fallback={null}>
          <color args={["#F7F0E1"]} attach="background" />
          <>
            <OrbitControls
              makeDefault
              enableDamping
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
            <Room mainRef={mainRef} square1={square1} square2={square2} />
            <ambientLight intensity={2} position={[1, 1, 1]} />
            <Background square1={square1} square2={square2} />
            {/* <Text
              color="blue"
              anchorX="center"
              anchorY="middle"
              scale={0.5}
              position={[2, 2, 1]}
            >
              Portfolio
            </Text> */}
          </>
        </Suspense>
      </Canvas>
      {!loaded && <Loader setLoaded={setLoaded} setShowHTML={setShowHTML} />}
    </>
  );
}
