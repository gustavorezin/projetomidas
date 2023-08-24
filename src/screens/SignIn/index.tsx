import { Container, ImageBackground, Paragraph, Text } from "./styles";

import BackgroundImage from "../../assets/background.png";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScrollView } from "react-native";

export default function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground source={BackgroundImage}>
        <Container>
          <Text>Acesse sua conta</Text>
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
          <Button title="Acessar" />
        </Container>
        <Paragraph>Ainda não tem acesso?</Paragraph>
        <Button title="Entre em contato" variant="transparent" />
      </ImageBackground>
    </ScrollView>
  );
}
