import { Calendar } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ButtonDate, ButtonDateText, Error } from "./styles";
import { useTheme } from "styled-components";
import { FieldError } from "react-hook-form";

interface InputDateProps {
  value: string; // O valor do campo
  onChange: (newValue: string) => void; // Função para atualizar o valor
  error?: FieldError;
}

export function InputDate({ value, onChange, error }: InputDateProps) {
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
        <ButtonDateText style={{ flex: 1 }} {...maskedInputProps} />
        <TouchableOpacity onPress={showDatePicker}>
          <Calendar size={20} color={COLORS.BRAND_LIGHT} />
        </TouchableOpacity>
      </ButtonDate>
      {error && <Error>{error.message}</Error>}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
