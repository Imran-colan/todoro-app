import { useAuth } from "@/hooks/useAuth";
import { Link } from "expo-router";
import { Button, Text } from "react-native";
import { View } from "tamagui";

export default function Index() {
  const {logout} = useAuth()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ backgroundColor: "#f9f9f9", fontSize: 25 }}>HOME</Text>
      <Link href={"/(protected)/Dummy"} asChild>
        <Button title="Go to /(protected)/Dummy" />
      </Link>
      <Link href={"/Dummy"} asChild>
        <Button title="Go to /Dummy" />
      </Link>
        <Button title="Log out" onPress={logout} />
    </View>
  );
}
