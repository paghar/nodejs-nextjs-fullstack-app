import Button from "@components/ui/Button";
import TextBox from "@components/ui/TextBox";
import LinkComponent from "@components/ui/LinkComponent";
import { loginBtn, registerHeader, haveAccount } from "@data/constants/login";
import { RegisterProps } from "@data/interface/login";

export default function RegisterForm({
  form,
  handleChange,
  handleSubmit,
}: RegisterProps) {
  return (
    <div className="mt-28 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        {/* Header */}
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
          {registerHeader}
        </h2>

        {/* Name Field */}
        <TextBox
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
        />

        {/* Email Field */}
        <TextBox
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
        />

        {/* Password Field */}
        <TextBox
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-6 w-full rounded border border-gray-300 px-4 py-2"
        />

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
