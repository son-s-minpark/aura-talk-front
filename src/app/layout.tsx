"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 0,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <QueryClientProvider client={queryClient}>
        <body className="flex justify-center w-full h-[100vh]">
          <div className="w-[375px] h-[812px]">{children}</div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
