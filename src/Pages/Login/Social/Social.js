import React, { useEffect } from "react";
import auth from "../../../fireabase.init";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const Social = () => {
  const [signInWithGoogle, googleUser, loading, error] =
    useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
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

  return (
    <>
      <button
        onClick={() => signInWithGoogle()}
        className="mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200 z-10"
      >
        <span>Sign In with Google</span>
      </button>
      {error && <p className="text-center text-red-500">{error.message}</p>}
    </>
  );
};

export default Social;
