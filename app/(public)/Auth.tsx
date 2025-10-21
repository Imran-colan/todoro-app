import Login from "@/components/Login";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Auth = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  if (isAuthenticated) return router.push("/Auth");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login />
    </View>
  );
};

export default Auth;
