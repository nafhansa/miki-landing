import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <LoadingScreen />

      <Hero />
      <ProblemSolution />
      <Benefits />
      <Footer />
    </main>
  );
}