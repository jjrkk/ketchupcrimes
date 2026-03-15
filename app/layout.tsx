import type { Metadata } from "next";
import {
  Big_Shoulders,
  Special_Elite,
  Courier_Prime,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ketchup Crimes — Investigation In Progress",
  description:
    "The Bureau of Ketchup Enforcement is preparing its case. Evidence is being compiled. Charges will be filed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bigShoulders.variable} ${specialElite.variable} ${courierPrime.variable} ${spaceMono.variable} antialiased bg-crime-black`}
      >
        {children}
      </body>
    </html>
  );
}
