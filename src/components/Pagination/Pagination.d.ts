import { SelectValue } from "@/components/Select/Select.d";

export default interface PaginationProps {
  totalItems: number;
  rowsPerPage: SelectValue[];
  filterCriteria: FilterCriteria<any>;
  setFilterCriteria: (value) => void;
}
