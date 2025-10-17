import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuthStore();
  const {
    fetchUserMutationRest: { mutateAsync: fetchUserMutationAsync },
    isUserFetchingLoading,
  } = useAuth();
  useEffect(() => {
    console.log("2=============================================");
  }, []);
  useEffect(() => {
    // fetch on mount
    fetchUserMutationAsync().catch((err) => {
      console.error("Error fetching user in protected layout:", err);
    });
  }, []);

  // if not fetching and not authenticated, redirect
  if (!isUserFetchingLoading && !isAuthenticated) {
    return <Redirect href="/Auth" />;
  }

  // else, render children
  return <Slot />;
}
