import { Metadata } from "next";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import PricingHero from "../components/PricingHero";
import CustomerStories from "../components/CustomerStories";
import Divider from "../components/Divider";

export const metadata: Metadata = {
    title: "Pricing — Causality Engine",
    description: "Simple, transparent pricing for causal attribution and marketing intelligence. Start uncovering what truly drives growth.",
};

export default function PricingPage() {
    return (
        <>
            <div className="relative min-h-screen">
                <PricingHero />
                <Divider />
                <CustomerStories />
            </div>
            <CTA />
            <Footer />
        </>
    );
}
