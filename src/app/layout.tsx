import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrankHub — Click. Laugh. Share. Repeat!",
  description: "100+ hilarious pranks! Funny sounds, jump scares, mystery gifts, fake errors and more. Open a link, click, and see what happens!",
  keywords: ["prank", "funny", "jokes", "sounds", "memes", "jump scare", "fake error"],
  openGraph: {
    title: "PrankHub — Ready for some FUNNY SURPRISES?",
    description: "Open a link, click, and see what happens! 100+ pranks inside.",
    type: "website",
  },

openGraph: {
      title: "PrankHub — Ready for some FUNNY SURPRISES?",
      description: "Open a link, click, and see what happens! 100+ pranks inside.",
      type: "website",
    },
    verification: {
      google: "_pjRz5CMXH5v69TW5daF4Mkc08RfmVTj_9uHFqpuAfM",
    },
  other: {
    "google-adsense-account": "ca-pub-7492924775014035",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#070d1d] text-white antialiased min-h-screen">{children}</body>
    </html>
  );
}
