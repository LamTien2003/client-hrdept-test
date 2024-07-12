import { Table as RadixTable } from "@radix-ui/themes";

import { Pagination } from "@/components";

import styles from "./Table.module.css";
import TableProps from "./Table.d";

const rowsPerPage = [
  {
    label: "5",
    value: "5",
  },
  {
    label: "10",
    value: "10",
  },
  {
    label: "15",
    value: "15",
  },
];

const Table = ({
  totalItems,
  filterCriteria,
  setFilterCriteria,
  columns,
  dataSource,
  reference,
}: TableProps) => {
  return (
    <div className={styles["wrapper"]} ref={reference}>
      <RadixTable.Root size="2">
        <RadixTable.Header>
          <RadixTable.Row>
            {columns.map(column => (
              <RadixTable.ColumnHeaderCell
                key={column.key}
                className={styles["header-column"]}
              >
                <div className="d-flex align-center gap--12">
                  <span>{column.label}</span>
                  <span className={styles["header-column__addon"]}>
                    {column?.addon}
                  </span>
                </div>
              </RadixTable.ColumnHeaderCell>
            ))}
          </RadixTable.Row>
        </RadixTable.Header>

        <RadixTable.Body>
          {dataSource.map((row: any, index: number) => {
            return (
              <RadixTable.Row key={index}>
                {Object.values(row).map((value: any, index) => (
                  <RadixTable.RowHeaderCell key={`${value}-${index}`}>
                    {value}
                  </RadixTable.RowHeaderCell>
                ))}
              </RadixTable.Row>
            );
          })}
        </RadixTable.Body>
      </RadixTable.Root>
      {!dataSource.length && (
        <p className={styles["empty"]}>There are not any results</p>
      )}

      <div className={styles["bottom"]}>
        <Pagination
          rowsPerPage={rowsPerPage}
          filterCriteria={filterCriteria}
          totalItems={totalItems}
          setFilterCriteria={setFilterCriteria}
        />
      </div>
    </div>
  );
};

export default Table;
