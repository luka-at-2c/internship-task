import { Router } from "express";

import { validateRequestBody } from "../../middlewares/requestValidation";
import { RegisterUserSchema } from "../../shared/joi/user.schema";

import { signUpController } from "./../../controllers";

export const signUpRoute = Router();

signUpRoute
  .route("/")
  .post(validateRequestBody(RegisterUserSchema), signUpController.signUpUser);
