import { CaretDown, CaretUp } from "phosphor-react-native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  ButtonSelect,
  ButtonSelectText,
  Container,
  InputTextSearch,
  ItemList,
} from "./styles";

interface CustomSelectProps {
  data: SelectItem[];
  onSelect: (item: SelectItem | null) => void;
  showSearch?: boolean;
}

interface SelectItem {
  value: string;
  label: string;
}

export function CustomSelect({
  data,
  onSelect,
  showSearch = false,
}: CustomSelectProps) {
  const { COLORS } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSelectItem = (item: SelectItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsSearchClicked(false);
  };

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <ButtonSelect
        onPress={() => setIsSearchClicked(!isSearchClicked)}
        activeOpacity={0.7}
      >
        <ButtonSelectText>
          {selectedItem ? selectedItem.label : "Selecione um item"}
        </ButtonSelectText>
        {isSearchClicked ? (
          <CaretUp size={22} color={COLORS.WHITE} />
        ) : (
          <CaretDown size={22} color={COLORS.WHITE} />
        )}
      </ButtonSelect>
      {isSearchClicked && (
        <View
          style={{
            width: "100%",
            borderRadius: 6,
            marginTop: 10,
            gap: 10,
            backgroundColor: "white",
            elevation: 6,
          }}
        >
          {showSearch && (
            <InputTextSearch
              placeholder="Buscando por..."
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          )}
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <ItemList onPress={() => handleSelectItem(item)}>
                <Text>{item.label}</Text>
              </ItemList>
            )}
            keyExtractor={(item) => item.value}
            contentContainerStyle={[{ paddingBottom: 10 }]}
          />
        </View>
      )}
    </Container>
  );
}
