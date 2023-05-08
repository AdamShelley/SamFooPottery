import { Center, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useRef } from "react";

export default function Room() {
  const { nodes } = useGLTF("./room/model5.glb");
  const baked = useTexture("./room/texture.png");
  const model = useRef();
  const rotateObjects = useRef();

  baked.flipY = false;

  let lerp = {
    current: 0,
    target: 0,
    ease: 0.1,
  };

  useFrame((state) => {
    window.addEventListener("mousemove", (e) => {
      let rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth -
        Math.PI * 2;

      lerp.target = rotation * 0.1;

      state.camera.updateProjectionMatrix();

      lerp.current = gsap.utils.interpolate(
        lerp.current,
        lerp.target,
        lerp.ease
      );

      model.current.rotation.y = lerp.target + Math.PI;
    });
  });

  return (
    <>
      <Center>
        <group dispose={null} ref={model} rotation={[0, Math.PI * -1.25, 0]}>
          <mesh ref={rotateObjects} geometry={nodes.wheel.geometry}>
            <meshBasicMaterial map={baked} />
          </mesh>
          <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={baked} />
          </mesh>
        </group>
      </Center>
    </>
  );
}
