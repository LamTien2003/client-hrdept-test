import { useEffect, useState } from "react";

import axiosClient from "@/services/axiosClient";
import { FilterCriteria, User } from "@/types/common";
import { buildQueryString } from "@/utils/helper";
import { toast } from "react-toastify";

const useGetUsers = (filterCriteria: FilterCriteria<{ role: string }>) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchApi = async () => {
        setIsLoading(true);
        const queryString = buildQueryString({
          ...filterCriteria.filters,
          ...filterCriteria.paging,
        });

        const response = await axiosClient.get(`/user?${queryString}`);
        setUsers(response?.data?.data || []);
        setTotalUsers(response?.data?.totalItems || 0);
        setIsLoading(false);
      };
      fetchApi();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  }, [filterCriteria]);

  return {
    users,
    totalUsers,
    isUsersLoading: isLoading,
  };
};

export default useGetUsers;
