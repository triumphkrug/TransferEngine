import "./style.css";
import type { Metadata } from "next";

const title = "Transfer Engine — typed compatibility gate for transferred agent memory";
const description =
  "A read-only Walrus Sessions 7 lab: a recalled lesson walks a transfer route where every compared field is a checkpoint, evaluated by the committed canonical resolver.";

export const metadata: Metadata = {
  metadataBase: new URL("https://transfer-engine-krug.vercel.app"),
  title,
  description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: "/icon.svg"
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Transfer Engine — a lesson only travels as far as its checkpoints allow" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
