"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUp from "../../../_hooks/signup";
import SignIn from "../../../_hooks/signin";
import axios from "axios";

/**
 * Displays Sign Up or Login Form based on condition
 * @returns Form
 */
export default function SignupLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [isActive, setisActive] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  // ISSUE in signup: error is not displayed when same username is sent to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignup) {
      try {
        await SignUp({ username, password });

        setIsSignup(false);
        setisActive("signin");
        setUsername("");
        setPassword("");
        setError(""); // clear error only after success
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          const message =
            err.response.data?.message || "Signup failed. Please try again.";
          setError(`${message}`);
        } else {
          setError("Unexpected error occurred during signup.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        // Store the token if signin was succeeded
        const token = await SignIn({ username, password });
        localStorage.setItem("token", token);
        // Redirect after signIn
        router.push("/");
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          err ||
          "Something went wrong during login.";
        setError(`${msg}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle Password Visibility func()
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 border rounded-2xl shadow-sm bg-white/5 space-y-4">
      {/* Switch between signup & signin */}
      <div className="flex justify-center gap-6 text-xl my-4">
        {/* Sign In */}
        <button
          type="button"
          className={`px-10 py-2 rounded-2xl transition-all duration-200 
      underline-offset-8 focus:outline-none
      ${
        isActive === "signin"
          ? "bg-black text-white underline ring-2 ring-blue-500"
          : "text-blue-600"
      }`}
          onClick={() => {
            setIsSignup(false);
            setisActive("signin");
          }}
        >
          Sign In
        </button>

        {/* Sign Up */}
        <button
          type="button"
          className={`px-10 py-2 rounded-2xl transition-all duration-200 
      underline-offset-8 focus:outline-none
      ${
        isActive === "signup"
          ? "bg-black text-white underline ring-2 ring-blue-500"
          : "text-blue-600"
      }`}
          onClick={() => {
            setIsSignup(true);
            setisActive("signup");
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center">
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full outline-0 border-b-2 focus:border-white px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full outline-0 border-b-2 focus:border-white px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Show/Hide Toggle Button */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 font-semibold 
               hover:text-orange-700 transition-colors duration-200"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black/40 text-white py-2 rounded hover:bg-black border-white hover:border transition"
        >
          {loading
            ? isSignup
              ? "Creating Account..."
              : "Signing In..."
            : isSignup
            ? "Sign Up"
            : "Sign In"}
        </button>

        {/* Show Error message */}
        {error && (
          <p className="text-white bg-red-700/20 border border-red-600 text-md text-center p-4 rounded-2xl">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
