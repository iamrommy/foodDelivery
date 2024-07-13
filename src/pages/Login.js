import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import bg1 from "../assets/bg-1.png";
import success from "../assets/success.png"
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login, logout } from "../services/operations/authAPI";

const Login = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { email, password } = formData;

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password, navigate));
    console.log("email and password after onsubmit, " + email + ", " + password);
  };

  useEffect(() => {
    if(!user){
      dispatch(getProfile())
    }
  // eslint-disable-next-line
  }, []); 

  return (
    <>
        <div>
          <div
            className={`absolute top-0 w-full h-full bg-cover bg-center`}
            style={{ backgroundImage: `url(${bg1})` }}
          ></div>
          <div
            className={`absolute bottom-0 bg-white w-full p-3 rounded-t-3xl transition-all duration-1000 ease-in-out flex justify-center
              ${user ? "h-[60%]" : "h-full"}`}
          >
            <div className="w-full max-w-2xl">  
              <div className="w-16 h-[4px] mx-auto bg-gray-300 rounded-full"></div>
              <div className="w-56 my-9 mx-auto"><img src={success} alt="Success"/></div>
              <h1 className="text-3xl font-bold text-center mb-2">Login Successful</h1>
              <Link to="/home/speed=1"><button className="w-full bg-[#FE8C00] p-4 my-6 rounded-full text-white active:bg-orange-500">Go to Tracking Screen</button></Link>
              <button onClick={()=>dispatch(logout(navigate))} className="text-gray-400 w-full text-center border-2 border-gray-200 p-4 mb-4 rounded-full text-base font-semibold cursor-pointer hover:underline">Logout</button>
            </div>
          </div>
        </div>

      {!user && <div className="absolute w-full bg-white p-5 pt-8 flex justify-center">
        <div className="w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold mb-2 w-[70%]">Login to your account.</h1>
          <p className="text-sm font-medium text-gray-500">Please sign in to your account </p>
        </div>
        <form onSubmit={handleOnSubmit}>
          <label>
            <p className="text-sm font-medium mb-2">
              Email Address
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email"
              className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm mb-5"
              />
          </label>
          <label className="relative">
            <p className="text-sm font-medium mb-2">
              Password
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm"
              />
            <span 
              onClick={() => setShowPassword((prev) => !prev)} 
              className="absolute right-2 top-[105px] z-[10] cursor-pointer"
              >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={19} fill="#000"/>
              ) : (
                <AiOutlineEye fontSize={19} fill="#000"/>
              )}
            </span>
          </label>
          <button className="text-sm text-[#FE8C00] cursor-pointer font-semibold w-full text-right my-5 hover:underline active:text-orange-500">Forgot password?</button>
          <button className="w-full bg-[#FE8C00] p-4 rounded-full text-white active:bg-orange-500" type="submit">Sign In</button>
        </form>

        <div className="relative my-5 h-5 flex justify-center items-center">
            <p className="w-full border-t border-[1px] absolute border-gray-300"></p>
            <span className="absolute text-gray-300 bg-white z-10 px-4">Or sign in with</span>
        </div>
        <a href={`${process.env.REACT_APP_BASE_URL}/api/v1/auth/googlelogin`} className="p-1.5 mx-auto border-2 my-10 rounded-full text-xl border-gray-300 w-min cursor-pointer block">
            <FcGoogle />
        </a>
        <div className="flex justify-center text-sm font-semibold gap-1">
          <span>Don't have an account? </span><Link to="/signup" className="text-[#FE8C00] hover:underline cursor-pointer active:text-orange-500"> Register</Link>
        </div>
        </div>
      </div>
        }
    </>
  );
};

export default Login;
