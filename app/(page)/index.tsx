import { useNavigation } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const navigation: any = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ backgroundColor: "#f9f9f9", fontSize: 25 }}>HOME</Text>
      <Link href={"/"}>
        <Button title="Go to Home" />
      </Link> 
    </View>
  );
}
