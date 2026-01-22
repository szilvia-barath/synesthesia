import fs from 'fs';
import path from 'path';
import ConstellationScene from '@/components/ConstellationScene';
import InterfaceLayer from '@/components/InterfaceLayer';

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'nodes.json');
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const nodes = await getData();
  const nodeIds = nodes.map(n => n.id);

  return (
    <main className="w-full h-full relative">
      <ConstellationScene data={nodes} />
      {/* Pass IDs to the client component for Drift logic */}
      <InterfaceLayer nodeIds={nodeIds} />
    </main>
  );
}