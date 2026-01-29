import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "@/src/components/NavBar";
import './globals.css'
import ReactQueryProvider from "@/src/queryClient/provider";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Email Client Engine",
  description:
    "Web-based email client engine for sending individual emails with automated sequencing and progress tracking.",
  keywords: [
    "email client",
    "bulk email sender",
    "email automation",
    "campaign engine",
  ],
  authors: [{ name: "EmailClientEngine" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#000000",
  icons: {
    icon: "/assets/mail.png",
  },
  openGraph: {
    title: "Email Client Engine",
    description:
      "Send individual emails automatically with progress tracking.",
    type: "website",
    images: [
      {
        url: "/assets/preview.jpg",
      },
    ],
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
        className={`${poppins.className} antialiased max-w-[1240] mx-auto`}
      >
        <ReactQueryProvider>
          <NavBar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
