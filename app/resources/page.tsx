import { Metadata } from "next";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import ResourcesContent from "../components/ResourcesContent";

export const metadata: Metadata = {
    title: "Resources — Causality Engine",
    description: "Insights, case studies, and practical guides on attribution, incrementality, and marketing decisions powered by causal analysis.",
};

export default function ResourcesPage() {
    return (
        <>
            <ResourcesContent />
            <CTA />
            <Footer />
        </>
    );
}
