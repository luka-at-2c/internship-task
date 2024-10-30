import { Request, Response } from "express";
import httpStatus from "http-status";

import { ApiError } from "../shared/error/ApiError";
import { catchAsync } from "../shared/utils/catchAsync";
import { readPayloadOfToken } from "../shared/utils/token";

import { signInService, refreshTokenService } from "./../services";

export const signInUser = catchAsync(async (req: Request, res: Response) => {
  const signInData = await signInService.signInUser(req.body);

  const refreshTokenData = await refreshTokenService.createRefreshToken(
    signInData.user.id,
    req.header("user-agent") as string,
  );

  res
    .status(httpStatus.OK)
    .header("token", signInData.token)
    .cookie("refreshToken", refreshTokenData.refreshToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .send({
      success: true,
      message: "Successfully logged in!",
      content: {
        firstName: signInData.user.firstName,
        lastName: signInData.user.lastName,
      },
    });
});

export const renewAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.headers.cookie?.split("=")[1];
    if (!refreshToken) {
      throw new ApiError("No refresh token", httpStatus.BAD_REQUEST);
    }

    const renewedTokens = await refreshTokenService.renewAccessToken(
      refreshToken as string,
      req.header("user-agent") as string,
    );
    if (!renewedTokens) {
      res
        .status(httpStatus.BAD_REQUEST)
        .clearCookie("refreshToken")
        .send({
          success: false,
          error: {
            message: "Refresh token used",
            removeUser: true,
          },
        });
      return;
    }

    res
      .status(httpStatus.OK)
      .cookie("refreshToken", renewedTokens.refreshToken.refreshToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .header("token", renewedTokens.token)
      .send({
        success: true,
        message: "Successfully renewed tokens.",
      });
  },
);

export const logout = catchAsync(async (req: Request, res: Response) => {
  const { email } = readPayloadOfToken<{ email: string }>(
    req.headers.token as string,
  );

  await signInService.logout(email, req.header("user-agent") as string);
  res.status(httpStatus.OK).clearCookie("refreshToken").send({
    success: true,
    message: "Successfully logged out.",
  });
});
