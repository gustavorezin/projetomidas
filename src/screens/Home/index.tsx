import { useRef, useCallback, useState } from "react";
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
import { AppError } from "@utils/AppError";
import Toast from "react-native-toast-message";
import { api } from "@services/api";
import { CdPessoaDTO } from "@dtos/CdPessoaDTO";
import { Dropdown, DropdownProps } from "@components/Dropdown";
import { Button } from "@components/Button";

interface DropdownItem {
  value: string;
  label: string;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDropdownEmps, setDataDropdownEmps] = useState<DropdownItem[]>([]);
  const { COLORS } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = ["25%", "50%", "75%"];

  async function handleSaleModal() {
    await fetchListCdPessoaEmp();
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

  async function fetchListCdPessoaEmp() {
    try {
      const response = await api.get("/private/cdpessoa/pessoa/localativos");
      const dropdownData = response.data.map((e: CdPessoaDTO) => ({
        value: e.id.toString(),
        label: e.nome,
      })) as DropdownItem[];
      setDataDropdownEmps(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "Empresa não encontrada";

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Não encontrado",
        text2,
      });
    }
  }

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
            <View style={{ flex: 1 }}>
              <Dropdown data={dataDropdownEmps} />
            </View>
            <Button title="Iniciar" />
          </ContainerBottomSheet>
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
}
