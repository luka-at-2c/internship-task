import {
  createRefreshTokenQuery,
  deleteRefreshTokenByUserAndDeviceQuery,
  getRefreshTokenQuery,
} from "../models/refreshToken.model";
import { RefreshToken } from "../models/refreshToken.model";
import { getUserByIdQuery } from "../models/user.model";
import { encodeJWT, readPayloadOfToken } from "../shared/utils/token";

export const createRefreshToken = async (userId: string, device: string) => {
  const refreshToken = encodeJWT<{ userId: string; device: string }>(
    { userId, device },
    "3d",
  );
  return createRefreshTokenQuery(userId, refreshToken, device);
};

export const renewAccessToken = async (
  refreshToken: string,
  device: string,
) => {
  const databaseRefreshToken = await getRefreshTokenQuery(refreshToken);

  if (!databaseRefreshToken) {
    const decoded = readPayloadOfToken<RefreshToken>(refreshToken);
    await deleteRefreshTokenByUserAndDeviceQuery(
      decoded.userId,
      decoded.device,
    );
    return null;
  }

  const user = await getUserByIdQuery(databaseRefreshToken.userId);

  const accessToken = encodeJWT<{ email: string }>({ email: user.email }, "3h");
  const newRefreshToken = encodeJWT<{ userId: string; device: string }>(
    { userId: databaseRefreshToken.userId, device },
    "3d",
  );

  return {
    token: accessToken,
    refreshToken: await createRefreshTokenQuery(
      databaseRefreshToken.userId,
      newRefreshToken,
      databaseRefreshToken.device,
    ),
  };
};
