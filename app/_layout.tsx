// app/_layout.tsx
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Slot, useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Providers from "./providers";

export function AppEntry() {
  const router = useRouter();
  const {
    fetchUserMutationRest: { mutateAsync: fetchUserMutationAsync },
  } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        await fetchUserMutationAsync();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      router.replace(isAuthenticated ? "/(protected)" : "/(public)/Auth");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
   const navReady = useRootNavigationState();

  // ✅ Prevent all children from rendering until routing is ready
  if (!navReady?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Providers>
      {/* <AppEntry /> */}
      <Slot />
    </Providers>
  );
}
