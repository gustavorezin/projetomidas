import React from "react";

import { Container } from "./styles";
import { Text, TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

export function Home() {
  const { cliente, signOut } = useAuth();

  return (
    <Container>
      <Text style={{ color: "white" }}>Home, {cliente.nome}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={{ color: "red" }}>Sair</Text>
      </TouchableOpacity>
    </Container>
  );
}
