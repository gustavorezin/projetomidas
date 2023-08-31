import React from "react";
import { Error } from "./styles";
import { Control, Controller, FieldError } from "react-hook-form";
import { Input, InputProps } from "@components/Input";

type Props = InputProps & {
  name: string;
  control: Control<any>;
  error?: FieldError;
};
export function InputControlled({ name, control, error, ...rest }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{error.message}</Error>}
    </>
  );
}
