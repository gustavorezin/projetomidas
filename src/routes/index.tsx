import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
// import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
// import { Loading } from "@components/Loading";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes() {
  const { COLORS } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = COLORS.GRAY_800;

  const { cliente, isLoadingClienteStorageData } = useAuth();

  if (isLoadingClienteStorageData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_800 }}>
      <NavigationContainer theme={theme}>
        {cliente.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
