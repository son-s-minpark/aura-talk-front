"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "@/store/store";
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
            <Provider store={store}>
              <body className="flex justify-center w-full h-[100vh]">
                <div className="w-[375px] h-[812px]">{children}</div>
              </body>
            </Provider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
