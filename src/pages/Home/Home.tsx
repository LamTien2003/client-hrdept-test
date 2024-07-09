import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDownloadExcel } from "react-export-table-to-excel";

import { Button } from "@/components";
import Dialog from "@/components/Dialog/Dialog";
import AddUserForm from "@/components/Home/AddUserForm/AddUserForm";
import EditUserForm from "@/components/Home/EditUserForm/EditUserForm";
import Input from "@/components/Input/Input";
import Table from "@/components/Table/Table";
import { Select } from "@/components/Select";
import axiosClient from "@/services/axiosClient";
import { buildQueryString, convertToTitleCase } from "@/utils/helper";

import styles from "./Home.module.css";
import { FilterCriteria, Role, User } from "@/types/common";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
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
  const [sorting, setSorting] = useState<{
    key: keyof User;
    ascending: boolean;
  }>({
    key: "firstName",
    ascending: true,
  });
  const tableRef = useRef();

  const { handleSubmit, control } = useForm<{
    searchText: "";
    role: Role | "none";
  }>({
    defaultValues: {
      searchText: "",
      role: "none",
    },
  });

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  const dataSource = useMemo(() => {
    return users.map(item => ({
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
  }, [users]);

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

  const applyFilter = (key: keyof User) => {
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
  };

  useEffect(() => {
    const fetchApi = async () => {
      const queryString = buildQueryString({
        ...filterCriteria.filters,
        ...filterCriteria.paging,
      });
      const response = await axiosClient.get(`/user?${queryString}`);
      setUsers(response?.data?.data || []);
      setTotalUsers(response?.data?.totalItems || 0);
    };
    fetchApi();
  }, [filterCriteria]);
  console.log(dataSource);

  useEffect(() => {
    if (!sorting?.key) {
      return;
    }
    setUsers(prev => [
      ...prev.sort((a, b) => {
        if (!sorting.ascending) {
          return a[sorting.key]!.localeCompare(b[sorting.key]!);
        }
        return b[sorting?.key]!.localeCompare(a[sorting?.key]!);
      }),
    ]);
  }, [sorting]);

  const columns = [
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
            (sorting?.key === "role" && !sorting.ascending)) && <ArrowUpIcon />}
          {sorting?.key === "role" && sorting.ascending && <ArrowDownIcon />}
        </span>
      ),
    },
    {
      label: "Action",
      key: "Action",
    },
  ];

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
            <Button color="gray" highContrast onClick={onDownload}>
              Export to Excel
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

        <form
          className={styles["main__search"]}
          onSubmit={handleSubmit(onSearch)}
        >
          <Input
            control={control}
            name="searchText"
            placeholder="Search users"
          />
          <Select
            name="role"
            control={control}
            dataSource={roleList}
            size="2"
          />
          <Button
            color="gray"
            highContrast
            onSubmit={handleSubmit(data => console.log(data))}
          >
            Search
          </Button>
        </form>

        <Table
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