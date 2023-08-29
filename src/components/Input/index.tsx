import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

type ButtonVariant = "dark" | "light";

type Props = TextInputProps & {
  variant?: ButtonVariant; // Adicione a propriedade variant
};
export function Input({ variant = "dark", ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container
      variant={variant}
      placeholderTextColor={COLORS.GRAY_400}
      {...rest}
    ></Container>
  );
}
