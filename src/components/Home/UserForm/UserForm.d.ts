import { Ref } from "react";
import {
  Control,
  FormState,
  SetFieldValue,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface UserFormProps {
  formState?: FormState;
  handleSubmit: UseFormHandleSubmit;
  control: Control<any>;
  setValue: SetFieldValue;
  inputFileRef: Ref;
  isLoading?: boolean;
}
