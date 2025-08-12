import LocationProvider from "@/providers/LocationProvider";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, loadingSet] = useState(true);

  useEffect(() => {
    Promise.resolve().then(async () => {
      await SplashScreen.hideAsync();
      loadingSet(false);
    });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <>
      <LocationProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </LocationProvider>
    </>
  );
}
