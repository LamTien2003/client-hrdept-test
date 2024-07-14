import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon, Pencil2Icon } from "@radix-ui/react-icons";

import {
  Button,
  Dialog,
  AddUserForm,
  EditUserForm,
  Table,
  SearchForm,
} from "@/components";
import useExportUsers from "@/hooks/useExportUser";
import useGetUsers from "@/hooks/useGetUsers";

import { FilterCriteria, User } from "@/types/common";
import styles from "./Home.module.css";

const Home = () => {
  const tableRef = useRef();
  const [filterCriteria, setFilterCriteria] = useState<
    FilterCriteria<{ role: string }>
  >({
    filters: {
      searchText: "",
      role: "",
    },
    paging: {
      page: 1,
      pageSize: 5,
    },
  });
  const { users, totalUsers, isUsersLoading } = useGetUsers(filterCriteria);
  const [sorting, setSorting] = useState<{
    key: keyof User;
    ascending: boolean;
  }>({
    key: "firstName",
    ascending: true,
  });

  const { onExportUsers, onExportUsersByFilter: onExportThisPage } =
    useExportUsers();

  const applyFilter = useCallback(
    (key: keyof User) => {
      if (sorting && sorting?.key === key) {
        return setSorting({
          ...sorting,
          ascending: !sorting.ascending,
        });
      }

      setSorting({
        key,
        ascending: true,
      });
    },
    [sorting]
  );

  const dataSource = useMemo(() => {
    const data = users.sort((a, b) => {
      if (!sorting.ascending) {
        return a[sorting.key]!.localeCompare(b[sorting.key]!);
      }
      return b[sorting?.key]!.localeCompare(a[sorting?.key]!);
    });

    return data.map(item => ({
      email: item.email,
      phoneNumber: item.phoneNumber,
      firstName: item.firstName,
      lastName: item.lastName,
      role: item.role,
      addons: (
        <Dialog
          content={
            <EditUserForm user={item} setFilterCriteria={setFilterCriteria} />
          }
        >
          <Pencil2Icon className="cursor-pointer" />
        </Dialog>
      ),
    }));
  }, [users, sorting]);

  const columns = useMemo(
    () => [
      {
        label: "Email",
        key: "Email",
      },
      {
        label: "Phone number",
        key: "Phone number",
      },
      {
        label: "First Name",
        key: "First Name",
        addon: (
          <span onClick={() => applyFilter("firstName")}>
            {(sorting.key !== "firstName" ||
              (sorting?.key === "firstName" && !sorting.ascending)) && (
              <ArrowUpIcon />
            )}
            {sorting?.key === "firstName" && sorting.ascending && (
              <ArrowDownIcon />
            )}
          </span>
        ),
      },
      {
        label: "Last Name",
        key: "Last Name",
        addon: (
          <span onClick={() => applyFilter("lastName")}>
            {(sorting.key !== "lastName" ||
              (sorting?.key === "lastName" && !sorting.ascending)) && (
              <ArrowUpIcon />
            )}
            {sorting?.key === "lastName" && sorting.ascending && (
              <ArrowDownIcon />
            )}
          </span>
        ),
      },
      {
        label: "Role",
        key: "Role",
        addon: (
          <span onClick={() => applyFilter("role")}>
            {(sorting.key !== "role" ||
              (sorting?.key === "role" && !sorting.ascending)) && (
              <ArrowUpIcon />
            )}
            {sorting?.key === "role" && sorting.ascending && <ArrowDownIcon />}
          </span>
        ),
      },
      {
        label: "Action",
        key: "Action",
      },
    ],
    [sorting, applyFilter]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles["header"]}>
        <strong>HRDept Company</strong>
        <div className={styles["header-right"]}>
          <div className={styles["header-right__avatar"]}>avatar</div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles["main-head"]}>
          <strong>Users</strong>
          <div className={styles["main-head__action"]}>
            <Button color="gray" highContrast onClick={onExportUsers}>
              Export all users
            </Button>
            <Button
              color="gray"
              highContrast
              onClick={() => onExportThisPage(filterCriteria)}
            >
              Export this page
            </Button>
            <Dialog
              content={<AddUserForm setFilterCriteria={setFilterCriteria} />}
            >
              <Button color="gray" highContrast>
                Add New User
              </Button>
            </Dialog>
          </div>
        </div>

        <SearchForm setFilterCriteria={setFilterCriteria} />
        <Table
          isLoading={isUsersLoading}
          reference={tableRef}
          totalItems={totalUsers}
          dataSource={dataSource}
          columns={columns}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
        />
      </div>
    </div>
  );
};
export default Home;
