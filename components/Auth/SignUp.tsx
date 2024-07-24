"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

interface SignUpProps {
  setShowSignIn: (value: boolean) => void;
}

const SignUp = (props: SignUpProps) => {
  const { setShowSignIn } = props;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUp = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api/user", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      return response.data;
    } catch (error) {
      return { error: true, message: "Failed to register user" };
    }
  };

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (val: z.infer<typeof FormSchema>) => signUp(val),
    onError: (error) => {
      toast.error("Failed to register user");
    },

    onSuccess: (data) => {
      if (data?.status === 409) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setShowSignIn(true);
        router.refresh();
      }
      console.log(data);
      // router.push("/auth");
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    registerUser(values);
  };

  return (
    <div className="mt-8">
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <div className="mt-1">
              <input
                disabled={isPending}
                id="username"
                {...register("username")}
                type="text"
                autoComplete="username"
                placeholder="Your username"
                className="appearance-none text-purple-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                disabled={isPending}
                id="email"
                placeholder="Your email"
                {...register("email")}
                type="text"
                className="appearance-none text-purple-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                disabled={isPending}
                id="password"
                placeholder="Your password"
                {...register("password")}
                type="password"
                autoComplete="current-password"
                className="appearance-none text-purple-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                disabled={isPending}
                id="confirm-password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                type="password"
                autoComplete="current-password"
                className="appearance-none text-purple-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isPending ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
