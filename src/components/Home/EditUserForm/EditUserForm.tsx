import { Dialog as RadixDialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UserForm } from "@/components";
import axiosClient from "@/services/axiosClient";

import EditUserFormProps from "@/components/Home/EditUserForm/EditUserForm.d";

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

  const onEditUser = async (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("role", data.role);
    formData.append("image", data.image);

    try {
      const response = await axiosClient.patch(`user/${user._id}`, formData);
      toast.success("Edit User Successfully");
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
      console.log(response);
    } catch (error: any) {
      toast.error(error.message);
      throw error.message;
    }
  };

  return (
    <form onSubmit={handleSubmit(onEditUser)}>
      <RadixDialog.Title>Edit User</RadixDialog.Title>
      <RadixDialog.Description size="2" mb="4">
        User Details
      </RadixDialog.Description>

      <UserForm
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
