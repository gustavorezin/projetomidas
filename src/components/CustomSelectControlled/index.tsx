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
  title: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
}

export function CustomSelectControlled({
  name,
  control,
  data,
  showSearch = false,
  error,
  title,
  defaultValue = "0",
  onChange,
}: CustomSelectControlledProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <CustomSelect
            title={title}
            data={data}
            onSelect={(item) => {
              field.onChange(item?.value);
              field.onBlur();
              if (onChange) {
                onChange(item?.value);
              }
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
