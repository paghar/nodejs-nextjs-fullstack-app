"use client";

import { useState } from "react";
import RegisterForm from "@components/userLogin/RegisterForm";
import { getCsrfToken, registerUser } from "@utils/api/AuthApi";
import { useGlobalDispatch } from "@context/global/globalContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const dispatch = useGlobalDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      alert("CSRF token not available.");
      return;
    }

    const result = await registerUser(form, csrfToken);

    if (result.success) {
      // Dispatch user to global context
      dispatch({
        type: "SET_USER",
        payload: { name: form.name, email: form.email }, // ensure id is included
      });

      alert("Registration successful!");
      router.push("/"); // or redirect to dashboard/home
    } else {
      alert(result.message);
    }
  };

  return (
    <RegisterForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
