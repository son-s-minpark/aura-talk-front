import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className="flex justify-center w-full h-[100vh]">
        <div className="w-[375px]">{children}</div>
      </body>
    </html>
  );
}
