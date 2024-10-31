"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { LogInData } from "@/app/components/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordLoginSchema } from "@/app/components/zod/types";
import CustomInput from "@/app/components/CustomInput";
import { toast } from "react-toastify";
import { signIn } from "@/app/services/signin.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const SignIn = () => {
  const { logIn } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInData>({
    resolver: zodResolver(PasswordLoginSchema),
  });

  const onSubmit = async (data: LogInData) => {
    logIn();
    const logInFun = async () => {
      const response = await signIn(data);

      if (!response.success) {
        toast.error(response.message);

        return;
      }

      toast.success(response.message);
    };

    await logInFun();
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#22c1c3] to-[#fdbb2d]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
