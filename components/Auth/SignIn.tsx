"use client";
import React from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

interface SignInProps {
  setShowSignIn: (value: boolean) => void;
}
const SignIn = (props: SignInProps) => {
  const { setShowSignIn } = props;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signin, isPending } = useMutation({
    mutationFn: (val: { password: string; email: string }) =>
      signIn("credentials", {
        email: val.email,
        password: val.password,
        redirect: false,
      }),
    onError: (error) => {
      toast.error("Failed to login!");
    },

    onSuccess: (data) => {
      if (data && data.error) {
        toast.error("Failed to login!");
        return;
      }

      toast.success("Signed in successfully");
      router.push("/home");
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    signin(values);
  };

  return (
    <div className="mt-8">
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div>
            <button
              type="submit"
              className={`${!isPending ? "bg-purple-600 hover:bg-purple-700 " : "bg-gray-200 text-purple-700"} w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium`} >
             {isPending?"Signing in...":"Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
