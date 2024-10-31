"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "@/app/services/signin.service";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const { isAuthenticated, logOut } = useAuth();

  const handleOnClick = () => {
    logOut();
    const logOutFun = async () => {
      const response = await signOut();

      toast.success(response);
    };

    logOutFun().then(() => {
      localStorage.removeItem("token");
    });
  };

  return (
    <div className="flex justify-center">
      <nav className="flex flex-row items-center justify-between fixed w-full bg-transparent">
        {isAuthenticated ? (
          <div className="flex w-full justify-end">
            <Link
              href="/"
              className="p-2.5 py-2.5 px-5 text-black"
              onClick={handleOnClick}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <div className="flex w-full justify-end">
            <Link href="/signin" className="p-2.5 py-2.5 px-5 text-black">
              Log In
            </Link>
            <Link href="/signup" className="p-2.5 py-2.5 px-5 text-black">
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
export default Header;
