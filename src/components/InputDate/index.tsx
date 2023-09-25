import { Calendar } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ButtonDate, ButtonDateText } from "./styles";
import { useTheme } from "styled-components";

interface InputDateProps {
  value: string;
  onChange: (newValue: string) => void;
}

export function InputDate({ value, onChange }: InputDateProps) {
  const { COLORS } = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = formatDate(date);
    onChange(formattedDate);
    hideDatePicker();
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const maskedInputProps = useMaskedInputProps({
    value: value,
    onChangeText: onChange,
    mask: Masks.DATE_DDMMYYYY,
  });

  return (
    <>
      <ButtonDate>
        <ButtonDateText
          style={{ flex: 1 }}
          placeholderTextColor={COLORS.GRAY_500}
          {...maskedInputProps}
        />
        <TouchableOpacity onPress={showDatePicker}>
          <Calendar size={20} color={COLORS.BRAND_LIGHT} />
        </TouchableOpacity>
      </ButtonDate>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
