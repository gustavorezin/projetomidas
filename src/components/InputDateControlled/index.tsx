import { InputDate } from "@components/InputDate";
import { Controller, FieldError } from "react-hook-form";
import { Error } from "./styles";

interface InputDateControlledProps {
  name: string;
  control: any;
  defaultValue?: any;
  error?: FieldError;
  label: string;
}

export function InputDateControlled({
  name,
  control,
  defaultValue = "",
  error,
  label,
}: InputDateControlledProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <InputDate value={value} label={label} onChange={onChange} />
        )}
      />
      {error && <Error>{error.message}</Error>}
    </>
  );
}
