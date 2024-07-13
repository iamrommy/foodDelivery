const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  GET_PROFILE: BASE_URL + "/api/v1/auth/me",
  LOGOUT_API: BASE_URL + "/api/v1/auth/logout",
}
