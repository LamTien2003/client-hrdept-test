import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { Input, Select, Button } from "@/components";
import { convertToTitleCase } from "@/utils/helper";

import { Role } from "@/types/common";
import styles from "./SearchForm.module.css";

const SearchForm = ({
  setFilterCriteria,
}: {
  setFilterCriteria: (value: any) => void;
}) => {
  const { handleSubmit, control } = useForm<{
    searchText: "";
    role: Role | "none";
  }>({
    defaultValues: {
      searchText: "",
      role: "none",
    },
  });

  const roleList = useMemo(
    () => [
      {
        label: "All Role",
        value: "none",
      },
      ...Object.entries(Role).map(([key, value]) => ({
        label: convertToTitleCase(key),
        value,
      })),
    ],
    []
  );

  const onSearch = (data: any) => {
    setFilterCriteria((prev: any) => ({
      ...prev,
      filters: {
        searchText: data?.searchText || "",
        role: data?.role || "",
      },
    }));
  };

  return (
    <form className={styles["main__search"]} onSubmit={handleSubmit(onSearch)}>
      <Input name="searchText" control={control} placeholder="Search users" />
      <Select name="role" control={control} dataSource={roleList} size="2" />
      <Button color="gray" highContrast onSubmit={handleSubmit(onSearch)}>
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
