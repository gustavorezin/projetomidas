import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

type ButtonVariant = "dark" | "light";

export type InputProps = TextInputProps & {
  value?: string;
  variant?: ButtonVariant;
};
export function Input({ value, variant = "dark", ...rest }: InputProps) {
  const { COLORS } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <Container
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      isFocused={isFocused}
      variant={variant}
      placeholderTextColor={COLORS.GRAY_400}
      value={value}
      {...rest}
    ></Container>
  );
}
