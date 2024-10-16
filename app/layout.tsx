"use client";

import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationBar from "@/components/NavigationBar";
import Container from "@/components/container";
import Footer from "@/components/Footer";
import { UserProvider } from "@/components/UserContext";
import { useAuth } from "@/hooks/useAuth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.querySelector("html");
      if (htmlElement) htmlElement.setAttribute("lang", "en");
    }
  }, []);

  if (loading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Container>
            <div className="flex min-h-screen flex-col items-center justify-center">
              <p>Loading...</p>
            </div>
          </Container>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Container>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col">
                <NavigationBar />
                {children}
                <Footer />
              </div>
            </ThemeProvider>
          </Container>
        </UserProvider>
      </body>
    </html>
  );
}
