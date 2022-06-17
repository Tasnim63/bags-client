import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import SingleReviews from "../SingleReview/SingleReviews";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios("https://bagsqhike.herokuapp.com/reviews").then((response) => {
      setReviews(response.data);
      setIsLoading(false);
    });
  }, [reviews]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div id="reviews" className="review-container">
      <h2 className="text-center text-3xl font-extrabold">Their Words</h2>
      <h3 className="text-center text-3xl font-extrabold text-blue-400">
        Our Pride
      </h3>
      <div className="grid grid-cols-1 mt-20 lg:grid-cols-4 gap-x-5 gap-y-20 px-5 lg:px-36 my-10">
        {reviews.map((review) => (
          <SingleReviews key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
