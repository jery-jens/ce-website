import { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Terms & Conditions — Causality Engine",
    description: "Clear and transparent legal information on privacy, cookies, and data usage at Causality Engine.",
};

export default function TermsPage() {
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
                                Terms & Conditions
                            </h1>

                            <div className="prose prose-invert max-w-3xl space-y-8">
                                <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                    Last updated: January 2026
                                </p>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        1. Agreement to Terms
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        By accessing or using Causality Engine&apos;s services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        2. Description of Service
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Causality Engine provides a marketing attribution and analytics platform that helps businesses understand and optimize their marketing performance. Our services include data integration, attribution modeling, journey mapping, and reporting tools.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        3. User Accounts
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        When you create an account with us, you must provide accurate and complete information. You are responsible for:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Maintaining the security of your account credentials</li>
                                        <li>All activities that occur under your account</li>
                                        <li>Notifying us immediately of any unauthorized access</li>
                                        <li>Ensuring your use complies with applicable laws</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        4. Subscription and Payment
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Access to Causality Engine requires a paid subscription. Payment terms include:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Subscriptions are billed monthly or annually as selected</li>
                                        <li>All fees are non-refundable unless otherwise stated</li>
                                        <li>We reserve the right to change pricing with 30 days notice</li>
                                        <li>Failure to pay may result in service suspension</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        5. Acceptable Use
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        You agree not to use our services to:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Violate any applicable laws or regulations</li>
                                        <li>Infringe upon intellectual property rights</li>
                                        <li>Transmit malicious code or interfere with the service</li>
                                        <li>Attempt to gain unauthorized access to our systems</li>
                                        <li>Resell or redistribute the service without authorization</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        6. Intellectual Property
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        The service and its original content, features, and functionality are owned by Causality Engine and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of your data but grant us a license to process it for service delivery.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        7. Limitation of Liability
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        To the maximum extent permitted by law, Causality Engine shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities arising from your use of the service.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        8. Termination
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        9. Changes to Terms
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We reserve the right to modify these terms at any time. We will provide notice of significant changes via email or through the service. Your continued use after changes constitutes acceptance of the new terms.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        10. Contact Us
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        If you have questions about these Terms and Conditions, please contact us at legal@causalityengine.com.
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
