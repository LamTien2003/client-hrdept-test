import { User } from "@/types/common";

export default interface EditUserFormProps {
  user: User;
  setFilterCriteria: (value: any) => void;
}
