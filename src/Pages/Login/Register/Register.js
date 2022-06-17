import React, { useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../fireabase.init";
import registerImage from "../../../Images/register-img.png";
import Loading from "../../Shared/Loading/Loading";
import Social from "../Social/Social";

const Register = () => {
  const [createUserWithEmailAndPassword, hookUser, loading, hookError] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    passwordConfirmation: "",
  });

  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  if (loading) {
    return <Loading />;
  }
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleEmailInput = (e) => {
    if (/^\S+@\S+\.\S+$/.test(e.target.value)) {
      setErrors({ ...errors, emailError: " " });
      setEmail(e.target.value);
    } else {
      setErrors({ ...errors, emailError: "Please Input Valid Email!" });
      setEmail("");
    }
  };
  const handlePasswordInput = (e) => {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)) {
      setPassword(e.target.value);
      setErrors({ ...errors, passwordError: "" });
    } else {
      setErrors({
        ...errors,
        passwordError:
          "Password Must Contains : Minimum One Number,One Uppercase Letter and One Lowercase Letter",
      });
      setPassword("");
    }
  };
  const handleConfirmInput = (e) => {
    if (e.target.value === password) {
      setErrors({ ...errors, passwordConfirmation: "" });
      setConfirmPassword(e.target.value);
    } else {
      setErrors({
        ...errors,
        passwordConfirmation: "Password Didn't Matched",
      });
      setConfirmPassword("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
      await sendEmailVerification();
      toast("Name Updated");
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
    }
  };

  return (
    <>
      <div className="lg:flex">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-24 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Create Your Account
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
            <form onSubmit={handleRegister}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  onChange={handleNameInput}
                  id="floating_outlined1"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Enter Your Full name
                </label>
              </div>
              <div className="relative my-4">
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailInput}
                  id="floating_outlined2"
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
              {errors?.emailError && (
                <p className="text-center text-red-500">{errors.emailError}</p>
              )}
              <div className="relative my-4 mb-6">
                <input
                  type="password"
                  name="password"
                  onChange={handlePasswordInput}
                  id="floating_outlined3"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
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
              <div className="relative my-4 mb-5">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleConfirmInput}
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Confirm Your Password
                </label>
              </div>
              {errors?.passwordConfirmation && (
                <p className="text-center text-red-500">
                  {errors.passwordConfirmation}
                </p>
              )}

              <div className="flex w-full my-4">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">register</span>
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
              {hookError && (
                <p className="text-center text-red-500">{hookError.message}</p>
              )}
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
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
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2">Already Have An Account?</span>
            </Link>
          </div>
        </div>
        {/* </div> */}
        <div className="hidden lg:flex w-[60vw] items-center justify-center bg-indigo-100 flex-1 h-[90vh]">
          <div className="max-w-lg transform duration-200 hover:scale-110 cursor-pointer ">
            <img src={registerImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
