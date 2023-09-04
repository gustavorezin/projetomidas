import React from "react";
import { Container, Description, Title } from "./styles";
import { View } from "react-native";

type Props = {
  title: string;
  description: string;
};

export function SummaryCard({ title, description }: Props) {
  return (
    <Container>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </View>
      </View>
    </Container>
  );
}
