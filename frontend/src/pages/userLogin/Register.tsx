"use client";
import { useState } from "react";
import RegisterForm from "@components/userLogin/RegisterForm";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic here
    alert(`Registered with: ${form.email}`);
  };

  return (
    <RegisterForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
