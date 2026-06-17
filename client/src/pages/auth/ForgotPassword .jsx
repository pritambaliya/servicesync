import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

import Loader from "../../components/Loader";
import Flash from "../../components/Flash";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [flash, setFlash] = useState({
        message: "",
        success: "",
  });

  const [role, setRole] = useState("");


  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

        if (!role || !email) {
        setFlash({
            message: "Please select account type and enter email",
            type: "error"
        });
        return;
        }

      const { data } = await API.post(
        "/auth/forgot-password",
        { email, role }
      );

      setFlash({
        message: data.message,
        type: "success",
      });

      setStep(2);

    } catch (err) {
        setFlash({
            message: err.response?.data?.message ||
            "Failed to send OTP",
            type: "error",
        });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setFlash({
        message:
          "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      setFlash({
        message: data.message,
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setFlash({
        message:
          err.response?.data?.message ||
          "Password reset failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] flex items-center justify-center px-4">

      {loading && <Loader />}

      {flash.message && (
        <Flash
          flash={flash}
          setFlash={setFlash}
          success={flash.success}
        />
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-center text-[#081c3a] mb-6">
          Forgot Password
        </h2>

        {step === 1 ? (
          <form
            onSubmit={sendOtp}
            className="space-y-4"
          >
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full border rounded-lg p-3"
                >
                <option value="">
                    Select Account Type
                </option>

                <option value="customer">
                    Customer
                </option>

                <option value="provider">
                    Service Provider
                </option>
            </select>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-[#081c3a] text-white py-3 rounded-lg hover:bg-[#0b3c78]"
            >
              Send OTP
            </button>

          </form>
        ) : (
          <form
            onSubmit={resetPassword}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              required
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              required
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Reset Password
            </button>

          </form>
        )}

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}