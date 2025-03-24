"use client";
import "./globals.css";
import Providers from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" suppressHydrationWarning>
      <body className="flex justify-center w-full h-[100vh]">
        <Providers>
          <div className="w-[375px] h-[812px]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
