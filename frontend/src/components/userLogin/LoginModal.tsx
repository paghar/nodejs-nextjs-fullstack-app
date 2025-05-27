"use client";

import React, { useState } from "react";
import Button from "@components/ui/Button";
import TextBox from "@components/ui/TextBox";
import LinkComponent from "@components/ui/LinkComponent";
import { loginHeader, loginBtn, noAccount } from "@data/constants/login";
import { loginUser, getCsrfToken } from "@utils/api/AuthApi";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        setError("CSRF token could not be fetched");
        return;
      }

      const result = await loginUser(form, csrfToken);
      if (result.success) {
        onClose(); // close modal on success
      } else {
        setError(result.message);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextBox
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <TextBox
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="text-right">
            <LinkComponent
              href="/userLogin/ForgotPassword"
              onClick={onClose}
              className="text-sm text-pink-600 hover:underline"
            >
              {loginBtn.forgotPassword}
            </LinkComponent>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : loginBtn.login}
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
