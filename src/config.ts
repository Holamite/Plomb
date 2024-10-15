import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";

export const config = getDefaultConfig({
  appName: "Plomb",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
