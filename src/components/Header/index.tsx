import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";

export function Header() {
  const { COLORS } = useTheme();
  return (
    <Container>
      <TouchableOpacity>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
    </Container>
  );
}
