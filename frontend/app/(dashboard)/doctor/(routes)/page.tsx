"use client"

export const dynamic = "force-dynamic";
import { Suspense } from "react";
import HeroSection from "../../components/HeroSection";
import About from "../../components/About";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading Dashboard </div>}>
        <HeroSection />
      </Suspense>

      <div className="flex-1 md:ml-10 px-5 md:px-10 py-10 transition-all duration-300">
        <About />
      </div>
    </div>
  );
}
