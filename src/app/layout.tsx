import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";

// Body / UI text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
// Display headings — gives the "designed", high-end feel.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StudiaCare — Pass the State Exam the First Time | Nursing Exam Prep",
  description:
    "Timed, exam-style nursing state-exam prep. 100 conditioning questions, instant rationales, flashcards, hover-to-define terms, and a reading trainer. First 75 questions free.",
  metadataBase: new URL("https://studiacare.com"),
  openGraph: {
    title: "StudiaCare — Pass the State Exam the First Time",
    description:
      "Timed like the real exam. 100 questions to condition you for the real 85. Feedback on every answer. First month free.",
    url: "https://studiacare.com/",
    type: "website",
  },
};

// Set the theme before paint to avoid a flash of the wrong colors.
const themeScript = `(function(){try{var t=localStorage.getItem('sc-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
