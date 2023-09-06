import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";
import { PlusCircle } from "phosphor-react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export function CardButton({ title, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <PlusCircle size={24} color="#00b37e" weight="regular" />
      <Title>{title}</Title>
    </Container>
  );
}
