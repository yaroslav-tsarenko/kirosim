import { countries } from "@/lib/data/countries";

/** Rounded-down "N+" label derived from the live catalogue so marketing copy
 *  never overstates the number of destinations actually on sale. */
const countriesCovered = `${Math.floor(countries.length / 10) * 10}+`;

/** Company registration details for the registered legal entity. */
const company = "DOMESTIC DREAMS LIMITED";
const regNumber = "15925893";
const address = "11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF";
const supportEmail = "info@kirosim.com";

export const site = {
  name: "Kirosim",
  company,
  regNumber,
  address,
  /** The footer statement — the brand's one-liner, not a slogan. */
  tagline: "Plastic-free since day one",
  description: `Kirosim sells travel eSIMs for ${countriesCovered} countries. Pick your destination, get a QR code instantly, install in one minute — no roaming fees, no physical SIM.`,
  url: "https://kirosim.com",
  homeCity: "Bridgend",
  supportEmail,
  countriesCovered,
} as const;

export const nav = {
  primary: [
    { label: "Destinations", href: "/destinations", mega: true },
    { label: "Regional plans", href: "/plans/regional" },
    { label: "Global plans", href: "/plans/global" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Compatibility", href: "/compatibility" },
    { label: "Help", href: "/help" },
  ],
} as const;
