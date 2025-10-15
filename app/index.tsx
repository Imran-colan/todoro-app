import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View } from "react-native";

import Login from "@/common/Login";
import { config } from "@/configuration/UI.Config";
import { TamaguiProvider } from "tamagui";

export default function Index() {
  const router = useRouter();
  const navigation: any = useNavigation();

  return (
    <TamaguiProvider config={config}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Login />
      </View>
    </TamaguiProvider>
  );
}
