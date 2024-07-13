import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";

const useAddUser = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const onAddUser = async (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("role", data.role);
    if (data?.image) {
      formData.append("image", data?.image);
    }

    try {
      setIsLoading(true);
      const response = await axiosClient.post("user", formData);
      callback();
      setIsLoading(false);
      toast.success("Create User Successfully");
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };
  return {
    onAddUser,
    isAddingUser: isLoading,
  };
};

export default useAddUser;
