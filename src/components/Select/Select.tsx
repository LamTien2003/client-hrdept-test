import { Select as RadixSelect, Text } from "@radix-ui/themes";
import { useController } from "react-hook-form";
import { useEffect } from "react";

import SelectProps from "@/components/Select/Select.d";

const Select = ({
  label,
  name,
  control,
  rules,
  onValueChange,
  size = "1",
  dataSource,
}: SelectProps) => {
  const { field, fieldState } = useController({ name, control, rules });

  useEffect(() => {
    onValueChange && onValueChange(field.value);
  }, [field.value]);

  return (
    <div className="d-flex flex-col gap--2">
      {label && (
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
      )}
      <RadixSelect.Root
        {...field}
        defaultValue={dataSource[0].value?.toString()}
        onValueChange={field.onChange}
        size={size}
      >
        <RadixSelect.Trigger className="cursor-pointer" />

        <RadixSelect.Content>
          {dataSource.map(item => (
            <RadixSelect.Item
              key={item.value}
              value={item?.value?.toString() || "none"}
              className="cursor-pointer"
            >
              {item.label}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Root>
      {fieldState?.error && (
        <p className="error-field">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default Select;
