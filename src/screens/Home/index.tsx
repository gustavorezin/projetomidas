import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";

import { Container, ContainerBottomSheet } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { CardButton } from "@components/CardButton";
import { CustomSelectControlled } from "@components/CustomSelectControlled";
import { InputDateControlled } from "@components/InputDateControlled";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { CdPessoaDTO } from "@dtos/CdPessoaDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useTheme } from "styled-components/native";

import { docCategorys } from "@utils/Doc";
import Toast from "react-native-toast-message";

interface SelectItem {
  value: string;
  label: string;
}

type FormDataProps = {
  cdpessoaemp: number;
  dataem: string;
  categoria: string;
  cdpessoapara: number;
  cdnfecfg: number;
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
  categoria: yup
    .string()
    .notOneOf(["0"], "Selecione uma categoria válida")
    .required("Campo obrigatório"),
  cdpessoapara: yup
    .number()
    .min(1, "Selecione um destinatário")
    .required("Campo obrigatório"),
  cdnfecfg: yup
    .number()
    .min(1, "Selecione uma config. fiscal")
    .required("Campo obrigatório"),
});

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIdEmp, setSelectedIdEmp] = useState(0);
  const [selectedCdPessoaPara, setSelectedCdPessoaPara] = useState<CdPessoaDTO>(
    {} as CdPessoaDTO
  );
  const [dataDropdownEmps, setDataDropdownEmps] = useState<SelectItem[]>([]);
  const [dataDropdownDocCats, setDataDropdownDocCats] = useState<SelectItem[]>(
    []
  );
  const [dataDropdownCdPessoaPara, setDataDropdownCdPessoaPara] = useState<
    SelectItem[]
  >([]);
  const [dataDropdownCdNfeCfg, setDataDropdownCdNfeCfg] = useState<
    SelectItem[]
  >([]);
  const sheetRef = useRef<BottomSheet>(null);
  const { COLORS } = useTheme();

  const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, "dd/MM/yyyy");
  };

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

  const handleSaleModal = async () => {
    await fetchListCdPessoaEmp();
    await fetchListDocCategoria();
    sheetRef.current?.snapToIndex(1);
  };

  const fetchListCdPessoaEmp = async () => {
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
      const text2 = isAppError ? error.message : "";

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Empresas não encontradas",
        text2,
      });
    }
  };

  const fetchListDocCategoria = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/private/app/listaslccatdoc");
      const dropdownData = response.data.map((e: any) => ({
        value: e,
        label: docCategorys(e),
      })) as SelectItem[];
      setDataDropdownDocCats(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Categorias não encontradas",
        text2,
      });
    }
  };

  const fetchListCdPessoaPara = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/private/cdpessoa/pessoa/ativo");
      const dropdownData = response.data.map((e: CdPessoaDTO) => ({
        value: e.id.toString(),
        label: `${e.id.toString()} | ${e.nome}`,
      })) as SelectItem[];
      setDataDropdownCdPessoaPara(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Clientes não encontrados",
        text2,
      });
    }
  };

  const fetchGetCdPessoaPara = async (id: Number) => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/private/cdpessoa/pessoa/${id}`);
      console.log(data.id);
      setSelectedCdPessoaPara(data);
      console.log(selectedCdPessoaPara);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Cliente não encontrado",
        text2,
      });
    }
  };

  const fetchListCdNfeCfg = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/private/cdnfecfg/nfecfg/local/${selectedIdEmp}/tpop/1/crtdest/${selectedCdPessoaPara.crt}/coduf/${selectedCdPessoaPara.cdestado.id}`
      );
      const dropdownData = response.data.map((e: any) => ({
        value: e.id.toString(),
        label: `CFOP ${e.cfop} | ${e.descricao}`,
      })) as SelectItem[];
      setDataDropdownCdNfeCfg(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Config. fiscais não encontradas",
        text2,
      });
    }
  };

  const handleCdPessoaEmpSelect = async (selectedValue: number) => {
    setSelectedIdEmp(selectedValue);
    await fetchListCdPessoaPara();
  };

  const handleCdPessoaParaSelect = async (selectedValue: number) => {
    await fetchGetCdPessoaPara(selectedValue);

    await fetchListCdNfeCfg();
  };

  const handleSignIn = ({
    cdpessoaemp,
    dataem,
    categoria,
    cdpessoapara,
  }: FormDataProps) => {
    alert(cdpessoaemp + "  " + dataem + "  " + categoria + "  " + cdpessoapara);
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <Highlight title="Nova venda" />
                <View style={{ flex: 1, marginVertical: 20, gap: 10 }}>
                  <CustomSelectControlled
                    title="Selecione uma empresa"
                    name="cdpessoaemp"
                    control={control}
                    data={dataDropdownEmps}
                    error={errors.cdpessoaemp}
                    onChange={handleCdPessoaEmpSelect}
                  />
                  <InputDateControlled
                    defaultValue={getCurrentDate()}
                    name="dataem"
                    control={control}
                    error={errors.dataem}
                  />
                  <CustomSelectControlled
                    title="Selecione uma categoria"
                    name="categoria"
                    control={control}
                    data={dataDropdownDocCats}
                    error={errors.categoria}
                  />
                  {selectedIdEmp > 0 && (
                    <>
                      <CustomSelectControlled
                        title="Selecione um destinatário"
                        name="cdpessoapara"
                        control={control}
                        data={dataDropdownCdPessoaPara}
                        error={errors.cdpessoapara}
                        onChange={handleCdPessoaParaSelect}
                        showSearch
                      />
                      {selectedCdPessoaPara.id > 0 && (
                        <CustomSelectControlled
                          title="Selecione uma config. fiscal"
                          name="cdnfecfg"
                          control={control}
                          data={dataDropdownCdNfeCfg}
                          error={errors.cdnfecfg}
                        />
                      )}
                    </>
                  )}
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
