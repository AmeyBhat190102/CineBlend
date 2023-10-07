import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginWithOTP = () => {
  const { phoneNumber } = useSelector((state) => state.customReducer);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [mobile, setMobileNumber] = useState("");
  const dispatch = useDispatch();
  
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async () => {
    if (mobile === phoneNumber) {
      const number = "+91".concat(phoneNumber);
      await fetch("https://cine-blend-backend-deployment.vercel.app/api/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      })
        .then((response) => response.json())
        .then((data) => {
          setOtpSent(true);
        })
        .catch((error) => {
          alert("Failed to send OTP");
        });
    } else {
      alert("WRONG NUMBER!!");
    }
  };

  const verifyOTP = async () => {
    const number = "+91".concat(phoneNumber);
    await fetch("https://cine-blend-backend-deployment.vercel.app/api/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: number, otp: otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          dispatch({
            type: "setOtp",
            payload: true,
          });
          navigate("/home/myAccount");
        } else {
          alert(`Invalid OTP`);
          setOtp("");
          navigate("/LoginOTP");
        }
      })
      .catch((error) => {
        alert("OTP verification failed" + error);
      });
  };
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="w-80 bg-white p-4 rounded-lg shadow-lg">
        {otpSent ? (
          <>
            <input
              type="number"
              className="w-full px-4 py-2 mb-4 bg-gray-100 rounded border focus:outline-none focus:border-red-600"
              placeholder="Enter OTP Sent"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                verifyOTP();
              }}
            >
              Verify OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="tel"
              className="w-full px-4 py-2 mb-4 bg-gray-100 rounded border focus:outline-none focus:border-red-600"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button
              className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                sendOTP();
              }}
            >
              Send OTP
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginWithOTP;