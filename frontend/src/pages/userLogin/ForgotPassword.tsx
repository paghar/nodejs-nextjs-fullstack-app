"use client";

import { useState } from "react";
import ForgotPasswordForm from "@components/userLogin/ForgotPasswordForm";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with actual forgot password request logic
    alert(`Reset link sent to: ${email}`);
  };

  return (
    <ForgotPasswordForm
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
    />
  );
}
