import React, { useState, createContext } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view

import EventShowCase from "components/EventShowCase/EventShowCase";
import AboutUs from "components/AboutUs/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  const previous_work = [
    {
      src: "im1.jpg",
      title: "Event1",
      desc: "Experience a transformative approach to document presentation as I seamlessly convert static PDFs into captivating Flipbooks. This engaging format synchronizes audio narration with text highlighting, delivering an immersive and dynamic reading experience. Perfect for enhancing educational materials, presentations, or any content you wish to showcase.",
    },
    {
      src: "im2.jpg",
      title: "Event2",
      desc: "Introducing our Minecraft Skin Editor – a hub for crafting, sharing, and discovering custom character skins. Dive into a creative world where you can design and showcase your unique skins while exploring an array of player-created designs.",
    },
    {
      src: "2.gif",
      title: "Event3",
      desc: "Introducing our Tattoo Shop Booking Platform – a streamlined solution for showcasing our reservation system and customer reviews. Explore the convenience of booking appointments and perusing authentic feedback from our clients, all in one place.",
    },
  ];

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <>
      
      <div className="wrapper">
        <PageHeader />
        <EventShowCase workData={previous_work} />
        <AboutUs workData={previous_work} />
        {/* <div className="main">
          <Basics />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications />
          <Typography />
          <JavaScript />
          <NucleoIcons />
          <Signup />
          <Examples />
          <Download />
        </div> */}
        <Footer />
      </div>
    </>
  );
}
