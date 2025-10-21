// app/providers.tsx
import { config } from "@/configuration/UI.Config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider } from "tamagui";

const queryClient = new QueryClient();

export default function Providers({children}:{children:React.ReactNode}) {
  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
