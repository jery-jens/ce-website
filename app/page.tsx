import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import LogoGrid from "./components/LogoGrid";
import Platform from "./components/Platform";
import Image from "next/image";
import Engine from "./components/Engine";
import CustomerStories from "./components/CustomerStories";
import Insights from "./components/Insights";
import Features from "./components/Features";

export default function Home() {
  return (
    <Layout>
      <Hero />

      <main className="relative z-20">
        <LogoGrid />
        <Divider/>

        <div className="relative bg-background">
          <Platform/>
          <Image src="/images/features-background.png" alt="Eye" className="absolute max-w-7xl top-[700px] left-1/2 -translate-x-1/2 h-auto z-0" width={2000} height={2000} />
          <Features />
        </div>
        <Engine />
        <CustomerStories />
        <Insights />
      </main>
    </Layout>
  );
}
