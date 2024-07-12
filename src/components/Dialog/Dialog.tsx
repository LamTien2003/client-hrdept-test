import { Dialog as RadixDialog } from "@radix-ui/themes";

import DialogProps from "@/components/Dialog/Dialog.d";

const Dialog = ({ children, content }: DialogProps) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>{children}</RadixDialog.Trigger>

      <RadixDialog.Content minWidth="55vw">{content}</RadixDialog.Content>
    </RadixDialog.Root>
  );
};

export default Dialog;
