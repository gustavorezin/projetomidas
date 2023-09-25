import { useCallback, useMemo, useRef, useState } from "react";
import { Container, ContainerBottomSheet } from "./styles";
import { Button } from "@components/Button";
import { CardButton } from "@components/CardButton";
import { CustomSelectControlled } from "@components/CustomSelectControlled";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { InputDateControlled } from "@components/InputDateControlled";
import { CdPessoaDTO } from "@dtos/CdPessoaDTO";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useForm } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "styled-components/native";
import * as yup from "yup";
import { format } from "date-fns";

interface SelectItem {
  value: string;
  label: string;
}

type FormDataProps = {
  cdpessoaemp: number;
  dataem: string;
};

const schema = yup.object({
  cdpessoaemp: yup
    .number()
    .min(1, "Selecione uma empresa")
    .required("Campo obrigatório"),
  dataem: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Data inválida"
    )
    .required("Campo obrigatório"),
});

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDropdownEmps, setDataDropdownEmps] = useState<SelectItem[]>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const { COLORS } = useTheme();

  function getCurrentDate() {
    const currentDate = new Date();
    return format(currentDate, "dd/MM/yyyy");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

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

  async function handleSaleModal() {
    await fetchListCdPessoaEmp();
    sheetRef.current?.snapToIndex(1);
  }

  async function fetchListCdPessoaEmp() {
    try {
      setIsLoading(true);
      const response = await api.get("/private/cdpessoa/pessoa/localativos");
      const dropdownData = response.data.map((e: CdPessoaDTO) => ({
        value: e.id.toString(),
        label: e.nome,
      })) as SelectItem[];
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

  async function handleSignIn({ cdpessoaemp, dataem }: FormDataProps) {
    alert(cdpessoaemp + "  " + dataem);
  }

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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <Highlight title="Nova venda" />
                <View style={{ flex: 1, marginTop: 10, gap: 10 }}>
                  <CustomSelectControlled
                    name="cdpessoaemp"
                    control={control}
                    data={dataDropdownEmps}
                    error={errors.cdpessoaemp}
                  />
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <InputDateControlled
                      defaultValue={getCurrentDate()}
                      name="dataem"
                      control={control}
                      error={errors.dataem}
                    />
                  </View>
                </View>
                <Button title="Iniciar" onPress={handleSubmit(handleSignIn)} />
              </View>
            </TouchableWithoutFeedback>
          </ContainerBottomSheet>
        </BottomSheet>
      </Container>
    </BottomSheetModalProvider>
  );
}
