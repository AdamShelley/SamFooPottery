import * as THREE from "three";
import { Center, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Room({ mainRef }) {
  const { scene, nodes } = useGLTF("./room/model6.glb");
  const baked = useTexture("./room/texture.png");
  const model = useRef();
  const rotateObjects = useRef();
  const { camera } = useThree();
  gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    if (mainRef) {
      let ctx = gsap.context(() => {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".header-section",
            start: "top top",
            endTrigger: ".section1",
            end: "bottom bottom",
            // snap: 1,
            scrub: 1.5,
            // markers: true,
          },
        });
        tl1
          .to(
            model.current.position,
            {
              x: () => 2,
              duration: 5,
            },
            "same"
          )
          .to(
            model.current.scale,
            {
              x: 0.7,
              y: 0.7,
              z: 0.7,
              ease: "power3.out",
              duration: 5,
            },
            "same"
          );

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            endTrigger: ".section2",
            end: "bottom bottom",
            // markers: true,
            scrub: 1.5,
          },
        });

        tl2
          .to(
            model.current.position,
            {
              x: -1,
              duration: 5,
            },
            "second"
          )
          .to(camera.position, { x: -2, y: 2, z: 4, duration: 5 }, "second");
      }, mainRef);
      return () => {
        return ctx.revert();
      };
    }
  }, []);

  return (
    <>
      <Center>
        <group
          dispose={null}
          ref={model}
          rotation={[0, Math.PI * -1.25, 0]}
          scale={0.7}
        >
          {/* <PivotControls
            ref={rotateObjects}
            anchor={[0, 0, 0]}
            // visible={false}
            rotation={[0, 0, 0]}
            autoTransform={false}
          > */}
          <mesh ref={rotateObjects} geometry={nodes.wheel.geometry}>
            <meshBasicMaterial map={baked} />
          </mesh>

          {/* </PivotControls> */}
          <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={baked} />
          </mesh>
        </group>
      </Center>
    </>
  );
}
