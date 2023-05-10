import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";

import Loader from "./Loader";

export default function Experience({ mainRef, setShowHTML }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Canvas
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
            <Room mainRef={mainRef} />
          </>
        </Suspense>
      </Canvas>
      {!loaded && <Loader setLoaded={setLoaded} setShowHTML={setShowHTML} />}
    </>
  );
}
