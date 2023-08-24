import styled from "styled-components/native";

type ContainerProps = {
  variant: "default" | "transparent";
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, variant }) =>
    variant === "transparent" ? "transparent" : theme.COLORS.BRAND_MID};
  border: ${({ variant, theme }) =>
    variant === "transparent" ? `1px solid ${theme.COLORS.BRAND_MID}` : "none"};
`;

export const Title = styled.Text<ContainerProps>`
  color: ${({ variant, theme }) =>
    variant === "transparent" ? theme.COLORS.BRAND_MID : theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
