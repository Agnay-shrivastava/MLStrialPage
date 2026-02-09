import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/editor";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  }

  return (
    <div className="mls-login-page min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mls-login-card w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mls-login-title text-center text-xl font-semibold text-gray-900">
          Sign in
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Fake auth — any credentials work.
        </p>
        <form
          id="login-form"
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mls-field" data-field-name="username">
            <label
              htmlFor="login-username"
              className="mls-label block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="login-username"
              name="username"
              type="text"
              className="mls-input w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              placeholder="Enter username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mls-field" data-field-name="password">
            <label
              htmlFor="login-password"
              className="mls-label block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              className="mls-input w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              placeholder="Enter password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            id="login-submit"
            className="mls-login-submit w-full rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
