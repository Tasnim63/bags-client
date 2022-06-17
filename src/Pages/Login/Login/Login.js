import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../fireabase.init";
import loginImage from "../../../Images/loginImage.png";
import Loading from "../../Shared/Loading/Loading";
import Social from "../Social/Social";

const Login = () => {
  // <-------------------------> react firebase hooks<------------------------->

  const [signInWithEmailAndPassword, hookUser, loading, hookError] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const [user] = useAuthState(auth);

  //<-------------------------> react hooks <------------------------->
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    //<-------------------------> creating json token <------------------------->
    if (user) {
      const url = `https://bagsqhike.herokuapp.com/account`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("authorizationToken", data.token);
        });
      navigate(from, { replace: true });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  //<-------------------------> getting email input and error handling <------------------------->
  const handleEmailInput = (e) => {
    if (/^\S+@\S+\.\S+$/.test(e.target.value)) {
      setErrors({ ...errors, emailError: " " });
      setEmail(e.target.value);
    } else {
      setErrors({ ...errors, emailError: "Please Input Valid Email!" });
      setEmail("");
    }
  };

  // <-------------------------> getting password input and error handling <------------------------->
  const handlePasswordInput = (e) => {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)) {
      setPassword(e.target.value);
      setErrors({ ...errors, passwordError: "" });
    } else {
      setErrors({
        ...errors,
        passwordError: `Password Must Contains : Minimum One Number,One Uppercase Letter and One Lowercase Letter`,
      });
      setPassword("");
    }
  };

  // <------------------------->   login onSubmit <------------------------->
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  // <------------------------->  sent password reset email <------------------------->

  const handleResetPass = async () => {
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Password Reset Email Sent!");
    } else {
      toast("Please Input Your Email!");
    }
  };

  return (
    <>
      <div className="lg:flex">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-24 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Login to your account
          </div>

          <Social />

          <div className="relative mt-10 h-px bg-gray-300">
            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                Or
              </span>
            </div>
          </div>

          <div className="mt-10">
            {/* <-------------------------> form <---------------------->*/}

            <form onSubmit={handleLogin}>
              <div className="relative my-4">
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailInput}
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Enter Your Email
                </label>
              </div>

              {/*<-------------------------> showing error <------------------------->*/}
              {errors?.emailError && (
                <p className="text-center text-red-500">{errors.emailError}</p>
              )}
              <div className="relative my-4 mb-6">
                <input
                  type="password"
                  name="password"
                  onChange={handlePasswordInput}
                  id="floating_outlined1"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined1"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Enter Your Password
                </label>
              </div>
              {errors?.passwordError && (
                <p className="text-center text-red-500">
                  {errors.passwordError}
                </p>
              )}
              {hookError && (
                <p className="text-center text-red-500">{hookError.message}</p>
              )}
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">login</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-between items-center mt-6">
            <Link
              to="/register"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span className="ml-2">New to BagsQ ?</span>
            </Link>
            <div
              onClick={handleResetPass}
              className="inline-flex cursor-pointer items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span className="ml-2">Forgot Your Password?</span>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="hidden lg:flex w-[60vw] items-center justify-center bg-indigo-100 flex-1 h-[90vh]">
          <div className="max-w-lg transform duration-200 hover:scale-110 cursor-pointer ">
            <img src={loginImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
