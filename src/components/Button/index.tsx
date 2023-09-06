import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Loading, Title } from "./styles";

type ButtonVariant = "default" | "transparent";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  variant?: ButtonVariant; // Adicione a propriedade variant
};

export function Button({
  title,
  isLoading = false,
  variant = "default",
  ...rest
}: Props) {
  return (
    <Container
      variant={variant}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Loading /> : <Title variant={variant}>{title}</Title>}
    </Container>
  );
}
