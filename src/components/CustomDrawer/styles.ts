import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const DrawerContentScrollViewContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  background-color: #fff;
`;

export const BottomSection = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

export const SignOutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SignOutText = styled.Text`
  font-size: 16px;
  margin-left: 5px;
`;