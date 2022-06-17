import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Flip } from "react-reveal";

const MyItemCard = ({ item, handleDelete }) => {
  const { name, description, image, quantity, price, supplier, _id } = item;
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement(document.getElementById("root"));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Flip top>
      <div className="py-5 border rounded-2xl bg-white">
        <div className="lg:flex block items-center">
          <div className="lg:w-1/4  px-3 py-4 mx-auto">
            <img src={image} alt="" />
          </div>
          <div className="lg:pr-20">
            <div className="py-4 px-4 bg-white">
              <span className="flex justify-between py-2">
                <span className="block text-lg text-gray-600 font-bold tracking-wide">
                  {name}
                </span>
                <span className="font-semibold uppercase text-blue-400">
                  ${price}
                </span>
              </span>
              <span className="block text-gray-600 text-sm">
                {description.slice(0, 50)}...
              </span>
              <span>
                <small>Supplier : {supplier}</small>
              </span>
              <div className="flex justify-between pt-1">
                <span>
                  <span>Rating : </span>{" "}
                  <span className="text-blue-400">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                  </span>
                </span>
                <span className="text-sm">
                  Available:{" "}
                  <span className="font-bold">
                    {quantity === 0 ? "Sold Out" : quantity}
                  </span>{" "}
                  {quantity === 0 ? "" : " Pcs."}
                </span>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => navigate(`/inventory/${_id}`)}
                className="w-1/2 mx-4 bg-blue-200 py-1 hover:bg-blue-400 rounded-full"
              >
                Manage
              </button>
              <button
                onClick={openModal}
                className="w-1/2 mx-4 bg-red-200 py-1 hover:bg-red-400 rounded-full"
              >
                Delete
              </button>
              <div className="rounded-3xl">
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                  overlayClassName="Overlay"
                >
                  <button
                    onClick={closeModal}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="popup-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product? This process
                      cannot be undone.
                    </h3>
                    <button
                      onClick={() => {
                        handleDelete(_id, true);
                      }}
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      onClick={closeModal}
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Flip>
  );
};

export default MyItemCard;
