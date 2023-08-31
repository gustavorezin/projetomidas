import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "react-native";

import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "./src/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

import Toast from "react-native-toast-message";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
        <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
