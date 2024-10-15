"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/config";
import { ReactNode } from "react";
import merge from "lodash.merge";

const queryClient = new QueryClient();
const Provider = ({ children }: { children: ReactNode }) => {
  const PlombTheme = merge(darkTheme(), {
    colors: {
      modalBackground: "#313131",
    },
  });
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={PlombTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
export default Provider;
