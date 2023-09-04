/* import { Text, TouchableOpacity, View } from "react-native";
import { Container } from "./styles";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SignOut } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";

export function CustomDrawer(props : any) {
  const { cliente, signOut } = useAuth();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        contentContainerStyle={{backgroundColor: '#949494'}}  
      >
        <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#fff'}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={signOut} style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center'}}>
          <SignOut size={22} />
          <Text style={{fontSize: 16, marginLeft: 5}}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 */

import React from "react";
import { SignOut } from "phosphor-react-native";
import {
  Container,
  DrawerContentScrollViewContainer,
  BottomSection,
  SignOutButton,
  SignOutText,
} from "./styles"; // Import your styled-components
import { useAuth } from "@hooks/useAuth";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export function CustomDrawer(props : any) {
  const { cliente, signOut } = useAuth();
  
  return (
    <Container>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "#949494" }}
      >
        <DrawerContentScrollViewContainer>
          <DrawerItemList {...props} />
        </DrawerContentScrollViewContainer>
      </DrawerContentScrollView>
      <BottomSection>
        <SignOutButton onPress={signOut}>
          <SignOut size={22} />
          <SignOutText>Sair</SignOutText>
        </SignOutButton>
      </BottomSection>
    </Container>
  );
}