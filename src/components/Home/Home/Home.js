import React from "react";
import AppNavbar from "../../Shared/AppNavbar/AppNavbar";
import Footer from "../../Shared/Footer/Footer";
import ClientsFeedback from "../ClientsFeedback/ClientsFeedback";
import Header from "../Header/Header";
import OurClients from "../OurClients/OurClients";
import OurServices from "../OurServices/OurServices";
import Works from "../Works/Works";

const Home = () => {
  return (
    <div>
      <AppNavbar></AppNavbar>
      <Header />
      <OurClients />
      <OurServices />
      <Works />
      <ClientsFeedback />
      <Footer />
    </div>
  );
};

export default Home;
