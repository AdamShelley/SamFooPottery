import { Center, useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Room({ mainRef, square1, square2 }) {
  const { nodes } = useGLTF("./room/model6.glb");
  const baked = useTexture("./room/texture.png");
  const model = useRef();
  const rotateObjects = useRef();
  const { camera } = useThree();
  gsap.registerPlugin(ScrollTrigger);

  nodes.wheel.geometry.center();

  baked.flipY = false;

  let lerp = useMemo(
    () => ({
      current: 0,
      target: 0,
      ease: 0.1,
    }),
    []
  );

  useFrame((state) => {
    state.camera.updateProjectionMatrix();
    lerp.current = gsap.utils.interpolate(lerp.current, lerp.target, lerp.ease);
    model.current.rotation.y = lerp.target + Math.PI;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      let rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth -
        Math.PI * 2;

      lerp.target = rotation * 0.09;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
            end: "+=2000px",
            // markers: true,
            scrub: 0.6,
          },
        });

        tl1
          .to(
            model.current.position,
            {
              x: 2,
              y: 0,
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

        const bg1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".header-scroll",
            start: "20%",
            endTrigger: ".section1",
            // end: "+1000px",
            scrub: 1,
          },
        });

        bg1.fromTo(
          square1.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 100, y: 100, z: 100, duration: 10 },
          "same"
        );
        // background

        tl2
          .to(
            model.current.position,
            {
              x: -2,
              y: 2,
              duration: 5,
              ease: "power1",
            },
            "second"
          )
          .to(
            model.current.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
              duration: 5,
              ease: "power1",
            },
            "second"
          )
          .to(model.current.position, {
            x: 0,
            duration: 20,
            delay: 5,
            ease: "power1",
          })
          .to(camera.position, { x: 1, y: 4, z: 3, duration: 10 });

        bg1
          .to(square1.current.scale, { x: 0, y: 0, z: 0, duration: 3 }, "bg")
          .fromTo(
            square2.current.scale,
            { x: 0, y: 0, z: 0 },
            { x: 100, y: 100, z: 100, duration: 5 }
          );

        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".section3",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          },
        });
        tl3
          .to(camera.position, { x: 2, y: 8, z: 10, duration: 10 }, "small")
          .to(
            model.current.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
              duration: 5,
            },
            "small"
          )
          .to(
            model.current.position,
            {
              x: 0,
              y: -2,
              z: 0,
              duration: 5,
            },
            "small"
          );

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
