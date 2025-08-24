"use client";

import { useAuthContext } from "@/providers/authProvider";
import { useState } from "react";
import { useRegisterFormLogic } from "../_logic/useRegisterFormLogic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { users } = useAuthContext();
  const { registerForm, isLoading, error } = useRegisterFormLogic(users);

  const registerErrorMessage = error?.message;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        registerForm.handleSubmit();
      }}
    >
      <registerForm.Field name="first_name">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>First Name</Label>
            <Input
              type="text"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder="e.g., John"
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
      </registerForm.Field>

      <registerForm.Field name="last_name">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Last Name</Label>
            <Input
              type="text"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder="e.g., Doe"
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
      </registerForm.Field>

      <registerForm.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              type="email"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder="e.g., johndoe@example.com"
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
      </registerForm.Field>

      <registerForm.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
            <div className="relative">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder="password"
                className="w-full"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                disabled={isLoading}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
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
      </registerForm.Field>

      <registerForm.Field name="retype_password">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Retype Password</Label>
            <div className="relative">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder="password"
                className="w-full"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                disabled={isLoading}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
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
      </registerForm.Field>

      <div className="flex flex-col space-y-2 items-center">
        <div className="flex items-center space-x-2 text-sm">
          <p>Already have an account?</p>
          <Link href={"/login"}>
            <Button type="button" variant={"link"} className="text-blue-500 font-normal px-0">
              Sign in
            </Button>
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full hover:cursor-pointer disabled:cursor-not-allowed"
          disabled={!registerForm.state.isFieldsValid || isLoading}
        >
          {isLoading ? "Please wait..." : "Register"}
        </Button>
        {registerErrorMessage && <em className="text-red-500 text-sm">{registerErrorMessage}</em>}
      </div>
    </form>
  );
};
