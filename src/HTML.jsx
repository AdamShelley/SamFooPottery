import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

export default function HTML({ mainRef }) {
  const [showNav, setShowNav] = useState(true);
  gsap.registerPlugin(ScrollTrigger);

  const titleEl = useRef();

  const addSpans = (note) => {
    return [...note].map((letter, index) => {
      if (letter === " ") return " ";
      return (
        <span key={index} className="animated-span">
          {letter}
        </span>
      );
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate title
      const tl1 = gsap.timeline();
      tl1.set(".header-container h1 .animated-span", { y: 0, yPercent: 200 });
      tl1.to(".header-container h1 .animated-span", {
        yPercent: 0,
        y: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // animate title up
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".header-container>h1",
          start: 100,
          end: 1000,
          scrub: 1,
          // markers: true,
        },
      });

      gsap.set(".header-container>h1", { transformOrigin: "top top" });
      gsap.set(".header-container>p", { transformOrigin: "top top" });

      tl2
        .fromTo(
          ".header-container",
          {
            css: {
              position: "static",
              height: 0,
            },
          },
          {
            duration: 1,
            css: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "8vh",

              // backgroundColor: "#f7f0e1",
              // borderBottom: "1px solid black",
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
              // display: "flex",
              // alignItems: "space-between",
            },
          },
          "navbar"
        )
        .fromTo(
          ".header-container>h1",
          {
            // xPercent: 0,
            // scale: 1,
            css: {
              position: "absolute",
              top: "10%",
              left: "20%",
            },
          },
          {
            xPercent: -33,
            scale: 0.2,
            duration: 1,
            // top: 0,
            // margin: "2rem",
            color: "#5d434b",
          },
          "navbar"
        )
        .fromTo(
          ".header-container>p",
          {
            // scale: 1,
            css: {
              position: "absolute",
              top: "5%",
              right: "20%",
            },
          },
          {
            scale: 0.4,
            duration: 1,
            right: 0,
            // margin: "2rem",
            // top: 0,
            // right: 0,
            // padding: 0,
            // css: {
            //   zIndex: 2,
            //   position: "fixed",
            //   top: 0,
            //   right: 0,
            // },
          },
          "navbar"
        )

        .fromTo(
          ".header-scroll",
          { opacity: 1 },
          { opacity: 0, duration: 0.1 },
          "navbar"
        )

        .paused(true);

      // ScrollTrigger.create({
      //   start: 50,
      //   end: 200,
      //   scrub: 1,
      //   animation: tl2,
      //   // toggleClass: { targets: ".titles", className: "navbar-animate" },
      //   // onEnter: () => {
      //   //   document.querySelector(".titles").classList.add("navbar-animate");
      //   // },
      //   // onLeaveBack: () => {
      //   //   document.querySelector(".titles").classList.remove("navbar-animate");
      //   // },
      // });
    }, mainRef);
    return () => {
      return ctx.revert();
    };
  }, [mainRef]);

  return (
    <div className="page">
      <div className="html-content">
        <section className="header">
          <div className="header-section">
            <div className="titles" ref={titleEl}>
              <div className="header-container">
                <h1>{addSpans("Samantha Foo")}</h1>
                <p>Pottery Portfolio</p>
              </div>
              <div className="header-scroll">
                <h3>Scroll down</h3>
                <span className="down-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    viewBox="0 96 960 960"
                    width="48"
                  >
                    <path
                      fill="currentColor"
                      d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* {showNav && <Navbar />} */}

        <div className="first-move section-margin"></div>
        <section className="section1">
          <div className="pottery-examples">
            <h3>About</h3>
            <div className="example">
              <img src="./pictures/self.jpg" className="img img1" />
              <p>A potter operating in Singapore.</p>
              <p>
                Making ceramics with love for over 3 years. Take a look at the
                examples below and visit my instagram to see more of my work.
              </p>
              <a href="#"> Instagram </a>
            </div>

            <div className="second-move section-margin"></div>
          </div>
        </section>

        <section className="section2">
          <div className="second-examples">
            <div className="example">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis, itaque sint quis eveniet illo labore, voluptatibus,
              iusto ullam facilis obcaecati vero. Fugit consectetur debitis
              dicta! Dolorem adipisci voluptatem unde vero, id quibusdam natus
              aliquam porro a quam deserunt molestias dolor similique, modi ea
              voluptate? Rerum iure provident asperiores eum amet.
            </div>
            <div className="example">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis, itaque sint quis eveniet illo labore, voluptatibus,
              iusto ullam facilis obcaecati vero. Fugit consectetur debitis
              dicta! Dolorem adipisci voluptatem unde vero, id quibusdam natus
              aliquam porro a quam deserunt molestias dolor similique, modi ea
              voluptate? Rerum iure provident asperiores eum amet.
            </div>
            <div className="example">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis, itaque sint quis eveniet illo labore, voluptatibus,
              iusto ullam facilis obcaecati vero. Fugit consectetur debitis
              dicta! Dolorem adipisci voluptatem unde vero, id quibusdam natus
              aliquam porro a quam deserunt molestias dolor similique, modi ea
              voluptate? Rerum iure provident asperiores eum amet.
            </div>
          </div>
        </section>
        <div className="third-move section-margin"></div>
        <section className="section3">
          <div className="third-section">
            <div className="column">
              <img src="./pictures/1.JPG" className="img img1" />
            </div>
            <div className="column">
              <img src="./pictures/2.JPG" className="img img1" />
            </div>
            <div className="column">
              <img src="./pictures/3.JPG" className="img img1" />
            </div>
          </div>
        </section>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
