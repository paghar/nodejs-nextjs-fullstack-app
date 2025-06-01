"use client";

// ─── Components ────────────────────────────────────────────────
import Button from "@components/ui/Button";
import TextBox from "@components/ui/TextBox";
import LinkComponent from "@components/ui/LinkComponent";

// ─── External Dependencies ─────────────────────────────────────
import { useForm } from "react-hook-form";

// ─── constants ────────────────────────────────────────────────
import {
  loginBtn,
  registerHeader,
  haveAccount,
} from "@data/constants/login";

// ─── Types ─────────────────────────────────────────────
import { FormValues,RegisterFormProps } from "@data/interface/login";

// ─── Component ─────────────────────────────────────────
export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const submitHandler = async (data: FormValues) => {
    await onSubmit(data, setError);
  };

  return (
    <div className="mt-28 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        {/* Header */}
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
          {registerHeader}
        </h2>

        {/* Name Field */}
        <TextBox
          type="text"
          placeholder="Full Name"
          className="mb-2"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="mb-2 text-sm text-red-600">{errors.name.message}</p>
        )}

        {/* Email Field */}
        <TextBox
          type="email"
          placeholder="Email address"
          className="mb-2"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="mb-2 text-sm text-red-600">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <TextBox
          type="password"
          placeholder="Password"
          className="mb-4"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />
        {errors.password && (
          <p className="mb-4 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {loginBtn.register}
        </Button>

        {/* Footer Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {haveAccount}{" "}
          <LinkComponent href="/" className="text-pink-600 hover:underline">
            {loginBtn.login}
          </LinkComponent>
        </p>
      </form>
    </div>
  );
}
