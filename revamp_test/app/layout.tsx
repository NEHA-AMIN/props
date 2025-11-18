import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import ThemeScript from "./components/ThemeScript";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Propheus - We Infer the World",
  description: "We turn maps into meaning, enabling AI agents that reason about the world through location, data, and context.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <ThemeScript />
        {/* Favicon: use propheus_logo in public folder */}
        <link rel="icon" href="/propheus_logo.jpeg" />
        <link rel="apple-touch-icon" href="/propheus_logo.jpeg" />
      </head>
      <body className={`${inter.className} antialiased bg-blue-950 dark:bg-slate-950 min-h-screen transition-colors duration-300`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}