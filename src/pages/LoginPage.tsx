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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white/80 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isRegister ? "Create account" : "Sign in"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-indigo-600 text-white hover:opacity-90"
        >
          {loading
            ? "Please wait..."
            : isRegister
            ? "Create account"
            : "Sign in"}
        </button>
      </form>

      <div className="my-4 text-center">OR</div>

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full py-2 border rounded flex justify-center gap-2 items-center"
      >
        Continue with Google
      </button>

      <div className="mt-4 text-sm flex justify-between">
        <button onClick={() => setIsRegister((s) => !s)} className="underline">
          {isRegister
            ? "Already have an account? Sign in"
            : "New? Create account"}
        </button>

        {user && (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
