import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flip } from "react-reveal";
import Loading from "../Shared/Loading/Loading";
const DetailedReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://bagsqhike.herokuapp.com/review/${id}`;
    axios(url).then((response) => {
      setReview(response.data);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flip left>
      <div className="lg:mx-80 p-8 mb-[10%] lg:flex justify-center">
        <div className="border pt-5 pb-12 px-5 lg:px-10 text-gray-600 shadow-md rounded-3xl border-t-4 border-t-gray-600">
          <div className="flex items-center my-5">
            <div className="rounded-full border-8 mr-5 shadow-lg">
              <img className="rounded-full" src={review.image} alt="" />
            </div>
            <div>
              <p className="text-3xl font-bold">{review.name}</p>
              <p className="text-sm">{review.email}</p>
            </div>
          </div>
          <p className="lg:w-[80ch] leading-8">{review.context}</p>
        </div>
      </div>
    </Flip>
  );
};

export default DetailedReview;
