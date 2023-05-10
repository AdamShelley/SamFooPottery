import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import Experience from "./Experience";
import HTML from "./HTML";
import { Loader } from "@react-three/drei";

function App() {
  const ref = useRef();
  const [main, setMain] = useState();

  useEffect(() => {
    setMain(ref.current.children[1]);
  }, [main]);

  return (
    <div className="App" ref={ref}>
      <Suspense fallback={null}>
        <div className="canvas-wrapper">
          <Experience mainRef={main} />
        </div>
        <HTML mainRef={main} />
      </Suspense>
      <Loader />
    </div>
  );
}

export default App;
