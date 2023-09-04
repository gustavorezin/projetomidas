import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const DrawerContentScrollViewContainer = styled.View`
  flex: 1;
  padding-top: 10px;
`;

export const ProfileSection = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const ProfileGreating = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const ProfileGreatingText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const ProfileGreatingName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const ProfileCompany = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const BottomSection = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const BottomButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const BottomText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;
