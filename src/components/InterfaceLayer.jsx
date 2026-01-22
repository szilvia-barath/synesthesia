"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shuffle } from 'lucide-react';

export default function InterfaceLayer({ nodeIds }) {
  const router = useRouter();

  const handleDrift = () => {
    // Pick a random node ID
    const randomIndex = Math.floor(Math.random() * nodeIds.length);
    const targetId = nodeIds[randomIndex];
    router.push(`/nodes/${targetId}`);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8 flex flex-col justify-between z-10">

      <header className="pointer-events-auto">
        <h1 className="font-display text-4xl text-text">synesthesia</h1>
        <p className="font-body text-xs text-accent mt-2 tracking-widest uppercase">
          a universe of fragmented memory scattered across the cosmos
        </p>
      </header>

      <footer className="pointer-events-auto flex justify-between items-end">
        <div className="text-xs text-gray-500 font-mono">
          {nodeIds.length} NODES LOADED<br />
          STATUS: ORBITING
        </div>

        <nav className="flex gap-6 items-center">
          <Link href="/atlas" className="text-text hover:text-accent font-display italic text-lg transition-colors">
            Index
          </Link>

          <button
            onClick={handleDrift}
            className="text-text hover:text-accent font-display italic text-lg transition-colors flex items-center gap-2 group"
          >
            <Shuffle size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            Drift
          </button>
        </nav>
      </footer>
    </div>
  );
}