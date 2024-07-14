import { FilterCriteria } from "./../types/common";
import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";
import { buildQueryString, downloadFile } from "@/utils/helper";

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

  const onExportUsersByFilter = async (filterCriteria: FilterCriteria<any>) => {
    try {
      setIsLoading(true);
      const queryString = buildQueryString({
        ...filterCriteria.filters,
        ...filterCriteria.paging,
      });
      const response = (await axiosClient.get(
        `user/downloadExcel?${queryString}`,
        {
          responseType: "blob",
        }
      )) as BlobPart;
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
    onExportUsersByFilter,
    isExportingUsers: isLoading,
  };
};

export default useExportUsers;
