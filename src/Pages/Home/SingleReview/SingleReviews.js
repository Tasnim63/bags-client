import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Flip } from "react-reveal";
import "./SingleReview.css";

const SingleReviews = ({ review }) => {
  const { name, email, image, context, _id } = review;
  return (
    <Flip left>
      <Link to={`/review/${_id}`}>
        <div className="review-card relative bg-white p-5 flex flex-col items-baseline hover:shadow-2xl transition-all duration-300 rounded-3xl">
          <div className="flex w-full justify-center items-center">
            <div className="review-card-image w-1/4 border-2 border-gray-400 absolute left-[50%] bottom-[100%] translate-y-1/2 -translate-x-1/2">
              <img
                className="image w-full border-2 border-white"
                src={image}
                alt=""
              />
            </div>
            <div className="flex mt-[10%] flex-col justify-center pl-3">
              <span className="text-center font-semibold">{name}</span>
              <span className="text-center text-xs">{email}</span>
            </div>
          </div>
          <p className="my-10 text-xs leading-6">{context.slice(0, 140)}...</p>
          <Link
            className="hover:text-blue-500 w-full flex items-center justify-end"
            to={`/review/${_id}`}
          >
            <FontAwesomeIcon className="mr-2" icon={faLink} />
            <span>See Full Review</span>
          </Link>
        </div>
      </Link>
    </Flip>
  );
};

export default SingleReviews;
