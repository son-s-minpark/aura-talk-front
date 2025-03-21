"use client";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body
        className="flex justify-center w-full h-[100vh]"
        suppressHydrationWarning
      >
        <ThemeProvider attribute={"class"}>
          <div className="w-[375px] h-[812px]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
