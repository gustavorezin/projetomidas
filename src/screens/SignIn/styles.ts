import styled from "styled-components/native";

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  padding: 24px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  gap: 10px;
`;

export const Text = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Paragraph = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Image = styled.Image`
  align-self: center;
  margin-bottom: 10%;
  width: 200px;
  height: 73px;
`;
