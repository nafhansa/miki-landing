import ProblemSolution from "../components/ProblemSolution";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "../components/OverlayNav";
import DynamicStoryHero from "../components/DynamicStoryHero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <LoadingScreen />
      <Nav />

      <DynamicStoryHero />
      <ProblemSolution />
      <Benefits />
      <Footer />
    </main>
  );
}
