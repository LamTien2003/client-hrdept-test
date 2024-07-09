import { Control } from "react-hook-form";

export interface InputProps {
  type?: "text" | "password";
  label?: string;
  searchIcon?: boolean;
  placeholder: string;
  control: Control<any>;
  rules?: ValidationRule<any>;
  name: string;
}
