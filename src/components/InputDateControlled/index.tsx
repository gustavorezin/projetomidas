import { InputDate } from "@components/InputDate";
import { Controller, FieldError } from "react-hook-form";
import { Error } from "./styles";
import { View } from "react-native";

interface InputDateControlledProps {
  name: string;
  control: any;
  defaultValue?: any;
  error?: FieldError;
}

export function InputDateControlled({
  name,
  control,
  defaultValue = "",
  error,
}: InputDateControlledProps) {
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <InputDate value={value} onChange={onChange} />
        )}
      />
      {error && <Error>{error.message}</Error>}
    </View>
  );
}
