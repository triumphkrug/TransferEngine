import "./style.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
 metadataBase: new URL("https://transfer-engine-krug.vercel.app"),
 title: "Transfer Engine | Walrus Sessions 7", description: "A target-local agent workflow that checks whether a lesson can transfer safely.",
 icons: { icon: "/icon.svg" },
 openGraph: { title: "Transfer Engine | Walrus Sessions 7", description: "A target-local agent workflow that checks whether a lesson can transfer safely.", images: [{url:"/og.svg", width:1200, height:630, alt:"Transfer Engine | Walrus Sessions 7"}] },
 twitter: { card:"summary_large_image", title:"Transfer Engine | Walrus Sessions 7", description:"A target-local agent workflow that checks whether a lesson can transfer safely.", images:["/og.svg"] }
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
