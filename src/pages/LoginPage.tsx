import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loginEmail, registerEmail, loginGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      if (isRegister) {
        await registerEmail(data.email, data.password);
      } else {
        await loginEmail(data.email, data.password);
      }
      navigate("/watchlist");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginGoogle();
      navigate("/watchlist");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/80 rounded-lg p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isRegister ? "Create Account" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              className="w-full mt-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>
        <div className="my-6 text-center text-gray-400">OR</div>
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-3 border border-gray-600 rounded-lg flex justify-center gap-2 items-center text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12.24 10.4V14.2H16.9C16.6 15.5 15.8 16.6 14.6 17.3L18.4 20.3C20.8 18.1 22.1 15.1 22.1 11.9C22.1 11.1 22 10.3 21.8 9.6H12.24V10.4Z"
              fill="#4285F4"
            />
            <path
              d="M12 22C15.1 22 17.7 20.9 19.4 19.3L15.6 16.6C14.6 17.3 13.4 17.8 12 17.8C9 17.8 6.4 15.6 5.5 12.8H1.6V15.6C3.3 19.1 7.1 22 12 22Z"
              fill="#34A853"
            />
            <path
              d="M5.5 12.8C5.3 12.1 5.2 11.4 5.2 10.7C5.2 10 5.3 9.3 5.5 8.6V5.8H1.6C0.9 7.1 0.5 8.9 0.5 10.7C0.5 12.5 0.9 14.3 1.6 15.6L5.5 12.8Z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.2C13.6 5.2 15 5.8 16.1 6.8L19.4 3.5C17.6 1.9 15.1 0.9 12 0.9C7.1 0.9 3.3 3.8 1.6 7.3L5.5 10.1C6.4 7.3 9 5.2 12 5.2Z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
        <div className="mt-6 text-sm flex justify-between items-center text-gray-300">
          <button
            onClick={() => setIsRegister((s) => !s)}
            className="hover:text-white transition-colors"
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "New? Create Account"}
          </button>
          {user && (
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-400"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
