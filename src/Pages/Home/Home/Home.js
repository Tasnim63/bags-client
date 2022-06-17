import React from "react";
import useProducts from "../../../Hooks/useProducts";
import Loading from "../../Shared/Loading/Loading";
import Banner from "../Banner/Banner";
import Benefits from "../Benefites/Benefits";
import CountOurNumbers from "../CountOurNumbers/CountOurNumbers";
import Faciliteis from "../Facilities/Faciliteis";
import CorporateClient from "../CorporateClient/CorporateClient";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews";
import Strength from "../Strength/Strength";

const Home = () => {
  const [products] = useProducts([]);
  if (!products) {
    return <Loading />;
  } else {
    return (
      <>
        <Banner />
        <Faciliteis />
        <CorporateClient />
        <Products />
        <Strength />
        <CountOurNumbers />
        <Benefits />
        <Reviews />
      </>
    );
  }
};

export default Home;
