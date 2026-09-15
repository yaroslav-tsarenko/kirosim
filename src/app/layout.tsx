import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "@/components/providers/Preferences";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { getCurrentUser } from "@/lib/auth/dal";
import { site } from "@/lib/site";

/** Display — a heavy, slightly industrial grotesk. Headlines and every
 *  number the page is built around. Weight 800 is the working weight. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/** UI / body — quiet on purpose, so the display face carries the voice. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Technical readouts — country codes, validity, data remaining, labels. */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Travel eSIMs for ${site.countriesCovered} countries`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["eSIM", "travel eSIM", "international data", "roaming", "QR eSIM"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Data that lands before you do`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

/** Porcelain is the first-class theme, so the browser chrome matches the
 *  canvas before the theme script runs. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f7" },
    { media: "(prefers-color-scheme: dark)", color: "#101210" },
  ],
};

/* Set the theme class before paint to avoid a flash of the wrong theme.
   Porcelain (light) is the default; Graphite mode applies when the visitor
   has chosen it, or when they have no stored choice and their OS prefers
   dark. */
const themeScript = `(()=>{try{const t=localStorage.getItem('kirosim:theme');const d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;const e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(_){}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  const account = user
    ? { firstName: user.firstName, balanceCents: user.balanceCents }
    : null;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-porcelain text-ink">
        <PreferencesProvider>
          <a
            href="#main"
            className="sr-only bg-lime px-4 py-2 font-medium text-on-lime focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
          >
            Skip to content
          </a>
          <Header account={account} />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </PreferencesProvider>
      </body>
    </html>
  );
}
