import { Dialog as RadixDialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import config from "@/config";
import UserForm from "@/components/Home/UserForm";
import axiosClient from "@/services/axiosClient";

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

  const onAddUser = async (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("role", data.role);
    formData.append("image", data.image);

    try {
      const response = await axiosClient.post("user", formData);
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
      toast.success("Create User Successfully");
      console.log(response);
    } catch (error: any) {
      toast.error(error.message);
      throw error.message;
    }
  };

  return (
    <form onSubmit={handleSubmit(onAddUser)}>
      <RadixDialog.Title>Add User</RadixDialog.Title>
      <RadixDialog.Description size="2" mb="4">
        User Details
      </RadixDialog.Description>

      <UserForm
        control={control}
        handleSubmit={handleSubmit(onAddUser)}
        inputFileRef={inputFileRef}
        setValue={setValue}
      />
    </form>
  );
};

export default AddUserForm;
