import { Container, Paragraph } from "./styles";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Highlight } from "@components/Highlight";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ForgotPassword() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Header title="Recuperar senha" showBackButton />
        <Container>
          <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
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
          <View style={{ marginTop: 20, paddingBottom: insets.bottom + 44 }}>
            <Paragraph>Lembrou?</Paragraph>
            <Button
              title="Voltar ao login"
              variant="transparent"
              onPress={() => navigation.goBack()}
            />
          </View>
        </Container>
      </View>
    </TouchableWithoutFeedback>
  );
}
