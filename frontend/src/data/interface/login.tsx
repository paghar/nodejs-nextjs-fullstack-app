export interface RegisterProps {
  form: {
    name: string;
    email: string;
    password: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface ForgotPasswordFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: (value: string) => void;
}

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormProps {
  onSubmit: (
    data: FormValues,
    setError: (name: keyof FormValues, error: { message: string }) => void
  ) => void | Promise<void>;
}

export interface User { 
  name: string;
  email: string;
}