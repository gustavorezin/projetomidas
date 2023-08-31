import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

type ContainerProps = {
  variant: "dark" | "light";
  isFocused: boolean;
};

export const Container = styled(TextInput)<ContainerProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  ${({ theme, variant, isFocused }) => css`
    background-color: ${variant === "light"
      ? theme.COLORS.GRAY_200
      : theme.COLORS.GRAY_600};
    color: ${variant === "light" ? theme.COLORS.BLACK : theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    border: 2px solid
      ${isFocused ? theme.COLORS.BRAND_LIGHT : theme.COLORS.GRAY_700};
  `}
  border-radius: 6px;
  padding: 16px;
`;
