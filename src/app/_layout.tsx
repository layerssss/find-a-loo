import ApiProvider from "@/src/providers/ApiProvider";
import LocationProvider from "@/src/providers/LocationProvider";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();
const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : LightTheme}
          >
            <LocationProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </LocationProvider>
          </ThemeProvider>
        </PaperProvider>
      </ApiProvider>
    </>
  );
}
