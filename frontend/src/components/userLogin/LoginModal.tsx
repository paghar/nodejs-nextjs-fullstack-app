"use client";

// ─── External Dependencies ───────────────────────────────
import React from "react";
import { useForm } from "react-hook-form";

// ─── Components ──────────────────────────────────────────
import Button from "@components/ui/Button";
import TextBox from "@components/ui/TextBox";
import LinkComponent from "@components/ui/LinkComponent";

// ─── Constants ───────────────────────────────────────────
import { loginHeader, loginBtn, noAccount } from "@data/constants/login";

// ─── Types ───────────────────────────────────────────────
interface LoginModalProps {
  onClose: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
  apiError: string | null;
}

// ─── Component ───────────────────────────────────────────
export default function LoginModal({
  onClose,
  onSubmit,
  apiError,
}: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        {/* Close Button */}
        <Button variant="close" onClick={onClose} className="absolute right-4 top-4">
          ✕
        </Button>

        {/* Header */}
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          {loginHeader}
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <TextBox
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <TextBox
              type="password"
              placeholder="Password"
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* API Error */}
          {apiError && (
            <p className="text-sm text-red-600">{apiError}</p>
          )}      

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {loginBtn.login}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {noAccount}{" "}
          <LinkComponent
            href="/userLogin/Register"
            onClick={onClose}
            className="text-pink-600 hover:underline"
          >
            {loginBtn.register}
          </LinkComponent>
        </div>
      </div>
    </div>
  );
}
