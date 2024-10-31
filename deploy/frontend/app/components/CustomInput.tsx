import React, { ChangeEvent, FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type CustomInputProps = {
  name: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: FC<CustomInputProps> = ({
  name,
  type,
  placeholder,
  register,
  error,
}) => {
  return (
    <div>
      <input
        type={type}
        id={name}
        name={name}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        placeholder={placeholder}
        {...register(name)}
        required
      />
      {error && (
        <span className="text-red-600 w-full px-2 text-base text-wrap">
          {error.message}
        </span>
      )}
    </div>
  );
};
export default CustomInput;
