"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem("cookie-consent");
        if (!cookieConsent) {
            // Small delay before showing banner
            const timeout = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[100] transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
            <div className="bg-neutral-900 border border-foreground/10 rounded-lg p-4 md:p-5 max-w-[420px] shadow-2xl">
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <h3 className="font-sans font-medium text-sm text-foreground">
                            We use cookies
                        </h3>
                        <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                            We use cookies to improve your experience and analyze site traffic.{" "}
                            <Link
                                href="/cookies"
                                className="text-foreground/80 underline hover:text-foreground transition-colors"
                            >
                                Learn more
                            </Link>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="primary" onClick={handleAccept} small>
                            Accept
                        </Button>
                        <Button variant="secondary" onClick={handleDecline} small>
                            Decline
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
