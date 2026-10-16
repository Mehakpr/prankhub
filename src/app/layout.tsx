import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrankHub — Click. Laugh. Share. Repeat!",
  description:
    "Discover funny surprises and prank videos on PrankHub. Click the button and see what happens!",
  keywords: [
    "prank",
    "funny",
    "jokes",
    "sounds",
    "memes",
    "jump scare",
    "PrankHub",
    "66669999",
  ],
  openGraph: {
    title: "PrankHub — Ready for some FUNNY SURPRISES?",
    description: "Open a link, click, and see what happens!",
    type: "website",
  },
  verification: {
    google: "_pjRz5CMXH5v69TW5daF4Mkc08RfmVTj_9uHFqpuAfM",
  },
  other: {
    "google-adsense-account": "ca-pub-7492924775014035",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070d1d] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
