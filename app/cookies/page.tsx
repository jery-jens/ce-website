import { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Cookie Policy — Causality Engine",
    description: "Clear and transparent legal information on privacy, cookies, and data usage at Causality Engine.",
};

export default function CookiesPage() {
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
                                Cookie Policy
                            </h1>

                            <div className="prose prose-invert max-w-3xl space-y-8">
                                <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                    Last updated: January 2026
                                </p>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        1. What Are Cookies
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Causality Engine uses cookies to enhance your experience and analyze how our platform is used.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        2. Types of Cookies We Use
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-sans font-medium text-lg text-foreground mb-2">Essential Cookies</h3>
                                            <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                                These cookies are necessary for the website to function properly. They enable core functionality such as security, account access, and session management. You cannot opt out of these cookies.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-sans font-medium text-lg text-foreground mb-2">Analytics Cookies</h3>
                                            <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                                We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience. These cookies collect information anonymously.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-sans font-medium text-lg text-foreground mb-2">Functional Cookies</h3>
                                            <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers whose services we use.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-sans font-medium text-lg text-foreground mb-2">Marketing Cookies</h3>
                                            <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                                These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        3. Third-Party Cookies
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Google Analytics - for website analytics</li>
                                        <li>Intercom - for customer support chat</li>
                                        <li>Stripe - for payment processing</li>
                                        <li>HubSpot - for marketing automation</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        4. Managing Cookies
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        You can control and manage cookies in several ways:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Browser settings: Most browsers allow you to block or delete cookies</li>
                                        <li>Cookie preferences: Use our cookie consent banner to manage preferences</li>
                                        <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
                                    </ul>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        Please note that blocking some cookies may impact your experience on our website and limit the functionality of certain features.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        5. Cookie Retention
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        The length of time a cookie remains on your device depends on its type:
                                    </p>
                                    <ul className="list-disc list-inside text-foreground/70 font-sans text-sm leading-relaxed space-y-2">
                                        <li>Session cookies: Deleted when you close your browser</li>
                                        <li>Persistent cookies: Remain until they expire or you delete them</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        6. Updates to This Policy
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 className="font-serif font-medium text-2xl text-foreground tracking-tight">
                                        7. Contact Us
                                    </h2>
                                    <p className="text-foreground/70 font-sans text-sm leading-relaxed">
                                        If you have questions about our use of cookies, please contact us at privacy@causalityengine.com.
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
