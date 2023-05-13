export default function Background({ square1, square2 }) {
  return (
    <>
      <mesh ref={square1} position={[0, 0, -5]} scale={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[1, 1]} />

        <meshStandardMaterial color={"#1b141d"} />
        {/* <meshStandardMaterial color={"#b8a781"} /> */}
      </mesh>
      <mesh ref={square2} position={[0, 0, -5]} scale={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={"#1b141d"} />
        {/* <meshStandardMaterial color={"#b8a781"} /> */}
      </mesh>
    </>
  );
}
