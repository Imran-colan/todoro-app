import Login from "@/components/Login";
import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";

const Auth = () => {
  const {isAuthenticated} = useAuthStore();
  if (isAuthenticated) return <Redirect href={"/(protected)"} />
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
