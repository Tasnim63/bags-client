import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Flip } from "react-reveal";

const ProductCard = ({ product }) => {
  const { name, description, image, quantity, price, supplier, _id } = product;
  const navigate = useNavigate();
  return (
    <div className="py-5">
      <Flip left>
        <div className="shadow bg-white  max-w-sm flex justify-center items-center  mx-auto hover:shadow-xl transition-all rounded-xl overflow-hidden">
          <div>
            {/*<-------------------------> product image<-------------------------> */}

            <div className="w-3/4 px-3 py-4 mx-auto">
              <img src={image} alt="" />
            </div>

            {/*<-------------------------> Product detail <------------------------->*/}

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
                {description.slice(0, 80)} ...
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
                <span>
                  Available:{" "}
                  <span className="font-semibold">
                    {quantity === 0 ? "Sold Out" : quantity}
                  </span>
                  {quantity === 0 ? "" : " Pcs."}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/inventory/${_id}`)}
              className="w-full bg-blue-200 py-2 hover:bg-blue-400"
            >
              Manage
            </button>
          </div>
        </div>
      </Flip>
    </div>
  );
};

export default ProductCard;
