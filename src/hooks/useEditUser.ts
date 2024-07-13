import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";
import { useState } from "react";

const useEditUser = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const onEditUser = async (data: any) => {
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
      const response = await axiosClient.patch(`user/${data._id}`, formData);
      callback();

      setIsLoading(false);
      toast.success("Edit User Successfully");
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };
  return {
    onEditUser,
    isEditingUser: isLoading,
  };
};

export default useEditUser;
