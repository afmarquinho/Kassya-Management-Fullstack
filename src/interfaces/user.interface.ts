// export type RoleType = "ADMIN" | "MANAGER" | "USER";

export interface User {
  User_dni: number;
  User_role: string;
  User_name: string;
  User_surname: string;
  User_email: string;
  User_password: string;
  User_phoneNumber: string;
  User_address: string;
}
export type UpdateUser = Omit<
  User,
  "User_password" | "User_dni" | "User_name" | "User_surname"
> & {
  User_id: number;
};
