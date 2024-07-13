import { Dialog as RadixDialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UserForm } from "@/components";

import EditUserFormProps from "@/components/Home/EditUserForm/EditUserForm.d";
import useEditUser from "@/hooks/useEditUser";

const schema = yup
  .object({
    email: yup.string().required(),
    role: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    image: yup.mixed(),
  })
  .required();

const EditUserForm = ({ user, setFilterCriteria }: EditUserFormProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      ...user,
    },
    resolver: yupResolver(schema),
  });

  const { onEditUser, isEditingUser } = useEditUser(() => {
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
  });

  return (
    <form onSubmit={handleSubmit(onEditUser)}>
      <RadixDialog.Title>Edit User</RadixDialog.Title>
      <RadixDialog.Description size="2" mb="4">
        User Details
      </RadixDialog.Description>

      <UserForm
        isLoading={isEditingUser}
        formState={formState}
        control={control}
        handleSubmit={handleSubmit(onEditUser)}
        inputFileRef={inputFileRef}
        setValue={setValue}
      />
    </form>
  );
};

export default EditUserForm;
