import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'nodes.json');
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
}

export default async function TagPage({ params }) {
  // Await params for Next.js 14+ compatibility
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const nodes = await getData();

  // Filter Logic
  const filteredNodes = nodes.filter(n => n.tags.includes(decodedTag));

  return (
    <main className="min-h-screen w-full bg-void p-8 md:p-20 relative overflow-y-auto">
      <Link href="/" className="fixed top-8 left-8 text-accent hover:text-text transition-colors duration-500 z-50 flex items-center gap-2 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-body text-xs uppercase tracking-widest">Return to Map</span>
      </Link>

      <header className="mb-16 mt-12 border-b border-line pb-8">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          Index Filter
        </div>
        <h1 className="font-display text-6xl text-text italic">
          #{decodedTag}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {filteredNodes.length > 0 ? (
          filteredNodes.map((node) => (
            <Link key={node.id} href={`/nodes/${node.id}`} className="group block bg-surface/30 border border-transparent hover:border-accent/30 p-8 transition-all duration-500 hover:bg-surface/60">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4 block">
                {node.type}
              </span>
              <h2 className="font-display text-3xl text-text group-hover:text-accent transition-colors mb-3">
                {node.title}
              </h2>
              <p className="font-body text-sm text-gray-400 line-clamp-3 leading-relaxed">
                {node.subtitle || node.excerpt}
              </p>
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-gray-500 font-mono text-sm border border-line border-dashed p-8 text-center">
            No memory fragments contain this tag.
          </div>
        )}
      </div>
    </main>
  );
}