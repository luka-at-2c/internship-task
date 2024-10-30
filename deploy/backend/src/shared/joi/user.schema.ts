import Joi from "joi";

export const RegisterUserSchema = Joi.object({
  firstName: Joi.string().empty("").required().min(3),
  lastName: Joi.string().empty("").required().min(3),
  email: Joi.string().empty("").required().email(),
  password: Joi.string()
    .empty("")
    .required()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/),
});

export const LogInUserSchema = Joi.object({
  email: Joi.string().empty("").required(),
  password: Joi.string().empty("").required(),
});
