import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from 'next/script';


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  subsets:['latin'],
  weight: ['400','500','600','700']
})

export const metadata: Metadata = {
  title: "Prayers",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/3238a6f5b5.js" crossOrigin="anonymous"></Script>
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
