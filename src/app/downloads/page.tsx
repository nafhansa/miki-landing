import DownloadPage from "@/components/DownloadPage";
import Footer from "@/components/Footer";
import Nav from "@/components/OverlayNav";

export default function DownloadsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Nav />
      <DownloadPage />
      <Footer />
    </main>
  );
}
