import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
}

export function Header({ title } : Props) {
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 42;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <Container style={{paddingTop}}>
      <TouchableOpacity onPress={handleGoBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
      <Title>
        {title}
      </Title>
    </Container>
  );
}
