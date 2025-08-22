"use client";

import { LoginReqBodySchema, LoginReqBodyType, UserResponseType } from "@/api/users/models/users";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLoginFormLogic = (users: UserResponseType) => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (value: LoginReqBodyType) => {
      const selectedUser = users.find((user) => user.email === value.email && user.password === value.password);
      if (!selectedUser) {
        throw new Error("wrong email and/or password");
      }
      await login(selectedUser);
    },
    onSuccess: () => {
      toast.success("Success log in. Redirecting...");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to log in. Please try again");
    },
  });

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginReqBodySchema,
      onChange: LoginReqBodySchema,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value);
    },
    canSubmitWhenInvalid: false,
  });

  return {
    loginForm,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
