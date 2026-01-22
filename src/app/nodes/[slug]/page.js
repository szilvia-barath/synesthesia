import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import AudioEmbed from '@/components/AudioEmbed'; // Ensure this component exists
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

// --- DATA FETCHING HELPERS ---
function getAllNodes() {
  const filePath = path.join(process.cwd(), 'data', 'nodes.json');
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch (e) { return []; }
}

function getNode(slug) {
  const nodes = getAllNodes();
  return nodes.find(n => n.id === slug);
}

export async function generateStaticParams() {
  const nodes = getAllNodes();
  return nodes.map((node) => ({ slug: node.id }));
}

// --- HELPER COMPONENT FOR IMAGES ---
const VisualBlock = ({ media, isPrimary }) => {
  if (!media) return null;

  return (
    <figure className={`w-full ${isPrimary ? 'mb-12' : 'my-12 max-w-sm mx-auto'}`}>
      <div className={`w-full bg-surface relative overflow-hidden border border-line ${isPrimary ? 'aspect-video' : 'aspect-[4/5] p-2'}`}>
        {isPrimary ? (
           // Primary Image Styling
           <>
             <img
               src={media.url}
               alt={media.caption}
               className="w-full h-full object-cover opacity-80 transition-opacity duration-700 hover:opacity-100"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60 pointer-events-none" />
           </>
        ) : (
           // Secondary Image Styling
           <div className="w-full h-full border border-line/30 relative">
             <img
                src={media.url}
                alt={media.caption}
                className="w-full h-full object-cover opacity-60 contrast-125 hover:opacity-100 transition-opacity duration-500"
              />
           </div>
        )}
      </div>
      <figcaption className={`mt-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest ${isPrimary ? 'text-right' : 'text-center'}`}>
        {media.caption}
      </figcaption>
    </figure>
  );
};

// --- MAIN PAGE COMPONENT ---
export default async function NodePage({ params }) {
  const { slug } = await params;
  const node = getNode(slug);

  if (!node) notFound();

  // Extract visuals safely
  const primaryVisual = node.media && node.media[0] ? node.media[0] : null;
  const secondaryVisual = node.media && node.media[1] ? node.media[1] : null;

  return (
<main className="h-screen w-full bg-void absolute top-0 left-0 overflow-y-auto overflow-x-hidden scroll-smooth">
    <div className="flex justify-center py-24 px-6 min-h-full">
      {/* 1. Navigation */}
      <Link href="/" className="fixed top-8 left-8 text-accent hover:text-text transition-colors duration-500 z-50 flex items-center gap-2 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-body text-xs uppercase tracking-widest">Return to Map</span>
      </Link>

      <article className="max-w-2xl w-full relative z-10 animate-fade-in-up">

        {/* 2. Header & Tags */}
        <header className="mb-12 border-l-2 border-accent pl-6 py-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {node.tags.map(tag => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-[10px] font-mono uppercase text-gray-500 hover:text-accent border border-transparent hover:border-accent/50 px-1 rounded-sm transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-text leading-none mb-4">
            {node.title}
          </h1>
          <p className="font-display italic text-xl text-accent opacity-80">
            {node.subtitle || node.excerpt}
          </p>
        </header>

        {/* 3. Compulsory Primary Visual */}
        {primaryVisual ? (
          <VisualBlock media={primaryVisual} isPrimary={true} />
        ) : (
          /* Fallback if data is missing, though JSON structure should prevent this */
          <div className="w-full aspect-video bg-surface border border-line mb-12 flex items-center justify-center text-gray-600 font-mono text-xs">
            [VISUAL DATA CORRUPTED]
          </div>
        )}

        {/* 4. Text Body */}
        <div className="prose prose-invert prose-p:font-body prose-p:text-gray-300 prose-p:leading-loose prose-headings:font-display prose-a:text-accent mb-12 border-b border-line pb-12">
          <div dangerouslySetInnerHTML={{ __html: node.content }} />
        </div>

        {/* 5. Optional Secondary Visual */}
        {secondaryVisual && (
          <VisualBlock media={secondaryVisual} isPrimary={false} />
        )}

        {/* 6. Audio */}
        {node.audio && <AudioEmbed data={node.audio} />}

        {/* 7. Footer / Related Links */}
        {node.links && node.links.length > 0 && (
          <footer className="mt-16 pt-8">
            <h3 className="font-body text-xs text-gray-500 uppercase tracking-widest mb-4">
              Connected Fragments
            </h3>
            <div className="flex flex-col gap-2">
              {node.links.map(linkId => (
                <Link key={linkId} href={`/nodes/${linkId}`} className="font-display text-xl text-text hover:text-accent hover:translate-x-2 transition-all duration-300 block">
                  → {linkId}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
 <div className="fixed top-0 right-0 h-full w-1/3 bg-gradient-to-l from-surface to-transparent opacity-10 pointer-events-none" />
    </div>
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 h-full w-1/3 bg-gradient-to-l from-surface to-transparent opacity-10 pointer-events-none" />
    </main>
  );
}