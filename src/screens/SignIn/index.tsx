import { Button } from "@components/Button";
import { InputControlled } from "@components/InputControlled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from "yup";
import LogoImage from "../../assets/logo-nome-cinza.png";
import { Container, Image, Paragraph, Text } from "./styles";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import toast, { Toaster } from "react-hot-toast";

type FormDataProps = {
  tenantid?: Number;
  username: string;
  password: string;
};

const schema = yup.object({
  username: yup.string().email("E-mail inválido").required("Informe o e-mail"),
  password: yup
    .string()
    .min(6, "A senha deve ter ao menos 6 dígitos")
    .required("Informe a senha"),
});

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const insets = useSafeAreaInsets();

  async function handleSignIn(dataa: FormDataProps) {
    console.log(dataa);
    try {
      const { data } = await api.post("/auth/login", { dataa });
    } catch (error) {
      const isAppError = error instanceof AppError;
      alert;
    }
  }

  function handleForgotPassword() {
    navigation.navigate("forgotPassword");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, padding: 24 }}>
        <Container>
          <Image source={LogoImage} defaultSource={LogoImage} />
          <Text>Acesse sua conta</Text>
          <InputControlled
            name="username"
            control={control}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            variant="light"
            error={errors.username}
          />
          <InputControlled
            name="password"
            control={control}
            placeholder="Senha"
            secureTextEntry
            variant="light"
            error={errors.password}
          />
          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Paragraph>Esqueci minha senha</Paragraph>
          </TouchableOpacity>
        </Container>
        <View style={{ paddingBottom: insets.bottom, gap: 10 }}>
          <Paragraph>Ainda não tem acesso?</Paragraph>
          <Button title="Entre em contato" variant="transparent" />
        </View>
      </View>
    </ScrollView>
  );
}
