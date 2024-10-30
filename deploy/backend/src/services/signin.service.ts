import httpStatus from "http-status";

import { deleteRefreshTokenByUserAndDeviceQuery } from "../models/refreshToken.model";
import { getUserByEmailQuery, LogInUser } from "../models/user.model";
import { ApiError } from "../shared/error/ApiError";
import { AuthError } from "../shared/error/AuthError";
import { compareHashedData } from "../shared/utils/hash";
import { encodeJWT } from "../shared/utils/token";

export const signInUser = async (data: LogInUser) => {
  const user = await getUserByEmailQuery(data.email);

  if (!user) {
    throw new AuthError("Wrong email or password!");
  }

  const passwordIsCorrect = compareHashedData(data.password, user.password);

  if (!passwordIsCorrect) {
    throw new AuthError("Wrong email or password");
  }

  return {
    token: encodeJWT<{ email: string }>({ email: user.email }, "3h"),
    user,
  };
};

export const logout = async (email: string, device: string) => {
  const user = await getUserByEmailQuery(email);
  if (!user) {
    throw new ApiError("User does not exist", httpStatus.BAD_REQUEST);
  }

  await deleteRefreshTokenByUserAndDeviceQuery(user.id, device);
};
