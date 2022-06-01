import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Works.css";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// install Swiper components
SwiperCore.use([Pagination, Scrollbar, A11y, Autoplay]);

const Works = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch("https://agency-jahed.herokuapp.com/getWorks")
      .then((res) => res.json())
      .then((data) => setWorks(data));
  }, []);

  console.log(works);

  return (
    <section className="works-section my-5 py-5 w-100">
      <Container fluid>
        <div className="py-4">
          <h3 className="text-center text-white main-title">
            Here are some of <span>our works</span>
          </h3>
          <br />
          <div className="mt-3">
            <Swiper
              key={works.length}
              tag="section"
              wrapperTag="ul"
              spaceBetween={1}
              centeredSlides={true}
              autoplay={{ delay: 3000 }}
              slidesPerView={"auto"}
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => console.log("OnSlideChange", swiper)}
              onSwiper={(swiper) => console.log("OnSlideChange", swiper)}
            >
              {works.map((work) => (
                <SwiperSlide tag="li" key={work._id}>
                  <img src={work.image} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Works;
