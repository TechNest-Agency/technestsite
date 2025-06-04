import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const TwoFactorVerify = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const location = useLocation();

  console.log("user of tokn mama", user);

  //   navigate logic
  const from =
    location.state?.from?.pathname || (user?.role === "admin" ? "/admin" : "/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/2fa/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code: code.trim(), userId: user?._id }),
        }
      );

      const res = await response.json();

      const data = res.data;

      console.log(res);

      if (!response.ok) {
        throw new Error(res.message || "Invalid verification code");
      }

      toast.success("verification successful😊");

      console.log("from", from);

      navigate(from, { replace: true });
      login(data?.user, data?.token);
    } catch (err) {
      console.error("2FA verification error:", err);
      setError(err.message || "Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex mt-10 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      }`}
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4"
            >
              <ShieldCheckIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Two-Factor Verification
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter the code sent to your email
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 mb-6"
              >
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  maxLength="6"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Verify Code"
                )}
              </motion.button>
            </div>
          </form>
          <div className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            Didn’t get the code?{" "}
            <button
              type="button"
              onClick={() => toast.info("Resend code feature coming soon!")}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Resend
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TwoFactorVerify;
