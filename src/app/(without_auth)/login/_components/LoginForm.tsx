"use client";

import { AuthInput } from "@/components/Input/AuthInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useLoginFormLogic } from "../_logic/useLoginFormLogic";

export const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loginForm, isLoading, error } = useLoginFormLogic();

  const getErrorMessage = () => {
    if (error) {
      const error_data = JSON.parse(error.message);
      return error_data.error_message;
    }
    return "";
  };

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        loginForm.handleSubmit();
      }}
    >
      <loginForm.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <AuthInput
              type="email"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder="Email"
              className="w-full"
              disabled={isLoading}
            />
            {!!field.state.meta.errors.length && (
              <em className="text-red-500 text-sm">
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .filter(Boolean)
                  .map((errorMessage, index) => (
                    <span key={errorMessage! + index}>
                      {errorMessage}
                      <br />
                    </span>
                  ))}
              </em>
            )}
          </div>
        )}
      </loginForm.Field>

      <loginForm.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <div className="relative">
              <AuthInput
                type={isPasswordVisible ? "text" : "password"}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder="Password"
                className="w-full"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-1"
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                disabled={isLoading}
              >
                {isPasswordVisible ? (
                  <FaEye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <FaEyeSlash className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {!!field.state.meta.errors.length && (
              <em className="text-red-500 text-sm">
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .filter(Boolean)
                  .map((errorMessage, index) => (
                    <span key={errorMessage! + index}>
                      {errorMessage}
                      <br />
                    </span>
                  ))}
              </em>
            )}
          </div>
        )}
      </loginForm.Field>

      <div className="flex flex-col space-y-2 items-center">
        <div className="flex items-center space-x-2 text-sm">
          <p>Don&#39;t have an account?</p>
          <Link href={"/register"}>
            <Button type="button" variant={"link"} className="text-blue-500 font-normal px-0">
              Sign up
            </Button>
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full text-xl py-2 h-fit bg-blue-500 hover:bg-blue-600 hover:cursor-pointer disabled:cursor-not-allowed"
          disabled={!loginForm.state.isFieldsValid || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <em className="text-red-500 text-sm">{getErrorMessage()}</em>
      </div>
    </form>
  );
};
