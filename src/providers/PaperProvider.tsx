import { useColorScheme } from "react-native";
import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider as OriginalPaperProvider,
} from "react-native-paper";

export const paperThemeLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2164AE",
  },
};

export const paperThemeDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#4794e6ff",
  },
};

export default function PaperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  return (
    <OriginalPaperProvider
      theme={colorScheme === "dark" ? paperThemeDark : paperThemeLight}
    >
      {children}
    </OriginalPaperProvider>
  );
}
