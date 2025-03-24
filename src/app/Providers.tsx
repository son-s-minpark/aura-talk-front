"use client";

import { ThemeProvider } from "next-themes";
import { FC } from "react";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
