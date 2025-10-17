// app/providers.tsx
import { config } from "@/configuration/UI.Config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";

const queryClient = new QueryClient();

export default function Providers() {
  useEffect(() => {
    console.log("1=============================================");
  }, []);
  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
