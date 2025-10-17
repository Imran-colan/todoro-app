import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Redirect, router, Slot } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();
  const {
    fetchUserMutationRest: { mutateAsync: fetchUserMutationAsync },
    isUserFetchingLoading,
  } = useAuth();

  useEffect(() => {
    (async () => {
      const user_data = await fetchUserMutationAsync();
      if (!user_data?.username) return router.push("/Auth");
    })();
  }, []);
    useEffect(()=>{
    console.log("2=============================================")
  },[])
  if (!isUserFetchingLoading && !isAuthenticated)
    return <Redirect href={"/Auth"} />;
  return <Slot />;
}
