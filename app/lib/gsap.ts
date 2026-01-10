import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

CustomEase.create("causality", "0.76, 0, 0.24, 1");

export { gsap, ScrollTrigger };
