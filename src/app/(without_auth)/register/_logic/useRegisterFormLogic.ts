"use client";

import { CreateUserFormSchema, CreateUserFormType, UserResponseType } from "@/api/users/models/users";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "../action";
import { ToastLib } from "@/lib/toastLib";
import { useForm } from "@tanstack/react-form";

export const useRegisterFormLogic = (users: UserResponseType) => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (reqBody: CreateUserFormType) => {
      const selectedUser = users.find((user) => {
        const userEmail = user.email;
        const userFullname = user.name;
        const reqEmail = reqBody.email;
        const reqFullname = `${reqBody.first_name} ${reqBody.last_name}`;

        return userEmail === reqEmail && userFullname === reqFullname;
      });
      if (selectedUser) {
        throw new Error("User already exists");
      }

      await register({
        email: reqBody.email,
        password: reqBody.password,
        name: `${reqBody.first_name} ${reqBody.last_name}`,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      ToastLib.success("Success creating new user. Redirect to login...");
      router.push("/login");
    },
    onError: () => {
      ToastLib.error("Failed to create user. Please try again");
    },
  });

  const registerForm = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      retype_password: "",
    },
    validators: {
      onSubmit: CreateUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    },
    canSubmitWhenInvalid: false,
  });

  return {
    registerForm,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
};
