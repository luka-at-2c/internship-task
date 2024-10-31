import { axiosInterceptorInstance } from "@/app/services/axios.interceptor";
import { RegisterData, RegisterResponse } from "@/app/components/shared/types";

export const signUp = async (
  registerBody: RegisterData,
): Promise<RegisterResponse> => {
  const response = await axiosInterceptorInstance.post(`/signup`, {
    email: registerBody.email,
    password: registerBody.password,
    firstName: registerBody.firstName,
    lastName: registerBody.lastName,
  });

  if (!response.data.success) {
    return {
      success: response.data.success,
      message: response.data.error.message,
    };
  }

  return { success: response.data.success, message: response.data.message };
};
