import { Calendar } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ButtonDate, ButtonDateText, Container } from "./styles";
import { useTheme } from "styled-components";
import { Label } from "@components/Label";

interface InputDateProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
}

export function InputDate({ value, onChange, label }: InputDateProps) {
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
      <Container>
        <Label label={label} />
        <ButtonDate>
          <ButtonDateText
            style={{ flex: 1 }}
            placeholderTextColor={COLORS.GRAY_400}
            {...maskedInputProps}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <Calendar size={20} color={COLORS.BRAND_LIGHT} />
          </TouchableOpacity>
        </ButtonDate>
      </Container>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
