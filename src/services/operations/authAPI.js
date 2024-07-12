import { toast } from "react-hot-toast"

import { setLoading, setToken, setUser } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  GET_PROFILE,
  LOGOUT_API
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {email})
      
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success);

      const message = response.data.message;

      if(message === "User already exists" || message === "User already exists with google signup"){
        if(message === "User already exists with google signup"){
          toast.error("User already signed up with google");
        }
        else if(message === "User already exists"){
          toast.error("Sign Up Failed, User already Exists");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  username,
  email,
  password,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        email,
        password,
        otp,
      })

      // console.log("SIGNUP API RESPONSE............", response)

      const message = response.data.message;

      if(message === "Invalid OTP" || message === "OTP not valid"){
       if(message === "Invalid OTP"){
          toast.error("Wrong OTP, Please Try again");
        }
       if(message === "OTP not valid"){
          toast.error("OTP is not valid");
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
      
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      // console.log("LOGIN API RESPONSE............", response)

      const message = response.data.message;

      if(message === "User is not registered, please try again" || message === "Password is incorrect" || message === "User has a google account with no password, Log in with google"){
        if(message === "User is not registered, please try again"){
          toast.error("User not registered, Login Failed");
        }
        else if(message === "Password is incorrect"){
          toast.error("Incorrect Password");
        }
        else if(message === "User has a google account with no password, Log in with google"){
          toast.error("User has a google account with no password, Log in with google")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// function deleteCookie(name) {
//   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// }

export function logout(navigate) {
  return async(dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
   
    try {
      const response = await apiConnector("GET", LOGOUT_API); 

      console.log("LOGOUT API RESPONSE............", response)

      const message = response.data.message;

      if(message === "Error logging out"){
        toast.error('Error logging out')
        toast.dismiss(toastId)
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.dismiss(toastId)
      toast.success('Logged out')
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
      toast.error("Logout Failed")
    }

    navigate("/login")
  }
}

export function getProfile() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      // const response = await apiConnector("GET", GET_PROFILE)
      const response = await apiConnector("GET", GET_PROFILE, null, { withCredentials: true }); 

      console.log("LOGIN API RESPONSE............", response)

      const message = response.data.message;

      if(message === "not Logged in"){
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("user", JSON.stringify(response.data.user))
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
      console.log("Login Failed")
    }
    toast.dismiss(toastId)
  }
}
