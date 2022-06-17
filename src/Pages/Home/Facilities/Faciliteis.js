import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Slide, LightSpeed } from "react-reveal";
import truck from "../../../Images/truck.jpg";

const Faciliteis = () => {
  return (
    <div className="bg-white w-full lg:flex block justify-center items-center py-24">
      <Slide left>
        <div className="mb-10">
          <img src={truck} alt="" />
        </div>
      </Slide>
      <LightSpeed right>
        <div className="lg:w-[60ch] px-4 py-3">
          <h2 className="font[Nunito] text-3xl font-semibold my-5 text-blue-900">
            <span className="text-blue-500">BagsQ</span>, is overflowing with
            clever features to manage every last detail of your workflow
          </h2>
          <p className="my-5">
            Completely optimise your workshop and free up your time with an
            overflowing suite of versatile features that handle every aspect of
            your busy, hectic daily operations.
          </p>
          <Link
            className="bg-blue-100 py-1 px-4 rounded-md"
            to="/manageInventories"
          >
            See All Inventories <FontAwesomeIcon icon={faArrowRight} />{" "}
          </Link>
        </div>
      </LightSpeed>
    </div>
  );
};

export default Faciliteis;
