import { useEffect, useRef, useState } from "react";
import "./App.css";
import Experience from "./Experience";
import HTML from "./HTML";

function App() {
  const ref = useRef();
  const [main, setMain] = useState();

  useEffect(() => {
    setMain(ref.current.children[1]);
  }, [main]);

  return (
    <div className="App" ref={ref}>
      <div className="canvas-wrapper">
        <Experience mainRef={main} />
      </div>
      <HTML />
    </div>
  );
}

export default App;
