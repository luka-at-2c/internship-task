import { callQuery } from "./utils/query";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const signUpUserQuery = async (
  user: CreateUserData,
  password: string,
): Promise<User> => {
  const insertSQL = `
  INSERT INTO "User" ("firstName", "lastName", "email", "password", "createdAt", "updatedAt")
  VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *;
  `;

  const values = [user.firstName, user.lastName, user.email, password];

  return callQuery<User>(insertSQL, values);
};

export const getUserByEmailQuery = async (email: string): Promise<User> => {
  const selectSQL = `
    SELECT * FROM "User" WHERE "email" = $1;
  `;

  const values = [email];

  return callQuery<User>(selectSQL, values);
};
