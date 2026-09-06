import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhudaqa.com"),

  title: {
    default: "Alhuda for Rubber | Rubber Products & Solutions in Qatar",
    template: "%s | Alhuda",
  },

  description:
    "Alhuda for Rubber provides high-quality rubber products, flooring, conveyor belts, sports surfaces, and customized rubber solutions in Qatar.",

  applicationName: "Alhuda for Rubber",

  authors: [
    {
      name: "Alhuda for Rubber",
    },
  ],

  creator: "Alhuda for Rubber",
  publisher: "Alhuda for Rubber",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Alhuda for Rubber",
    title: "Alhuda for Rubber | Rubber Products & Solutions in Qatar",
    description:
      "Alhuda for Rubber provides high-quality rubber products, flooring, conveyor belts, sports surfaces, and customized rubber solutions in Qatar.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}