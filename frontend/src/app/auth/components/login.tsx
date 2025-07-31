"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUp from "../../../hooks/signup";
import SignIn from "../../../hooks/signin";

export default function AuthSwitcher() {
  const [isSignup, setIsSignup] = useState(false);
  const [isActive, setisActive] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // ISSUE in signup: error is not displayed when same username is sent to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignup) {
      // 🛡️ Only switch on success
      try {
        await SignUp({ username, password });

        setIsSignup(false);
        setisActive("signin");
        setUsername("");
        setPassword("");
        setError("✅ Account created successfully. Please sign in.");
      } catch (err: any) {
        let msg =
          err.response?.data?.message ||
          err.message ||
          "Something went wrong during signup.";
        setError(`❌ ${msg}`);
        console.log(msg);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const token = await SignIn({ username, password });
        localStorage.setItem("token", token);
        router.push("/home");
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          err ||
          "Something went wrong during login.";
        setError(`❌ ${msg}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 border rounded shadow-sm bg-white/10 space-y-4">
      <div className="text-center text-xl flex flex-row justify-evenly gap-2">
        <button
          type="button"
          className={`text-blue-600 underline-offset-8 
            ${isActive === "signin" ? "bg-black text-white underline" : ""}
            rounded-lg px-10 py-2`}
          onClick={() => {
            setIsSignup(false);
            setisActive("signin");
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`text-blue-600 underline-offset-8 ${
            isActive === "signup" ? "bg-black text-white underline" : ""
          } rounded-lg px-10 py-2`}
          onClick={() => {
            setIsSignup(true);
            setisActive("signup");
          }}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center">
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading
            ? isSignup
              ? "Creating Account..."
              : "Signing In..."
            : isSignup
            ? "Sign Up"
            : "Sign In"}
        </button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
