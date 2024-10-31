export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
};

export type LogInData = {
  email: string;
  password: string;
};
