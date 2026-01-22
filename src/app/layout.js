import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
// 1. Import the component
import CuratorSigil from "@/components/CuratorSigil";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  style: ["normal", "italic"]
});

export const metadata = {
  title: "Mnemosyne | An Autobiographical Constellation",
  description: "A non-linear navigation of memory.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-void text-text antialiased selection:bg-accent selection:text-void">
      <body className={`${inter.variable} ${cormorant.variable} font-body relative overflow-hidden h-screen w-screen`}>
        {/* Grain Overlay */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.03]  z-50 mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {children}

        <CuratorSigil />

      </body>
    </html>
  );
}