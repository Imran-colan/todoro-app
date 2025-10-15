import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="/"
        options={{
          headerShown: false,
          title: "Important",
          headerStyle: {
            backgroundColor: '#f45119',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      {/* <Stack.Screen name="(page)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
