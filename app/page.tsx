"use client";

import { Navbar } from "@/components/navbar";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HomeContainer } from "@/components/home/HomeContainer";

/**
 * Página principal
 * Solo contiene navbar, scroll indicator y el contenedor principal del home
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ScrollIndicator />
      <Navbar />
      <HomeContainer />
    </main>
  );
}
