import { useCallback, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Container, ContainerBottomSheet } from "./styles";

import { Button } from "@components/Button";
import { CardButton } from "@components/CardButton";
import { CustomSelect } from "@components/CustomSelect";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { CdPessoaDTO } from "@dtos/CdPessoaDTO";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "styled-components/native";

interface DropdownItem {
  value: string;
  label: string;
}

interface SelectItem {
  value: string;
  label: string;
}

const data = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
  { value: "4", label: "Item 4" },
  { value: "5", label: "Item 5" },
  { value: "6", label: "Item 6" },
  { value: "7", label: "Item 7" },
  { value: "8", label: "Item 8" },
  { value: "9", label: "Item 9" },
  { value: "10", label: "Item 10" },
  { value: "11", label: "Item 11" },
  { value: "12", label: "Item 12" },
  { value: "13", label: "Item 2" },
  { value: "14", label: "Item 3" },
  { value: "15", label: "Item 4" },
  { value: "16", label: "Item 5" },
  { value: "17", label: "Item 6" },
  { value: "18", label: "Item 7" },
  { value: "19", label: "Item 8" },
  { value: "20", label: "Item 9" },
  { value: "21", label: "Item 10" },
  { value: "22", label: "Item 11" },
  { value: "23", label: "Item 12" },
  // Adicione mais itens conforme necessário
];

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDropdownEmps, setDataDropdownEmps] = useState<DropdownItem[]>([]);
  const [selectedEmp, setSelectedEmp] = useState<SelectItem | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { COLORS } = useTheme();

  const snapPoints = ["50%", "75%"];

  async function handleSaleModal() {
    // await fetchListCdPessoaEmp();
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
      setIsLoading(true);
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

  const handleSelect = (item: SelectItem | null) => {
    setSelectedEmp(item);
  };

  return (
    <BottomSheetModalProvider>
      <Container>
        <Header title="Home" showDrawerButton />
        <View style={{ padding: 20, flex: 1 }}>
          <CardButton title="Nova venda" onPress={handleSaleModal} />
          <CustomSelect data={data} onSelect={handleSelect} showSearch />
          <CardButton title="Nova venda" onPress={handleSaleModal} />
        </View>
        <View style={{ flex: 1 }}>
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
              <CustomSelect data={data} onSelect={handleSelect} showSearch />
              {/* <Button title="Iniciar" /> */}
            </ContainerBottomSheet>
          </BottomSheetModal>
        </View>
      </Container>
    </BottomSheetModalProvider>
  );
}
