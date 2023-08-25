import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

type ContainerProps = {
  variant: "dark" | "light";
};

export const Container = styled(TextInput)<ContainerProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  ${({ theme, variant }) => css`
    background-color: ${variant === "light"
      ? theme.COLORS.GRAY_200
      : theme.COLORS.GRAY_800};
    color: ${variant === "light" ? theme.COLORS.BLACK : theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    border: 1px solid
      ${variant === "light" ? theme.COLORS.GRAY_300 : theme.COLORS.GRAY_700};
  `}
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 10px;
`;
