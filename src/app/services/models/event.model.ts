import { UserType } from "../types/user.types";

export interface UserInput {
  email: string;
  type: UserType;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

export interface UserOutput {
  id: string;
  email: string;
  type: UserType;
  firstName: string;
  lastName: string;
  phone: string;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
