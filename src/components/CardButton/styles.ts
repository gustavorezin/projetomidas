import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;
