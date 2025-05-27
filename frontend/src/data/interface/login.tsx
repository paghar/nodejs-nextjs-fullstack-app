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