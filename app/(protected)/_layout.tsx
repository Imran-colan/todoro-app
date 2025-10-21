// function ProtectedLayout() {
//   return <Slot />;
// }
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Slot, useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuthStore();
  const {
    fetchUserMutationRest: { mutateAsync: fetchUser },
    isUserFetchingLoading,
  } = useAuth();
  const router = useRouter();
  const rootNavReady = useRootNavigationState();
  const redirected = useRef(false);

  useEffect(() => {
    fetchUser().catch(console.error);
  }, []);

  useEffect(() => {
    if (!rootNavReady?.key || isUserFetchingLoading || redirected.current) return;

    if (!isAuthenticated) {
      redirected.current = true;
      router.replace("/(public)/Auth");
    }
  }, [rootNavReady?.key, isUserFetchingLoading, isAuthenticated]);

  if (isUserFetchingLoading || !rootNavReady?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}


// export default withAuthGuard(ProtectedLayout);
