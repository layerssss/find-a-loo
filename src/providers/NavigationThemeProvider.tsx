import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { adaptNavigationTheme } from "react-native-paper";
import { paperThemeDark, paperThemeLight } from "./PaperProvider";

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialLight: paperThemeLight,
  materialDark: paperThemeDark,
});

export default function NavigationThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
}
