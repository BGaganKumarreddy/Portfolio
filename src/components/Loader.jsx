import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[var(--neon-blue)] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_var(--neon-blue)]"></div>
        <p className="mt-4 text-[var(--neon-blue)] font-bold tracking-widest text-lg drop-shadow-md">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}


