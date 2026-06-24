import { useState, useEffect } from "react";

const DEFAULT_BEAM_COUNT = 70;

export default function CybercoreBackground({ beamCount = DEFAULT_BEAM_COUNT }) {
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 3 + 5;
      const fadeDur = riseDur;
      const type = Math.random() < 0.15 ? "secondary" : "primary";
      return {
        id: i,
        type,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s`,
        },
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div className="cybercore-scene" role="img" aria-label="Animated cybercore grid background">
      <div className="cybercore-floor" />
      <div className="cybercore-column" />
      <div className="cybercore-streams">
        {beams.map((beam) => (
          <div key={beam.id} className={`cybercore-beam ${beam.type}`} style={beam.style} />
        ))}
      </div>
    </div>
  );
}
