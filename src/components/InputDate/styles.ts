import styled, { css } from "styled-components/native";

export const Container = styled.View`
  height: 78px;
`;

export const ButtonDate = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 6px;
  padding: 16px;
`;

export const ButtonDateText = styled.TextInput`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;
