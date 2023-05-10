import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function Loader({ setLoaded, setShowHTML }) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setShowHTML(true);

      setLoaded(true);
    }
  }, [progress]);

  return (
    <div className="loader-container">
      <h2>Loading ... {progress}%</h2>
    </div>
  );
}
