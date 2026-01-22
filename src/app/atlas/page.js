import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'nodes.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function Atlas() {
  const nodes = await getData();

  // Group nodes by type for a "Museum Index" feel
  const byType = nodes.reduce((acc, node) => {
    acc[node.type] = [...(acc[node.type] || []), node];
    return acc;
  }, {});

  return (
    <main className="min-h-screen w-full bg-void p-8 md:p-20 relative overflow-y-auto">
      <Link href="/" className="fixed top-8 left-8 text-accent hover:text-text transition-colors duration-500 z-50 flex items-center gap-2 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-body text-xs uppercase tracking-widest">Return to Map</span>
      </Link>

      <header className="mb-20 mt-12">
        <h1 className="font-display text-6xl text-text italic">Atlas</h1>
        <p className="font-body text-xs text-accent uppercase tracking-widest mt-2">
          Index of {nodes.length} Memories
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
        {Object.keys(byType).map((type) => (
          <div key={type} className="mb-8">
            <h2 className="text-accent font-mono text-sm uppercase tracking-widest border-b border-line pb-2 mb-6">
              {type}
            </h2>
            <ul className="flex flex-col gap-4">
              {byType[type].map((node) => (
                <li key={node.id}>
                  <Link
                    href={`/nodes/${node.id}`}
                    className="group flex items-baseline justify-between hover:bg-surface p-2 -mx-2 rounded transition-colors"
                  >
                    <span className="font-display text-2xl text-text group-hover:text-accent transition-colors">
                      {node.title}
                    </span>
                    <span className="font-mono text-xs text-gray-600 hidden md:block">
                      {node.id}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}