import React, { useState, useEffect } from "react";
import { FaSync, FaEyeSlash, FaEye } from "react-icons/fa";
import bgImage from "../assets/ticketsys.png";
// import OtpVerification from "./OtpVerification";
import { Link } from "react-router-dom";

const inputStyle = `
  w-full border border-gray-300 p-2 rounded-sm 
  focus:ring-2 focus:ring-[#4D4C7D] outline-none text-sm
`;

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  });

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789!@#$%&^*~";

    let text = "";
    for (let i = 0; i < 5; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }

    setCaptchaText(text);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Minimum 6 characters required";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      errors.role = "Select role";
    }

    if (!formData.department) {
      errors.department = "Select department";
    }

    if (!captchaInput) {
      errors.captcha = "Enter captcha";
    } else if (captchaInput !== captchaText) {
      errors.captcha = "Captcha incorrect";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) return;

    console.log("Form Data:", formData);
    console.log(`Generated captcha : ${captchaText}`)
    console.log(`Entered captcha : ${captchaInput}`)

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // const data = await response.json();
      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // setIsRegistered(true);
      setStep(2);

    } catch (error) {
      setErrorMsg(error.message);
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4D4C7D] p-4">
      <div className="w-full max-w-5xl bg-white rounded shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <div className="hidden md:flex items-center justify-center bg-[#E8E8E8] p-6">
          <img src={bgImage} alt="ticket" />
        </div>

        <div className="p-6 md:p-10">

          {step === 1 && (
            <form onSubmit={handleSubmit}>

              <h2 className="text-2xl font-bold text-center mb-2">
                Create Account
              </h2>

              {errorMsg && (
                <p className="text-red-500 text-sm text-center mb-3">
                  {errorMsg}
                </p>
              )}

              {isRegistered && (
                <p className="text-green-600 text-sm text-center mb-3">
                  Registered successfully!
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="relative w-full">
                  <input name="fullName" value={formData.fullName}
                    className="peer w-full border border-gray-300 px-3 pt-4 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"

                    onChange={handleChange} />

                  <label className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D]
                   peer-valid:-top-2 peer-valid:text-xs">
                    Full Name
                  </label>
                  <p className="text-red-500 text-xs">{fieldErrors.fullName}</p>
                </div>


                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 px-3 pt-4 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                  />

                  <label className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D]
                 peer-valid:-top-2 peer-valid:text-xs">
                    Email
                  </label>

                  <p className="text-red-500 text-xs">{fieldErrors.email}</p>
                </div>

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 px-3 pt-4 pr-10 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                  />

                  <label
                    className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D]
                  peer-valid:-top-2 peer-valid:text-xs"
                  >
                    Password
                  </label>

                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  <p className="text-red-500 text-xs">{fieldErrors.password}</p>
                </div>

                <div className="relative w-full">
                  <input
                    type={confirmShowPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 px-3 pt-4 pr-10 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                  />

                  <label
                    className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D]
                  peer-valid:-top-2 peer-valid:text-xs"
                  >
                    Confirm Password
                  </label>

                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  >
                    {confirmShowPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  <p className="text-red-500 text-xs">{fieldErrors.confirmPassword}</p>
                </div>

                <div className="relative w-full">
                  <select name="role" value={formData.role}
                    className="peer w-full border border-gray-300 px-3 pt-4 pr-10 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                    onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                    <option value="Department">Department</option>
                  </select>

                  <label
                    className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D]
                  peer-valid:-top-2 peer-valid:text-xs"
                  >
                    Role
                  </label>
                  <p className="text-red-500 text-xs">{fieldErrors.role}</p>
                </div>

                <div className="relative w-full">
                  <select name="department" value={formData.department}
                    className="peer w-full border border-gray-300 px-3 pt-4 pr-10 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                    onChange={handleChange} required>
                    <option value=""></option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Support">Support</option>
                    <option value="Sales">Sales</option>
                  </select>
                  <label
                    className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D]
                  peer-valid:-top-2 peer-valid:text-xs"
                  >
                    Department
                  </label>
                  <p className="text-red-500 text-xs">{fieldErrors.department}</p>
                </div>

              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="border border-gray-300 rounded-sm px-3 py-1.5 font-bold tracking-widest text-[#4D4C7D]">
                  {captchaText}
                </div>

                <input
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className={inputStyle}
                  placeholder="Enter captcha"
                />

                <button type="button" onClick={generateCaptcha}
                  className="border rounded-sm p-2.5 border-gray-300">
                  <FaSync className="text-[#4D4C7D]" />
                </button>
              </div>

              <p className="text-red-500 text-xs">{fieldErrors.captcha}</p>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-[#4D4C7D] hover:bg-[#3c3b66]  text-white py-2 rounded"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-5 bg-[#4D4C7D] hover:bg-[#3c3b66] text-white py-2 rounded"
              >
                Send OTP
              </button> */}

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/" className="text-[#4D4C7D] hover:underline cursor-pointer">
                  Login
                </Link>
              </p>

            </form>
          )}

          {/* {step === 2 && (
            <OtpVerification
              email={formData.email}
              onVerify={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <div className="text-center flex flex-col items-center justify-center h-full">

              <h2 className="text-2xl font-bold text-[#4D4C7D] mb-3">
                OTP Verified Successfully !!!
              </h2>

              <p className="text-gray-500 mb-6">
                Your account has been created successfully.
              </p>

              <Link
                to="/login"
                className="w-full bg-[#4D4C7D] text-white py-2 rounded-sm hover:bg-[#3c3b66]"
              >
                Go to Login
              </Link>

            </div>
          )} */}

          {step === 2 && (
            <div className="text-center flex flex-col items-center justify-center h-full">

              <h2 className="text-2xl font-bold text-[#4D4C7D] mb-3">
                Congratulations !!
              </h2>

              <p className="text-gray-500 mb-6">
                Your account has been created successfully.
              </p>

              <Link
                to="/login"
                className="w-full bg-[#4D4C7D] text-white py-2 rounded-sm hover:bg-[#3c3b66]"
              >
                Go to Login
              </Link>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;