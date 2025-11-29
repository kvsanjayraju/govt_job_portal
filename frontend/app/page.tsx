import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      {/* Additional sections can be added here */}
    </main>
  );
}
