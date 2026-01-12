import { Metadata } from "next";
import NotFoundContent from "./components/NotFoundContent";
import Footer from "./components/Footer";

export const metadata: Metadata = {
    title: "Page not found — Causality Engine",
    description: "This page doesn't exist. Let's get you back to understanding what actually drives revenue.",
};

export default function NotFound() {
    return (
        <>
            <NotFoundContent />
            <Footer />
        </>
    );
}
