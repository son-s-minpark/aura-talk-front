"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex justify-center w-full h-[100vh]">
        <ThemeProvider enableSystem={true} defaultTheme="system">
          <QueryClientProvider client={queryClient}>
            <body className="flex justify-center w-full h-[100vh]">
              <div className="w-[375px] h-[812px]">{children}</div>
            </body>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
