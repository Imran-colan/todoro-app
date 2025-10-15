import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View } from "react-native";

import Login from "@/components/Login";
import { config } from "@/configuration/UI.Config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider } from "tamagui";

const queryClient = new QueryClient()

export default function Index() {
  const router = useRouter();
  const navigation: any = useNavigation();

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Login />
        </View>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
