import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { UIProvider } from "@/context/SearchContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-devanagari",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#cc0000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "खबर सीमांचल | सीमांचल की सच्ची खबर",
  description: "बिहार के सीमांचल क्षेत्र (अररिया, किशनगंज, कटिहार, पूर्णिया) का प्रमुख हिंदी समाचार पोर्टल।",
  metadataBase: new URL("https://khabarseemanchal.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          notoDevanagari.variable
        )}
      >
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
