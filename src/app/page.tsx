import ProblemSolution from "../components/ProblemSolution";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import StoryHero from "../components/StoryHero";
import Nav from "../components/OverlayNav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <LoadingScreen />
      <Nav />

      <StoryHero />
      <ProblemSolution />
      <Benefits />
      <Footer />
    </main>
  );
}
