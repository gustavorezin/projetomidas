import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown as DropdownElement } from "react-native-element-dropdown";
import { CheckCircle } from "phosphor-react-native";

export type DropdownProps = {
  data: {
    value: String;
    label: String;
  }[];
};

export function Dropdown({ data }: DropdownProps) {
  const [value, setValue] = useState<String>();

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && <CheckCircle color="black" size={20} />}
      </View>
    );
  };

  return (
    <DropdownElement
      style={styles.container}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      search
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    backgroundColor: "#ccc",
    borderRadius: 6,
    padding: 14,
  },
  item: {
    padding: 14,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
