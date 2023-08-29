import styled from "styled-components/native";

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 24px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 40%;
`;

export const Text = styled.Text`
  text-align: center;
  margin-bottom: 20px;
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
