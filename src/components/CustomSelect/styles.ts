import styled from "styled-components/native";

export const Container = styled.View`
  height: 78px;
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
  padding: 16px;
`;

export const ButtonSelectText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const ContainerItems = styled.View`
  border-radius: 6px;
  margin-top: 2px;
  gap: 10px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
  z-index: 1;
`;

export const InputTextSearch = styled.TextInput`
  margin: 10px 10px 0;
  padding: 0 10px;
  height: 36px;
  background-color: white;
  border-width: 0.5px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 6px;
`;

export const ItemList = styled.TouchableOpacity`
  padding: 0 10px;
  height: 48px;
  justify-content: center;
`;
