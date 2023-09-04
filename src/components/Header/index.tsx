import { TouchableOpacity } from "react-native";
import { ArrowLeft, List } from "phosphor-react-native";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  showBackButton?: boolean;
  showDrawerButton?: boolean;
};

export function Header({
  title,
  showBackButton = false,
  showDrawerButton = false,
}: Props) {
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 24;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container style={{ paddingTop }}>
      {showBackButton && (
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} color={COLORS.BRAND_LIGHT} />
        </TouchableOpacity>
      )}
      <Title>{title}</Title>
      {showDrawerButton && (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <List size={24} color={COLORS.GRAY_100} />
        </TouchableOpacity>
      )}
    </Container>
  );
}
