import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HTML({ mainRef, showHTML }) {
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
      tl1.set(".header-container h1 .animated-span", { y: 0, yPercent: 100 });
      tl1.set(".header-container p .animated-span", { y: 0, yPercent: 50 });
      tl1.to(".header-container h1 .animated-span", {
        yPercent: 0,
        y: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1,
      });
      tl1.to(".header-container p .animated-span", {
        yPercent: 0,
        y: 0,
        stagger: 0.05,
        ease: "back.out(1)",
        // delay: 1,
      });

      const headerHeight =
        document.querySelector(".header-container").offsetHeight;

      // animate title up
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".header-container",
          start: "top top",
          end: 1000,
          scrub: 0.5,
          pin: true,
          // markers: true,
        },
      });

      gsap.set(".header-container>h1", {
        transformOrigin: "top top",
      });
      gsap.set(".header-container>p", { transformOrigin: "top top" });

      tl2.to(
        ".header-container",

        {
          duration: 1,
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        },
        "navbar"
      );

      gsap.set(".header-container", {
        display: "flex",
      });
      gsap.set(".titles", { paddingTop: headerHeight });

      tl2
        .to(
          ".header-container>h1",

          {
            xPercent: -33,
            yPercent: -185,
            scale: 0.2,
            duration: 1,
            color: "#4A4A4A",
          },
          "navbar"
        )
        .to(
          ".header-container>p",
          {
            scale: 0.5,
            xPercent: 33,
            yPercent: -175,
            duration: 1,
            right: 0,
          },
          "navbar"
        );

      tl2
        .fromTo(
          ".header-scroll",
          { opacity: 1 },
          { opacity: 0, duration: 0.1 },
          "navbar"
        )

        .paused(true);
    }, mainRef);
    return () => {
      return ctx.revert();
    };
  }, [mainRef]);

  const imageNames = [
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
  ];

  return (
    <div className={`page ${showHTML && "page-fade"}`}>
      <div className="html-content">
        <section className="header">
          <div className="header-section">
            <div className="titles" ref={titleEl}>
              <div className="header-container">
                <h1>{addSpans("Samantha Foo")}</h1>
                <p>{addSpans("Pottery Portfolio")}</p>
              </div>
              <div className="header-scroll">
                {/* <h3>Scroll down</h3> */}
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
          <div className="about-section-container">
            <div className="about-section">
              <h3>About</h3>
              <img src="./pictures/self.jpg" className="img img1" />
            </div>
            <div className="about-section-description">
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
            {imageNames.map((image) => (
              <img
                key={image}
                className="img-masonry"
                src={`/pictures/${image}`}
              ></img>
            ))}
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
