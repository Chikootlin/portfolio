import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next"
import SmoothScrollWrapper from "../components/smoothScrollWrapper";

const jetbrains = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "MieAyamPerfect",
  description: "Just exploring something",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrollWrapper>  
          {/* Navbar */}
          <Navbar></Navbar>
          {/* Container */}
          <div className="min-h-screen relative">
            <main className="mx-auto">
              {children}
            </main>
            {/* Footer */}
            <Footer></Footer>     
          </div>
          <Analytics />
    </SmoothScrollWrapper>
  );
}
