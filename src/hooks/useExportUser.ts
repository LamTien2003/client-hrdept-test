import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";
import { downloadFile } from "@/utils/helper";

const useExportUsers = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onExportUsers = async () => {
    try {
      setIsLoading(true);
      const response = (await axiosClient.get("user/downloadExcel", {
        responseType: "blob",
      })) as BlobPart;
      downloadFile(response, "users");

      toast.success("Export Users Successfully");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };

  return {
    onExportUsers,
    isExportingUsers: isLoading,
  };
};

export default useExportUsers;
