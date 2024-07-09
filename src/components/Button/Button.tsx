import { Button as RadixButton } from "@radix-ui/themes";

import ButtonProps from "@/components/Button/Button.d";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <RadixButton {...props} className="cursor-pointer">
      {children}
    </RadixButton>
  );
};

export default Button;
