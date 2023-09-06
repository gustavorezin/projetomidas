import { useRef, useCallback } from "react";
import { Container, ContainerBottomSheet } from "./styles";

import { Header } from "@components/Header";
import { View } from "react-native";
import { CardButton } from "@components/CardButton";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useTheme } from "styled-components/native";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

export function Home() {
  const { COLORS } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = ["25%", "50%", "75%"];

  function handleSaleModal() {
    bottomSheetModalRef.current?.present();
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={0}
        appearsOnIndex={1}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <Container>
        <Header title="Home" showDrawerButton />
        <View style={{ padding: 20 }}>
          <CardButton title="Nova venda" onPress={handleSaleModal} />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 24,
            backgroundColor: COLORS.GRAY_700,
          }}
          handleIndicatorStyle={{ backgroundColor: COLORS.BRAND_LIGHT }}
          backdropComponent={renderBackdrop}
        >
          <ContainerBottomSheet>
            <Highlight title="Nova venda" subtitle="" />
            <Input placeholder="bla bla" />
          </ContainerBottomSheet>
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
}
