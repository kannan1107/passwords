import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../features/ApplicationApi";

function UpdatePassword() {
  const user = useSelector((state) => state.auth.user);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await updatePassword({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      setMessage(response?.message || "Password successfully updated!");
      setFormData((state) => ({
        ...state,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      setMessage(
        error?.data?.message || error?.message || "Unable to update password."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Password
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-500">
            {message}
          </div>
        )}
    

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          New Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter new password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          Confirm Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Confirm new password"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
          className="mr-2"
        />
        <span className="text-sm text-gray-600">Show Password</span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  </div>
</div>
  );
}

export default UpdatePassword;
