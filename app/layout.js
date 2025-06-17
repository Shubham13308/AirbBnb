'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import NavBar from "@/components/navbar/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SessionTimeoutModal from "@/components/ui/SessionTimeoutModal"; // ← import your modal

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutWithPath({ children }) {
  const pathname = usePathname();
  const hideNav = pathname === "/login" || pathname === "/signup";

  const [sessionExpired, setSessionExpired] = useState(false);


  useEffect(() => {
    const handleSessionExpired = () => setSessionExpired(true);
    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);
 
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Providers>
        {!hideNav && <NavBar />}
        <main className="container py-10">{children}</main>
        <Toaster />
        <SessionTimeoutModal
          open={sessionExpired}
          onClose={() => setSessionExpired(false)}
        />
      </Providers>
    </GoogleOAuthProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWithPath>{children}</LayoutWithPath>
      </body>
    </html>
  );
}
