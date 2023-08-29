import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

type ContainerProps = {
  variant: "dark" | "light";
};
/*
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
*/

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY_300};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`;

export const InputText = styled.TextInput`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  margin-top: 16px;
`;