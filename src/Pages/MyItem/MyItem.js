import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../fireabase.init";
import MyItemCard from "./MyItemCard";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading/Loading";
import { faX } from "@fortawesome/free-solid-svg-icons";

const MyItem = () => {
  const [user] = useAuthState(auth);
  const [myInventory, setMyInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadItems, setLoadItems] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://bagsqhike.herokuapp.com/myitem?email=${user?.email}`;
    setIsLoading(true);
    try {
      axios(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authorizationToken")}`,
        },
      }).then((response) => {
        if (!loadItems) {
          setMyInventory(response.data.slice(0, 10));
          setIsLoading(false);
        }
        if (loadItems) {
          setMyInventory(response.data);
          setIsLoading(false);
        }
      });
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        signOut(auth);
        navigate("/login");
      }
    }
  }, [user, loadItems]);

  const handleDelete = (id, confirmation) => {
    const url = `https://bagsqhike.herokuapp.com/inventory/${id}`;
    if (confirmation) {
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          const remainingProducts = myInventory.filter(
            (product) => product._id !== id
          );
          setMyInventory(remainingProducts);
          toast("Item Deletation Complete");
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="py-14 flex flex-col justify-center min-h-[80vh]">
        {myInventory.length === 0 ? (
          <div className="text-5xl text-center font-extrabold uppercase text-gray-600">
            <FontAwesomeIcon className="text-red-600" icon={faX} /> You Did't
            Added Any Items{" "}
            <FontAwesomeIcon className="text-red-600" icon={faX} />
          </div>
        ) : (
          <>
            <h1 className="text-center">Products That You've Added</h1>
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 px-4 lg:px-28 pt-5">
              {myInventory.map((item) => (
                <MyItemCard
                  key={item._id}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-center ">
              <Link
                className="bg-teal-200 hover:bg-teal-400 py-1 w-1/2 lg:w-1/6 mx-2 my-3 text-center rounded-full font-semibold text-gray-500"
                to="/manageInventories"
              >
                Manage Inventories
              </Link>
              {myInventory.length >= 10 && (
                <button
                  onClick={() => setLoadItems(!loadItems)}
                  className="bg-teal-200 hover:bg-teal-400 py-1 w-1/2 lg:w-1/6 mx-2 my-3 text-center rounded-full font-semibold text-gray-500"
                >
                  {loadItems ? "Load Few Items" : "Load All Items"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyItem;
