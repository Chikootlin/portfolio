import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";


const jetbrains = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MieAyamPerfect",
    description: "Just exploring something",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}){
    return (
        <html lang="en">
        <body className={jetbrains.className}>
            {children}
        </body>
        </html>
    );
}