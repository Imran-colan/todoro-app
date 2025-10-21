// hooks/withAuthGuard.ts
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRootNavigationState, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Spinner, View } from "tamagui";

export function withAuthGuard<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const Wrapper = (props: P) => {
    const { isAuthenticated } = useAuthStore();
    const {
      fetchUserMutationRest: { mutateAsync: fetchUser },
      isUserFetchingLoading,
    } = useAuth();

    const router = useRouter();
    const redirected = useRef(false);
    const rootState = useRootNavigationState();

    useEffect(() => {
      fetchUser().catch(console.error);
    }, []);
    useEffect(() => {
      if (!rootState?.key) return;
      if (!isUserFetchingLoading && !isAuthenticated && !redirected.current) {
        redirected.current = true;
        router.replace("/Auth");
      }
    }, [rootState?.key, isUserFetchingLoading, isAuthenticated]);

    if (isUserFetchingLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
        </View>
      );
    }

    return <Component {...props} />;
  };

  return Wrapper;
}
