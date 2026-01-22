"use client";
import { useState } from "react";
import { X, Mail, Github, Globe } from "lucide-react";

export default function CuratorSigil() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- THE TRIGGER BEACON --- */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 group flex items-center justify-center w-12 h-12"
        aria-label="About the Archive"
      >
        {/* Pulsing Ring Effect */}
        <span className="absolute w-full h-full rounded-full border border-accent/30 animate-ping opacity-20 duration-[3000ms]" />

        {/* The Core Sigil */}
        <span className="relative w-10 h-10 rounded-full bg-void border border-line group-hover:border-accent transition-colors duration-500 flex items-center justify-center">
           <span className="font-display italic text-accent text-lg">M</span>
        </span>

        {/* Label on Hover */}
        <span className="absolute right-14 font-mono text-[10px] uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
          About
        </span>
      </button>

      {/* --- THE MODAL OVERLAY --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* The Card */}
          <div className="relative bg-surface border border-line w-full max-w-md p-8 shadow-2xl animate-fade-in-up">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-accent transition-colors"
            >
              <X size={20} strokeWidth={1} />
            </button>

            {/* Content */}
            <div className="space-y-6">
              <header>
                <h2 className="font-display text-3xl text-text italic mb-1">Mnemosyne</h2>
                <div className="h-px w-12 bg-accent" />
              </header>

              <div className="prose prose-invert prose-p:text-sm prose-p:font-body prose-p:text-gray-400">
                <p>
                  You are navigating a non-linear constellation of memory. There is no beginning and no end, only the drift between moments.
                </p>

              </div>

              {/* Contact / Links Section */}
              <div className="pt-6 border-t border-line/50 grid grid-cols-1 gap-4">
                <div className="font-mono text-[10px] uppercase text-accent tracking-widest mb-1">
                  Find me on the web (or don't)
                </div>
                <a href="https://portfolio-barath-szilvia.netlify.app/" target="_blank" className="flex items-center gap-3 text-text hover:text-accent transition-colors group">
                  <Globe size={16} strokeWidth={1} />
                  <span className="font-body text-sm group-hover:translate-x-1 transition-transform">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}