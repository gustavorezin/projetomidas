import React, { useEffect, useState } from "react";
import { Container } from "./styles";

import { Header } from "@components/Header";
import { FlatList, View } from "react-native";
import { SummaryCard } from "@components/SummaryCard";
import { AppError } from "@utils/AppError";
import Toast from "react-native-toast-message";
import { api } from "@services/api";

type SumarryProp = {
  title: string;
  description: string;
};

export function Home() {
  const [summarys, setSummarys] = useState<SumarryProp[]>([{} as SumarryProp]);

  async function fetchLcDocs() {
    try {
      const response = await api.get(
        `/private/lcdoc/doc/valores/b/undefined/lc/0/para/0/vep/0/tp/01/cat/00/ofe/E/dti/2023-01-01/dtf/2023-12-31/coduf/0/st/2`
      );
      const newItem = {
        title: "Total de vendas",
        description: `${response.data.length} venda(s) faturadas`,
      };
      setSummarys([newItem]);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const text1 = isAppError
        ? error.message
        : "Não foi possível carregar os dados. Tente novamente";
      Toast.show({
        type: "error",
        text1,
      });
    }
  }

  useEffect(() => {
    fetchLcDocs();
  }, []);

  return (
    <Container>
      <Header title="Home" showDrawerButton />
      <View style={{ padding: 20 }}>
        <FlatList
          data={summarys}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <SummaryCard title={item.title} description={item.description} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Container>
  );
}
