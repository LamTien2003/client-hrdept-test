import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

import { Button, Select } from "@/components";

import PaginationProps from "@/components/Pagination/Pagination.d";
import { FilterCriteria } from "@/types/common";
import styles from "./Pagination.module.css";

const Pagination = ({
  filterCriteria,
  totalItems,
  rowsPerPage,
  setFilterCriteria,
}: PaginationProps) => {
  const { control } = useForm({
    defaultValues: {
      pageSize: filterCriteria.paging.pageSize || 1,
      rowsPerPage: rowsPerPage[0].value,
    },
  });

  const onChangePageSize = (value: any) => {
    setFilterCriteria((prev: FilterCriteria<any>) => ({
      ...prev,
      paging: {
        page: 1,
        pageSize: value,
      },
    }));
  };

  const onBack = () => {
    setFilterCriteria((prev: FilterCriteria<any>) => ({
      ...prev,
      paging: {
        ...prev.paging,
        page: prev.paging.page - 1 >= 0 ? prev.paging.page - 1 : 0,
      },
    }));
  };

  const onNext = () => {
    setFilterCriteria((prev: FilterCriteria<any>) => ({
      ...prev,
      paging: {
        ...prev.paging,
        page:
          prev.paging.page + 1 <= Math.ceil(totalItems / +prev.paging.pageSize)
            ? prev.paging.page + 1
            : prev.paging.page,
      },
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["select-amount"]}>
        Rows per page
        <Select
          name="rowsPerPage"
          control={control}
          dataSource={rowsPerPage}
          onValueChange={onChangePageSize}
        />
      </div>

      <div>
        {`${
          (filterCriteria.paging.page - 1) * +filterCriteria.paging.pageSize
        }-${
          filterCriteria.paging.page * +filterCriteria.paging.pageSize
        } of ${totalItems}`}
      </div>

      <div className={styles["btn-actions"]}>
        <Button
          color="gray"
          disabled={filterCriteria.paging.page <= 1}
          onClick={onBack}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          disabled={
            filterCriteria.paging.page >=
            totalItems / +filterCriteria.paging.pageSize
          }
          onClick={onNext}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
