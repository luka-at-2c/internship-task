import { LogInData, RegisterResponse } from "@/app/components/shared/types";
import { axiosInterceptorInstance } from "@/app/services/axios.interceptor";

export const signIn = async (
  logInBody: LogInData,
): Promise<RegisterResponse> => {
  const response = await axiosInterceptorInstance.post(`/signin`, {
    email: logInBody.email,
    password: logInBody.password,
  });

  if (!response.data.success) {
    return {
      success: response.data.success,
      message: response.data.error.message,
    };
  }

  localStorage.setItem("token", response.headers["token"]);

  return { success: response.data.success, message: response.data.message };
};

export const signOut = async (): Promise<string> => {
  const response = await axiosInterceptorInstance.post(`/signin/logout`, {});

  return response.data.message;
};
