import { Ref } from "react";

export interface TableValue {
  label: string;
  key: string | number;
}

export interface TableColumn extends TableValue {
  addon?: ReactNode;
}

export default interface TableProps {
  filterCriteria: any;
  setFilterCriteria: (value: any) => void;
  columns: TableColumn[];
  dataSource: any;
  totalItems: number;
  reference?: Ref;
  isLoading?: boolean;
}
