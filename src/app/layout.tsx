import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
