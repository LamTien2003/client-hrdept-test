import { useController } from "react-hook-form";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Text, TextField } from "@radix-ui/themes";

import { InputProps } from "@/components/Input/Input.d";

const Input = ({
  type = "text",
  label,
  name,
  control,
  rules,
  searchIcon,
  placeholder,
}: InputProps) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <div className="d-flex flex-col gap--2">
      {label && (
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
      )}
      <TextField.Root {...field} placeholder={placeholder} size="2" type={type}>
        {searchIcon && (
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        )}
      </TextField.Root>
      {fieldState?.error && (
        <p className="error-field">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default Input;
