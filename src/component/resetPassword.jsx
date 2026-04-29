import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../features/ApplicationApi";

function ResetPassword() {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword({ id, token, password }).unwrap();

      setMessage(response?.message || "Password updated successfully.");
      setError("");
      setPassword("");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setMessage("");
      setError(err?.data?.message || err?.message || "Unable to reset password.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        className="max-w-md mx-auto bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-bold font-serif text-center">
          Reset Password
        </h2>
        {message && (
          <div className="bg-green-100 p-3 mb-4 text-green-700 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label className="block font-bold mb-2 font-serif" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-red-100 p-2 mb-4 text-red-600 rounded font-serif"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white rounded font-bold font-serif p-2 text-xl"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
