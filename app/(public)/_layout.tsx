import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { fetchUserMutation } = useAuth();
  useEffect(() => {
    fetchUserMutation();
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="Auth"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
