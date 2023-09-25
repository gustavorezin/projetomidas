import React from "react";
import { Error } from "./styles";
import { CustomSelect, SelectItem } from "@components/CustomSelect";
import { Controller, FieldError } from "react-hook-form";

interface CustomSelectControlledProps {
  name: string;
  control: any; // Pode ser tipado de acordo com a sua aplicação
  data: SelectItem[];
  showSearch?: boolean;
  error?: FieldError;
}

export function CustomSelectControlled({
  name,
  control,
  data,
  showSearch = false,
  error,
}: CustomSelectControlledProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <CustomSelect
            data={data}
            onSelect={(item) => {
              field.onChange(item?.value);
              field.onBlur();
            }}
            // onSelect={(item) => {
            //   const numericValue = parseInt(item?.value || "0");
            //   field.onChange(isNaN(numericValue) ? 0 : numericValue);
            //   field.onBlur();
            // }}
            showSearch={showSearch}
          />
        )}
      />
      {error && <Error>{error.message}</Error>}
    </>
  );
}
