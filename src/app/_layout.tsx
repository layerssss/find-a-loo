import ApiProvider from "@/src/providers/ApiProvider";
import LocationProvider from "@/src/providers/LocationProvider";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import NavigationThemeProvider from "../providers/NavigationThemeProvider";
import PaperProvider from "../providers/PaperProvider";

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
      <ApiProvider>
        <PaperProvider>
          <NavigationThemeProvider>
            <LocationProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="loos/[looId]"
                  options={{
                    title: "Details",
                    headerBackTitle: "Back",
                  }}
                />
              </Stack>
              <StatusBar style="auto" />
            </LocationProvider>
          </NavigationThemeProvider>
        </PaperProvider>
      </ApiProvider>
    </>
  );
}
