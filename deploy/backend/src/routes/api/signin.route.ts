import { Router } from "express";

import { validateRequestBody } from "../../middlewares/requestValidation";
import { LogInUserSchema } from "../../shared/joi/user.schema";

import { signInController } from "./../../controllers";

export const signInRoute = Router();

signInRoute
  .route("/")
  .post(validateRequestBody(LogInUserSchema), signInController.signInUser);

signInRoute.route("/logout").post(signInController.logout);

signInRoute.route("/renew-tokens").post(signInController.renewAccessToken);
