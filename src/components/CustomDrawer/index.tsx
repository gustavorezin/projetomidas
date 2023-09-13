import React from "react";
import { SignOut, Question } from "phosphor-react-native";
import {
  Container,
  DrawerContentScrollViewContainer,
  BottomSection,
  BottomButton,
  BottomText,
  ProfileSection,
  ProfileImage,
  ProfileGreating,
  ProfileGreatingText,
  ProfileGreatingName,
  ProfileCompany,
} from "./styles";
import { useAuth } from "@hooks/useAuth";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useTheme } from "styled-components/native";
import { Linking, View } from "react-native";

export function CustomDrawer(props: any) {
  const { COLORS } = useTheme();
  const { cliente, signOut } = useAuth();

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Não é possível abrir o URL");
      }
    } catch (error) {
      console.error("Erro ao tentar abrir o URL");
    }
  };

  return (
    <Container>
      <DrawerContentScrollView>
        <ProfileSection>
          <ProfileImage
            source={{ uri: "https://github.com/gustavorezin.png" }}
          />
          <View style={{ marginLeft: 10 }}>
            <ProfileGreating>
              <ProfileGreatingText>Olá, </ProfileGreatingText>
              <ProfileGreatingName>{cliente.nome}</ProfileGreatingName>
            </ProfileGreating>
            <ProfileCompany>{cliente.cdpessoaempnome}</ProfileCompany>
          </View>
        </ProfileSection>
        <DrawerContentScrollViewContainer>
          <DrawerItemList {...props} />
        </DrawerContentScrollViewContainer>
      </DrawerContentScrollView>
      <BottomSection>
        <BottomButton
          onPress={() =>
            handleOpenLink(
              "https://midassi.notion.site/Duvidas-Midas-4928ba0d195b4241b444624ef5dacca6?pvs=4"
            )
          }
        >
          <Question size={22} color="#3498db" />
          <BottomText>Dúvidas</BottomText>
        </BottomButton>
        <BottomButton onPress={signOut}>
          <SignOut size={22} color={COLORS.RED} />
          <BottomText>Sair</BottomText>
        </BottomButton>
      </BottomSection>
    </Container>
  );
}
