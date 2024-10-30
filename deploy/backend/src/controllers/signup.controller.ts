import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../shared/utils/catchAsync";

import { signUpService } from "./../services";

export const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const user = await signUpService.signUpUser(req.body);

  return res.status(httpStatus.CREATED).send({
    success: true,
    message: "Successfully registered",
    content: {
      email: user.email,
    },
  });
});
