import Button from "@components/ui/Button";
import LinkComponent from "@components/ui/LinkComponent";
import {
  forgotPasswordHeader,
  resetEmailText,
  loginBtn,
} from "@data/constants/login";
import { ForgotPasswordFormProps } from "@data/interface/login";

export default function ForgotPasswordForm({
  handleSubmit,
  email,
  setEmail,
}: ForgotPasswordFormProps) {
  return (
    <div className="mt-28 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        {/* Header */}
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          {forgotPasswordHeader}
        </h2>

        {/* Description */}
        <p className="mb-6 text-center text-sm text-gray-600">
          {resetEmailText}
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {loginBtn.sendResetLink}
        </Button>

        {/* Footer Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          <LinkComponent href="/" className="text-pink-600 hover:underline">
            {loginBtn.backToHome}
          </LinkComponent>
        </p>
      </form>
    </div>
  );
}
