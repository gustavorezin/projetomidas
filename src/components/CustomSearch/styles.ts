import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const ButtonSelect = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 16px;
`;

export const ButtonSelectText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
