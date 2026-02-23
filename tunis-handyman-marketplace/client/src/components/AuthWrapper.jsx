import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const AuthWrapper = ({ type }) => {
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("role"); // "role", "form"

  const [{ showLoginModal, showSignupModel, userRole }, dispatch] =
    useStateProvider();
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    dispatch({
      type: reducerCases.SET_USER_ROLE,
      userRole: role,
    });
    setStep("form");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { email, password } = values;
      if (!email || !password) {
        toast.error("Please fill all the fields.");
        setLoading(false);
        return;
      }

      // Email validation using regular expression
      const emailPattern = /^\w+@[\w.-]+\.\w{2,4}$/;

      if (!emailPattern.test(email)) {
        toast.error("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      const payload =
        type === "signup"
          ? { ...values, userType: userRole || "buyer" }
          : values;

      const {
        data: { user, jwt },
      } = await axios.post(
        type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
        payload,
        { withCredentials: true },
      );
      setCookies("jwt", jwt);
      dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
      if (user) {
        dispatch({ type: reducerCases.SET_USER, userInfo: user });
        toast.success(
          type === "login"
            ? "Login successful!"
            : `Welcome ${user.email}! Account created as ${user.userType}.`,
        );
      }
      setLoading(false);
    } catch (err) {
      console.error("Auth error:", err);
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        console.log("@RESPONSE (error)", resp?.data, "status:", resp?.status);
        const data = resp?.data;
        const message =
          typeof data === "string"
            ? data
            : data?.error || data?.message || "An error occurred";

        toast.error(message);
      } else {
        toast.error(err?.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAuth = () => {
    setStep("role");
    setValues({ email: "", password: "" });
    dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
  };

  const handleBackToLogin = () => {
    setStep("role");
    setValues({ email: "", password: "" });
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: false,
    });
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  // Show role selection for signup
  if (type === "signup" && step === "role") {
    return (
      <div className="fixed top-0 z-[100]">
        <div className="h-[100vh] w-[100vw] backdrop-blur-md fixed top"></div>
        <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
          <div className="fixed z-[101] h-max w-max bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
            <AiOutlineCloseCircle
              className="h-6 w-6 text-gray-700 hover:text-gray-900 absolute top-2 right-2 cursor-pointer"
              onClick={handleCloseAuth}
            />
            <div className="flex flex-col justify-center items-center p-8 gap-7 w-[450px]">
              <h3 className="text-3xl font-semibold text-slate-700">
                Join freelanceX
              </h3>
              <p className="text-gray-600 text-center">
                Choose your account type to get started
              </p>

              <div className="w-full flex flex-col gap-4">
                <div
                  className="border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#1DBF73] hover:bg-green-50 transition-all duration-300"
                  onClick={() => handleRoleSelect("buyer")}
                >
                  <h4 className="text-xl font-semibold mb-2">
                    🛒 Service Buyer
                  </h4>
                  <p className="text-gray-600">
                    Find and hire skilled freelancers for your projects
                  </p>
                </div>

                <div
                  className="border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#1DBF73] hover:bg-green-50 transition-all duration-300"
                  onClick={() => handleRoleSelect("provider")}
                >
                  <h4 className="text-xl font-semibold mb-2">
                    💼 Service Provider
                  </h4>
                  <p className="text-gray-600">
                    Offer your skills and earn money from clients
                  </p>
                </div>
              </div>
            </div>
            <div className="py-5 w-full flex items-center justify-center border-t border-slate-400">
              <span className="text-sm text-slate-700">
                Already a member?&nbsp;
                <span
                  className="text-[#1DBF73] cursor-pointer"
                  onClick={handleBackToLogin}
                >
                  Login Now
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 z-[100]">
      <div className="h-[100vh] w-[100vw] backdrop-blur-md fixed top "></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div
          className="fixed z-[101] h-max w-max bg-white rounded-lg shadow-lg flex flex-col justify-center items-center"
          id="auth-modal"
        >
          <AiOutlineCloseCircle
            className="h-6 w-6 text-gray-700 hover:text-gray-900 absolute top-2 right-2 cursor-pointer"
            onClick={handleCloseAuth}
          />
          <div className="flex flex-col justify-center items-center p-8 gap-7">
            <h3 className="text-2xl font-semibold text-slate-700">
              {type === "login"
                ? "Welcome back!"
                : `Join as a ${userRole === "provider" ? "Service Provider" : "Buyer"}`}
            </h3>

            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="border border-slate-300 p-3 w-80"
                value={values.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                className="border border-slate-300 p-3 w-80"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              {type === "login" && (
                <span
                  className="text-[#1DBF73] text-sm cursor-pointer text-right "
                  onClick={() =>
                    alert(
                      "Hey, forgetful genius! Relax and try to remember your password! 🔍",
                    )
                  }
                >
                  Forgot Password?
                </span>
              )}

              <button
                className="bg-[#1DBF73] text-white px-12 text-lg text-center font-semibold rounded-r-md p-3 w-80 flex justify-center items-center"
                onClick={handleClick}
                type="button"
              >
                {loading ? (
                  <ThreeDots
                    height={28}
                    width={50}
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : type === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="relative  w-full text-center">
                <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                  <span className="bg-white relative z-10 px-2">OR</span>
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                  <FcGoogle className="absolute left-4 text-2xl" />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
          <div className="py-5 w-full flex items-center justify-center border-t border-slate-400">
            <span className="text-sm  text-slate-700">
              {type === "login" ? (
                <>
                  Don't have an account?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      setStep("role");
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });
                    }}
                  >
                    Join Now
                  </span>
                </>
              ) : (
                <>
                  Already a member?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={handleBackToLogin}
                  >
                    Login Now
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
