import { Center, useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Room({ mainRef }) {
  const { nodes } = useGLTF("./room/model6.glb");
  const baked = useTexture("./room/texture.png");
  const model = useRef();
  const rotateObjects = useRef();
  const { camera } = useThree();
  gsap.registerPlugin(ScrollTrigger);

  nodes.wheel.geometry.center();

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
        let mm = gsap.matchMedia();
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".header-section",
            start: "top top",
            endTrigger: ".section1",
            end: 500,
            // snap: 1,
            scrub: 1.5,
            // markers: true,
          },
        });

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            endTrigger: ".second-examples",
            end: "middle middle",
            // markers: true,
            scrub: 1.5,
          },
        });

        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".second-examples",
            start: "50%",
            end: "100%",
            // markers: true,
            duration: 5,
            scrub: 1,
          },
        });

        mm.add("(min-width: 1000px)", () => {
          tl1
            .to(
              model.current.position,
              {
                x: 3.5,
                y: 0,
                duration: 5,
              },
              "same"
            )
            .to(
              model.current.scale,
              {
                x: 0.8,
                y: 0.8,
                z: 0.8,
                ease: "power3.out",
                duration: 5,
              },
              "same"
            );
        });
        mm.add("(min-width: 1441px)", () => {
          tl1
            .to(
              model.current.position,
              {
                x: () => 2,
                y: () => 1,
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
        });

        tl2
          .to(
            model.current.position,
            {
              x: -1,
              duration: 5,
              ease: "power3.out(1.5)",
            },
            "second"
          )
          .to(camera.position, { x: -2, y: 2, z: 4, duration: 5 }, "second");

        tl3
          .to(
            model.current.position,
            {
              z: () => 1,
              y: () => 1.5,
              x: () => -1,
              duration: 5,
              ease: "power3.out(1.5)",
            },
            "third"
          )
          .to(
            model.current.scale,
            { x: 0.2, y: 0.2, z: 0.2, duration: 5 },
            "third"
          )
          .to(camera.position, { x: -2, y: 1, z: 2, duration: 5 }, "third");

        //  Rotate wheel
        gsap.to(rotateObjects.current.rotation, {
          y: Math.PI * 4,
          duration: 5,
          ease: "linear",
          repeat: -1,
        });
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
          scale={0.6}
        >
          <mesh
            ref={rotateObjects}
            geometry={nodes.wheel.geometry}
            position={[0.41, 1.32, -0.6]}
          >
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
