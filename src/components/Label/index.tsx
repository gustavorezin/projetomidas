import React from "react";
import { TextLabel } from "./styles";

interface LabelProps {
  label: string;
}

export function Label({ label }: LabelProps) {
  return <TextLabel>{label}</TextLabel>;
}
