export enum Role {
  Staff = "staff",
  Manager = "manager",
  Owner = "owner",
}

export interface FilterCriteria<T> {
  filters: {
    searchText: string;
  } & T;
  paging: {
    page: number;
    pageSize: number;
  };
  sorts?: {
    descending: boolean;
    field: string;
  }[];
}

export interface User {
  _id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  image?: string;
}
