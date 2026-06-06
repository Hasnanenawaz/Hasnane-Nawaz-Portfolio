"use client";

import { Cursor } from "@/components/shared/cursor";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <LoadingScreen />
      <Cursor />
      {children}
    </ThemeProvider>
  );
}
