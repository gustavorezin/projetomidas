import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

export const Text = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
