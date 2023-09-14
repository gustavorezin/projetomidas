import { CaretDown, CaretUp } from "phosphor-react-native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  ButtonSelect,
  ButtonSelectText,
  Container,
  ContainerItems,
  InputTextSearch,
  ItemList,
} from "./styles";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

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

  const maxHeight = 200;
  const itemHeight = 48;
  const numberOfItems = filteredData.length;
  const containerHeight =
    numberOfItems > 3
      ? maxHeight
      : numberOfItems * itemHeight + (showSearch ? 46 : 0);

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
        <ContainerItems style={{ elevation: 6, height: containerHeight }}>
          {showSearch && (
            <InputTextSearch
              placeholder="Buscando por..."
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          )}
          <BottomSheetFlatList
            data={filteredData}
            renderItem={({ item }) => (
              <ItemList onPress={() => handleSelectItem(item)}>
                <Text>{item.label}</Text>
              </ItemList>
            )}
            keyExtractor={(item) => item.value}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{ paddingBottom: 20 }]}
          />
        </ContainerItems>
      )}
    </Container>
  );
}
