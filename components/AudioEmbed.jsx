"use client";
import { useState } from "react";
import { Play, Pause } from "lucide-react";

export default function AudioEmbed({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data) return null;

  return (
    <div className="border-t border-line pt-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-body text-accent uppercase tracking-[0.2em]">
          Soundscape
        </span>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-text hover:text-accent transition-colors duration-300 flex items-center gap-2 text-sm"
        >
          {isPlaying ? (
            <><Pause size={14} /> Stop</>
          ) : (
            <><Play size={14} /> Listen</>
          )}
        </button>
      </div>

      {isPlaying && (
        <div className="animate-fade-in duration-700">
          {data.provider === "soundcloud" && (
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src={`https://w.soundcloud.com/player/?url=${data.url}&color=%23C2A1A1&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
            ></iframe>
          )}
          {data.provider === "youtube" && (
            <div className="aspect-video w-full overflow-hidden bg-black">
               <iframe 
                 width="100%" 
                 height="100%" 
                 src={`https://www.youtube.com/embed/${data.url}?autoplay=1&controls=0&modestbranding=1&rel=0`} 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
            </div>
          )}
        </div>
      )}
      
      {!isPlaying && (
        <div className="h-2 w-full bg-surface relative overflow-hidden">
           <div className="absolute inset-0 bg-line opacity-20" />
        </div>
      )}
    </div>
  );
}