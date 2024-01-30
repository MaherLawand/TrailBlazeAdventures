import React from "react";
import { Button, Container, Row, Col } from "reactstrap";

import Rive from "@rive-app/react-canvas";
import { useEffect } from "react";
import PrevWork from "components/PrevWork/PrevWork";
import { Slide, Zoom, Fade } from "react-reveal";
import anime from "animejs";

export default function PageHeader() {
  const fileUrl = process.env.PUBLIC_URL + "/assets/sitespire.riv";
  const TypingAnimation = () => {
    useEffect(() => {
      const textElement = document.getElementById("typing-animation");
      const textContent = "TrailBlaze Adventures";
      let charIndex = 0;

      const typeText = () => {
        if (charIndex < textContent.length) {
          textElement.textContent += textContent[charIndex];
          charIndex++;
          setTimeout(typeText, 100); // Adjust the typing speed
        }
      };

      typeText(); // Start the typing animation
    }, []);
  };

  useEffect(() => {
    // Wrap every letter in a span
    const textWrapper = document.querySelector(".ml12");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime.timeline({ loop: false }).add({
      targets: ".ml12 .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i,
    });
    // .add({
    //   targets: ".ml12 .letter",
    //   translateX: [0, -30],
    //   opacity: [1, 0],
    //   easing: "easeInExpo",
    //   duration: 1100,
    //   delay: (el, i) => 100 + 30 * i,
    // });

    var textWrapper2 = document.querySelector(".ml1 .letters");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml1 .letter",
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 10, // Shortened duration to make it faster
        delay: (el, i) => 40 * (i + 1),
      })
      .add({
        targets: ".ml1 .line",
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 500, // Shortened duration to make it faster
        offset: "-=625", // Adjusted offset accordingly
        delay: (el, i, l) => 80 * (l - i),
      });

    // .add({
    //   targets: ".ml1",
    //   opacity: 0,
    //   duration: 1000,
    //   easing: "easeOutExpo",
    //   delay: 1000,
    // });
  }, []); // Empty dependency array ensures this effect runs once after initial render

  return (
    <Fade>
      <div className="page-header header-filter">
        <Container>
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col
                lg="12"
                md="10"
                className="d-flex flex-column align-items-center text-center"
              >
                <Slide top>
                  <h1 id="trailblaze-adventures" className="ml12">
                    TrailBlaze Adventures
                  </h1>
                  {/* <br /> */}

                  <p
                    className="text-white mb-3 ml1"
                    style={{ fontSize: "1em" }}
                    id="slogan"
                  >
                    <span class="text-wrapper">
                      <span className="line line1"> </span>
                      <span className="letters">
                        Do not follow where the path may lead. Go instead where
                        there is no path and leave a trail.
                      </span>
                      <span className="line line2"> </span>
                    </span>
                  </p>
                </Slide>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Fade>
  );
}
