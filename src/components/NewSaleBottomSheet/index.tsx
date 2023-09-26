import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { format } from "date-fns";
import { Container } from "./styles";

import { Highlight } from "@components/Highlight";
import { CustomSelectControlled } from "@components/CustomSelectControlled";
import { InputDateControlled } from "@components/InputDateControlled";
import { Button } from "@components/Button";
import { SelectItem } from "@components/CustomSelect";

import { CdPessoaDTO } from "@dtos/CdPessoaDTO";
import { docCategorys } from "@utils/Doc";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormNewSaleProps = {
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

export function NewSaleBottomSheet() {
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

  const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, "dd/MM/yyyy");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewSaleProps>({
    resolver: yupResolver(schema),
  });

  const fetchListCdPessoaEmp = async () => {
    try {
      const response = await api.get("/private/cdpessoa/pessoa/localativos");
      const dropdownData = response.data.map((e: CdPessoaDTO) => ({
        value: e.id.toString(),
        label: e.nome,
      })) as SelectItem[];
      setDataDropdownEmps(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      Toast.show({
        type: "error",
        text1: "Empresas não encontradas",
        text2,
      });
    }
  };

  const fetchListDocCategoria = async () => {
    try {
      const response = await api.get("/private/app/listaslccatdoc");
      const dropdownData = response.data.map((e: any) => ({
        value: e,
        label: docCategorys(e),
      })) as SelectItem[];
      setDataDropdownDocCats(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      Toast.show({
        type: "error",
        text1: "Categorias não encontradas",
        text2,
      });
    }
  };

  const fetchListCdPessoaPara = async () => {
    try {
      const response = await api.get("/private/cdpessoa/pessoa/ativo");
      const dropdownData = response.data.map((e: CdPessoaDTO) => ({
        value: e.id.toString(),
        label: `${e.id.toString()} | ${e.nome}`,
      })) as SelectItem[];
      setDataDropdownCdPessoaPara(dropdownData);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      Toast.show({
        type: "error",
        text1: "Clientes não encontrados",
        text2,
      });
    }
  };

  const fetchGetCdPessoaPara = async (id: Number) => {
    try {
      const { data } = await api.get(`/private/cdpessoa/pessoa/${id}`);
      console.log(data.id);
      setSelectedCdPessoaPara(data);
      console.log(selectedCdPessoaPara);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text2 = isAppError ? error.message : "";

      Toast.show({
        type: "error",
        text1: "Cliente não encontrado",
        text2,
      });
    }
  };

  const fetchListCdNfeCfg = async () => {
    try {
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
    console.log(selectedValue);
    await fetchGetCdPessoaPara(selectedValue);
    await fetchListCdNfeCfg();
  };

  const handleFormNewSaleSubmit = (data: FormNewSaleProps) => {
    alert(
      data.cdpessoaemp +
        "  " +
        data.dataem +
        "  " +
        data.categoria +
        "  " +
        data.cdpessoapara
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchListCdPessoaEmp();
      await fetchListDocCategoria();
    };
    fetchData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Highlight title="Nova venda" />
        <View style={{ flex: 1, marginVertical: 20, gap: 10 }}>
          <CustomSelectControlled
            label="Empresa/local de controle"
            name="cdpessoaemp"
            control={control}
            data={dataDropdownEmps}
            error={errors.cdpessoaemp}
            onChange={handleCdPessoaEmpSelect}
          />
          <InputDateControlled
            label="Data de emissão"
            name="dataem"
            control={control}
            error={errors.dataem}
            defaultValue={getCurrentDate()}
          />
          <CustomSelectControlled
            label="Categoria"
            name="categoria"
            control={control}
            data={dataDropdownDocCats}
            error={errors.categoria}
          />
          {selectedIdEmp > 0 && (
            <>
              <CustomSelectControlled
                label="Destinatário"
                name="cdpessoapara"
                control={control}
                data={dataDropdownCdPessoaPara}
                error={errors.cdpessoapara}
                onChange={handleCdPessoaParaSelect}
                showSearch
              />
              {selectedCdPessoaPara.id > 0 && (
                <CustomSelectControlled
                  label="Tributação a ser aplicada | Configuração fiscal"
                  name="cdnfecfg"
                  control={control}
                  data={dataDropdownCdNfeCfg}
                  error={errors.cdnfecfg}
                />
              )}
            </>
          )}
        </View>
        <Button
          title="Iniciar"
          onPress={handleSubmit(handleFormNewSaleSubmit)}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}
