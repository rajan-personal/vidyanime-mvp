import type { Metadata } from "next";
import { Noto_Sans, Poppins } from "next/font/google";
import "./globals.css";
import DesktopOnly from "@/components/DesktopOnly";
import Providers from "./providers";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vidyanime - School Management System",
  description: "Comprehensive school management and education platform",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${poppins.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-noto-sans)' }}
      >
        <DesktopOnly>
          <Providers>{children}</Providers>
        </DesktopOnly>
      </body>
    </html>
  );
}
