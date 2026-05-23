import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workshop-mgmt.example.com"),
  title: {
    default: "Workshop Management — Run your garage without wrestling with ERP forms",
    template: "%s · Workshop Management",
  },
  description:
    "A focused, real-time portal on top of ERPNext for service advisors, technicians, and managers. Appointments to invoices, in one fast screen.",
  keywords: [
    "workshop management",
    "garage software",
    "automotive ERP",
    "ERPNext app",
    "job card",
    "vehicle inspection",
  ],
  authors: [{ name: "Infoney", url: "mailto:info@infoney.com" }],
  openGraph: {
    title: "Workshop Management",
    description: "The modern way to run an auto workshop. Built on ERPNext.",
    type: "website",
    siteName: "Workshop Management",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workshop Management",
    description: "Run your garage without wrestling with ERP forms.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
