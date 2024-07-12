import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSignupData } from "../redux/slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    agree: false, // new state for checkbox
  });

  const { email, password, username, agree } = formData;

  const handleOnSubmit = (event) => {
    event.preventDefault();

    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));

    // console.log("email and password after onsubmit",email,password,username);
  }

  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-5 mt-4 mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold mb-2 w-[70%]">
          Create your new account
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Create an account to start looking for the food you like
        </p>
      </div>
      <form onSubmit={handleOnSubmit}>
        <label>
          <p className="text-sm font-medium mb-2">Email Address</p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            title="Please enter a valid email address (e.g. user@example.com)"
            className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm mb-5"
          />
        </label>
        <label>
          <p className="text-sm font-medium mb-2">User Name</p>
          <input
            required
            type="text"
            name="username"
            value={username}
            onChange={handleOnChange}
            placeholder="Username"
            className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm mb-5"
          />
        </label>
        <label className="relative">
          <p className="text-sm font-medium mb-2">Password</p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            onInvalid={event => event.target.setCustomValidity('Please Enter valid Password')} 
            onInput={event => event.target.setCustomValidity('')} 
            className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-[105px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={19} fill="#000" />
            ) : (
              <AiOutlineEye fontSize={19} fill="#000" />
            )}
          </span>
        </label>

        {/* Checkbox */}
        <label className="flex items-center mt-4 relative">
          <input
            required
            type="checkbox"
            name="agree"
            checked={agree}
            onChange={handleOnChange}
            className="appearance-none border border-gray-300 rounded-md min-w-6 min-h-6 checked:bg-[#FE8C00] checked:border-transparent checked:outline-none mr-2"
          />

          {agree && <span className="absolute text-white left-1"><FaCheck /></span>}

          <span className="text-base font-semibold">
            I Agree with {" "}
            <span className="text-[#FE8C00] hover:underline cursor-pointer active:text-orange-500">Terms of Service</span> 
            {" "} and {" "}
            <span className="text-[#FE8C00] hover:underline cursor-pointer active:text-orange-500">Privacy policy</span> 
          </span>

        </label>

        <button
          className="w-full bg-[#FE8C00] p-4 rounded-full text-white active:bg-orange-500 mt-4"
          type="submit"
        >
          Register
        </button>
      </form>

      <div className="relative my-5 h-5 flex justify-center items-center">
        <p className="w-full border-t border-[1px] absolute border-gray-300"></p>
        <span className="absolute text-gray-300 bg-white z-10 px-4">
          Or sign up with 
        </span>
      </div>
      <a href={`${process.env.REACT_APP_BASE_URL}/api/v1/auth/googlelogin`} className="block p-1.5 mx-auto border-2 my-5 rounded-full text-xl border-gray-300 w-min cursor-pointer">
        <FcGoogle />
      </a>
      <div className="flex justify-center text-sm font-semibold gap-1">
        <span>Already have an account? </span>
        <Link to="/login" className="text-[#FE8C00] hover:underline cursor-pointer active:text-orange-500">
          {" "}
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
