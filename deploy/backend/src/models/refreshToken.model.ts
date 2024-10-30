import { callQuery } from "./utils/query";

export type RefreshToken = {
  userId: string;
  refreshToken: string;
  device: string;
};

export const createRefreshTokenQuery = async (
  userId: string,
  refreshToken: string,
  device: string,
): Promise<RefreshToken> => {
  const insertSQL = `
    INSERT INTO "RefreshToken" ("userId", "refreshToken", "device", "createdAt", "updatedAt")
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("userId", "device") 
    DO UPDATE SET
      "refreshToken" = $2,
      "updatedAt" = CURRENT_TIMESTAMP
    RETURNING *;
  `;

  const values = [userId, refreshToken, device];

  return callQuery<RefreshToken>(insertSQL, values);
};

export const getRefreshTokenQuery = async (
  refreshToken: string,
): Promise<RefreshToken> => {
  const selectSQL = `
      SELECT * FROM "RefreshToken" WHERE "refreshToken" = $1;
  `;

  const values = [refreshToken];

  return callQuery<RefreshToken>(selectSQL, values);
};

export const deleteRefreshTokenByUserAndDeviceQuery = async (
  userId: string,
  device: string,
) => {
  const selectSQL = `
      DELETE FROM "RefreshToken" WHERE "userId" = $1 AND "device" = $2 RETURNING *;
  `;

  const values = [userId, device];

  return callQuery<RefreshToken>(selectSQL, values);
};
