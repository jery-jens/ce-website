import { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy — Causality Engine",
    description: "Clear and transparent legal information on privacy, cookies, and data usage at Causality Engine.",
};

export default function PrivacyPage() {
    return (
        <>
            <div className="relative min-h-screen bg-background">
                <div className="px-4 md:px-12">
                    <div className="max-w-7xl mx-auto border-l border-r border-foreground/30">
                        <div className="px-4 md:px-12 pt-32 pb-20">
                            <p className="text-foreground/70 uppercase font-sans font-medium text-[10px] tracking-wider mb-6">
                                Legal
                            </p>
                            <h1 className="font-serif font-medium text-4xl md:text-6xl text-foreground tracking-tighter leading-[1.1] mb-12">
                                Privacy Policy
                            </h1>

                            <div className="prose prose-invert max-w-3xl space-y-8">
                                <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                    Last updated: January 2026
                                </p>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        1. Introduction
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Causality Engine (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our marketing attribution and analytics platform.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        2. Information We Collect
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We collect information that you provide directly to us, including:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Account information (name, email, company details)</li>
                                        <li>Payment and billing information</li>
                                        <li>Marketing and analytics data you choose to integrate</li>
                                        <li>Communications with our support team</li>
                                        <li>Usage data and platform interactions</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        3. How We Use Your Information
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We use the information we collect to:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Provide, maintain, and improve our services</li>
                                        <li>Process transactions and send related information</li>
                                        <li>Send technical notices and support messages</li>
                                        <li>Respond to your comments and questions</li>
                                        <li>Analyze usage patterns to enhance user experience</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        4. Data Sharing and Disclosure
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We do not sell your personal information. We may share information with third parties only in the following circumstances:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>With your consent or at your direction</li>
                                        <li>With service providers who assist in our operations</li>
                                        <li>To comply with legal obligations</li>
                                        <li>To protect our rights and prevent fraud</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        5. Data Security
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security assessments.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        6. Your Rights
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Depending on your location, you may have the right to:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Access your personal information</li>
                                        <li>Correct inaccurate data</li>
                                        <li>Request deletion of your data</li>
                                        <li>Object to or restrict processing</li>
                                        <li>Data portability</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        7. Contact Us
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@causalityengine.com.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
