import React, { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";

import { Container, ContainerBottomSheet } from "./styles";

import { CardButton } from "@components/CardButton";
import { Header } from "@components/Header";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { useTheme } from "styled-components/native";

import { NewSaleBottomSheet } from "@components/NewSaleBottomSheet";

export function Home() {
  const sheetRef = useRef<BottomSheet>(null);
  const { COLORS } = useTheme();

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  );

  const handleSaleModal = () => {
    sheetRef.current?.snapToIndex(1);
  };

  return (
    <BottomSheetModalProvider>
      <Container>
        <Header title="Home" showDrawerButton />
        <View style={{ padding: 20, flex: 1 }}>
          <CardButton title="Nova venda" onPress={handleSaleModal} />
        </View>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 24,
            backgroundColor: COLORS.GRAY_700,
          }}
          handleIndicatorStyle={{ backgroundColor: COLORS.BRAND_LIGHT }}
          backdropComponent={renderBackdrop}
        >
          <ContainerBottomSheet>
            <NewSaleBottomSheet />
          </ContainerBottomSheet>
        </BottomSheet>
      </Container>
    </BottomSheetModalProvider>
  );
}
