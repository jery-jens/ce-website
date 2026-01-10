import CTA from "./CTA";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="relative min-h-screen">
        {children}
      </div>
      <CTA />
      <Footer />
    </>
  );
}