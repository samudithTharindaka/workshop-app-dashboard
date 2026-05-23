import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Personas } from "@/components/Personas";
import { Screenshots } from "@/components/Screenshots";
import { TechStack } from "@/components/TechStack";
import { Roadmap } from "@/components/Roadmap";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ValueProps />
      <Features />
      <HowItWorks />
      <Personas />
      <Screenshots />
      <TechStack />
      <Roadmap />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
