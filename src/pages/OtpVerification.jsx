import React from "react";

const OtpVerification = ({ email, onVerify, onBack }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

      <p className="text-gray-500 mb-4">
        OTP sent to {email} email
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            maxLength="1"
            className="w-10 h-10 border text-center rounded-sm border-gray-300 focus:ring-2 focus:ring-[#4D4C7D] outline-none"
          />
        ))}
      </div>

      <button
        onClick={onVerify}
        className="w-full bg-[#4D4C7D] text-white py-2 rounded-sm hover:bg-[#3c3b66]"
      >
        Verify OTP
      </button>

      <button
        onClick={onBack}
        className="mt-3 text-sm text-[#3c3b66] hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default OtpVerification;