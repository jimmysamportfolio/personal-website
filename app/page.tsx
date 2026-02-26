import ContactTeamsSection from "@/components/home/ContactTeamsSection";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { PageLoadCascade } from "@/components/layout/PageLoadCascade";
import ProjectGrid from "@/components/home/ProjectGrid";

export default function Page() {
  return (
    <main className="w-full">
      <PageLoadCascade>
        <div className="space-y-4">
          <Hero />

          <div className="w-full border-t border-dashed border-muted-foreground/20" />
          <ContactTeamsSection />

          <div className="w-full border-t border-dashed border-muted-foreground/20" />
          <ProjectGrid />
        </div>
        <div className="mt-16 h-1" />
        <Footer />
      </PageLoadCascade>
    </main>
  );
}
