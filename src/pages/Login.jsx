import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSync } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/ticketsys.png";
// import bgImage from "../assets/ticketImg.png";

const inputStyle = `
  w-full border border-gray-300 p-2 rounded-sm 
  focus:ring-2 focus:ring-[#4D4C7D] outline-none text-sm
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
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
    setSuccessMsg("");

    if (!validateForm()) return;

    setLoading(true);
 //api 
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      setSuccessMsg("Login successful! Redirecting...");

      setTimeout(() => {
        const role = data.role?.toUpperCase();

        if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "DEVELOPER") {
          navigate("/developer-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (err) {
      const message = err.message || "Login failed";

      if (message.toLowerCase().includes("invalid")) {
        setErrorMsg(" Invalid email or password");
      } else if (message.toLowerCase().includes("not approved")) {
        setErrorMsg(" Account not approved yet");
      } else {
        setErrorMsg(message);
      }

      generateCaptcha();
    } finally {
      setLoading(false);
    }
    console.log("Form Data:", formData);
    console.log(`Generated captcha : ${captchaText}`)
    console.log(`Entered captcha : ${captchaInput}`)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4D4C7D] p-4">
      <div className="w-full max-w-5xl bg-white rounded shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <div className="hidden md:flex items-center justify-center bg-[#E8E8E8] p-6">
          <img src={bgImage} alt="ticket" />
        </div>

        <div className="p-6 md:p-10">
          <form onSubmit={handleSubmit}>

            <h2 className="text-2xl font-bold text-center mb-2">
              Welcome Back
            </h2>

            <p className="text-center text-gray-500 text-sm mb-4">
              Login to your account
            </p>

            {successMsg && (
              <p className="text-green-600 text-sm text-center mb-2">
                {successMsg}
              </p>
            )}

            {errorMsg && (
              <p className="text-red-500 text-sm text-center mb-2">
                {errorMsg}
              </p>
            )}

            <div className="space-y-4">

              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer w-full border border-gray-300 px-3 pt-4 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                />
                <label className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-xs">
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
                  required
                  className="peer w-full border border-gray-300 px-3 pt-4 pr-10 text-sm rounded-sm focus:ring-2 focus:ring-[#4D4C7D] outline-none"
                />
                <label className="absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-xs">
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


              <div className="flex items-center gap-3 mt-2">
                <div className="border border-gray-300 rounded-sm px-3 py-1.5 font-bold tracking-widest text-[#4D4C7D]">
                  {captchaText}
                </div>

                <input
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className={`${inputStyle} flex-1`}
                  placeholder="Enter captcha"
                />

                <button type="button" onClick={generateCaptcha} className="border rounded-sm p-2.5 border-gray-300">
                  <FaSync className="text-[#4D4C7D]" />
                </button>
              </div>

              <p className="text-red-500 text-xs">{fieldErrors.captcha}</p>
            </div>

            <button
            
              type="submit"
              disabled={loading}
              className={`w-full mt-5 text-white py-2 rounded ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4D4C7D] hover:bg-[#3c3b66]"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#4D4C7D] hover:underline">
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;