import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();

    if(otp.length < 6){
        if(otp.length === 0){
            toast.error("Please Enter OTP");
            return;    
        }
        toast.error("OTP Not valid");
        return;
    }

    const {
      username,
      email,
      password,
    } = signupData;

    dispatch(
      signUp(
        username,
        email,
        password,
        otp,
        navigate
      )
      );
    };
    

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] border-0 rounded-[0.5rem] aspect-square text-center"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-[#FE8C00] py-[12px] px-[12px] rounded-[8px] mt-6 font-medium "
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default VerifyEmail;