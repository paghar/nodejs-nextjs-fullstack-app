"use client";

// ─── Components ───────────────────────────────────────────────────────────
import RegisterForm from "@components/userLogin/RegisterForm";

// ─── External Dependencies ────────────────────────────────────────────────
import { useRouter } from "next/navigation";

// ─── Internal Utilities & Context ─────────────────────────────────────────
import { getCsrfToken, registerUser } from "@utils/api/AuthApi";
import { useGlobalDispatch } from "@context/global/globalContext";
import { toggleLoginModal } from "@context/global/globalActions";

// ─── Types ────────────────────────────────────────────────────────────────
import { FormValues } from "@data/interface/login";

// ─── Component ────────────────────────────────────────────────────────────
export default function Register() {
  const dispatch = useGlobalDispatch();
  const router = useRouter();

  const onSubmit = async (
    data: FormValues,
    setError: (name: keyof FormValues, error: { message: string }) => void
  ) => {
    const csrfToken = await getCsrfToken();

    if (!csrfToken) {
      setError("name", { message: "CSRF token not available." });
      return;
    }

    const result = await registerUser(data, csrfToken);

    if (result.success) {
      dispatch({
        type: "SET_USER",
        payload: {
          name: data.name,
          email: data.email,
        },
      });

      toggleLoginModal(dispatch);
      router.push("/");
    } else {
      setError("name", {
        message: result.message || "Registration failed",
      });
    }
  };

  return <RegisterForm onSubmit={onSubmit} />;
}
