import httpStatus from "http-status";

import {
  CreateUserData,
  getUserByEmailQuery,
  signUpUserQuery,
} from "../models/user.model";
import { ApiError } from "../shared/error/ApiError";
import { hashSensitiveData } from "../shared/utils/hash";

export const signUpUser = async (insertBody: CreateUserData) => {
  const hashedPassword = await hashSensitiveData(insertBody.password);

  const existingUser = await getUserByEmailQuery(insertBody.email);

  if (existingUser) {
    throw new ApiError(`Email is taken.`, httpStatus.BAD_REQUEST);
  }

  return signUpUserQuery(insertBody, hashedPassword);
};
