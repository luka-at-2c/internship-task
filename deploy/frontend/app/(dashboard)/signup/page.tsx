"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/app/components/zod/types";
import CustomInput from "@/app/components/CustomInput";
import { RegisterData } from "@/app/components/shared/types";
import { signUp } from "@/app/services/signup.service";
import { toast } from "react-toastify";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    const register = async () => {
      const response = await signUp(data);

      if (!response.success) {
        toast.error(response.message);

        return;
      }

      toast.success(response.message);
    };

    register();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#22c1c3] to-[#fdbb2d]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <CustomInput
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              register={register}
              error={errors.firstName}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <CustomInput
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              register={register}
              error={errors.lastName}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <CustomInput
              type="email"
              name="email"
              placeholder="Enter your email"
              register={register}
              error={errors.email}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <CustomInput
              type="password"
              name="password"
              placeholder="Enter your password"
              register={register}
              error={errors.password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
