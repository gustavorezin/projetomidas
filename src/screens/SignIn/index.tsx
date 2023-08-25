import { Container, ImageBackground, Paragraph, Text } from "./styles";
import { useNavigation } from "@react-navigation/native";

import BackgroundImage from "../../assets/background.png";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScrollView, TouchableOpacity, View } from "react-native";

export function SignIn() {
  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate("forgotPassword");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground source={BackgroundImage}>
        <Container>
          <Text>Acesse sua conta</Text>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            variant="light"
          />
          <Input placeholder="Senha" secureTextEntry variant="light" />
          <Button title="Acessar" />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={handleHome}>
            <Paragraph>Esqueci minha senha</Paragraph>
          </TouchableOpacity>
        </Container>
        <View style={{ marginTop: 20 }}>
          <Paragraph>Ainda não tem acesso?</Paragraph>
          <Button title="Entre em contato" variant="transparent" />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
