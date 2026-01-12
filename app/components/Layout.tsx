import CTA from "./CTA";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative min-h-screen">
        {children}
      </div>
      <CTA />
      <Footer />
    </>
  );
}