import * as yup from "yup";
import { Dialog as RadixDialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import config from "@/config";
import { UserForm } from "@/components";
import useAddUser from "@/hooks/useAddUser";

const schema = yup
  .object({
    email: yup.string().email().required(),
    role: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup
      .string()
      .matches(config.phoneNumberRegex, "Phone number is not valid")
      .required(),
    image: yup.mixed(),
  })
  .required();

const AddUserForm = ({
  setFilterCriteria,
}: {
  setFilterCriteria: (value: any) => void;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      email: "",
      role: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });
  const { onAddUser, isAddingUser } = useAddUser(() => {
    setFilterCriteria({
      filters: {
        searchText: "",
        role: "",
      },
      paging: {
        page: 1,
        pageSize: 5,
      },
    });
    reset();
  });

  return (
    <form onSubmit={handleSubmit(onAddUser)}>
      <RadixDialog.Title>Add User</RadixDialog.Title>
      <RadixDialog.Description size="2" mb="4">
        User Details
      </RadixDialog.Description>

      <UserForm
        isLoading={isAddingUser}
        control={control}
        handleSubmit={handleSubmit(onAddUser)}
        inputFileRef={inputFileRef}
        setValue={setValue}
      />
    </form>
  );
};

export default AddUserForm;
