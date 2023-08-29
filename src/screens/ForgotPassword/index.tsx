import { Container, Paragraph, Text } from "./styles";
import { ScrollView, View } from "react-native";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Highlight } from "@components/Highlight";

export function ForgotPassword() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Recuperar senha" />
      <Container>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Highlight
            title="Esqueceu a senha?"
            subtitle="Informe o e-mail cadastrado e receba uma nova!"
          />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button title="Recuperar" />
        </View>
        <View style={{ marginTop: 20 }}>
          <Paragraph>Lembrou?</Paragraph>
          <Button
            title="Voltar ao login"
            variant="transparent"
            onPress={handleGoBack}
          />
        </View>
      </Container>
    </ScrollView>
  );
}
