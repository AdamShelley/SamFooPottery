import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export default function HTML({ mainRef, showHTML }) {
  gsap.registerPlugin(ScrollTrigger);
  let mm = gsap.matchMedia();

  const h1Ref = useRef();
  const headerRef = useRef();

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
    // if (headerRef) {
    let ctx = gsap.context(() => {
      // Animate title
      const tl1 = gsap.timeline();
      tl1.set(".header-container h1 .animated-span", { y: 0, yPercent: 100 });
      tl1.set(".header-container p .animated-span", {
        y: 0,
        yPercent: 20,
      });
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
        ease: "back.out(1)",
        // delay: 1,
      });

      // Animate the navbar
      const tl2 = gsap.timeline({
        scrollTrigger: {
          start: "50",
          end: "1500",
          // markers: true,
          scrub: true,
        },
      });

      gsap.set(".header-container>h1", {
        top: "10%",
        left: "30%",
        position: "fixed",
        letterSpacing: "10px",
      });
      gsap.set(".header-container>p", {
        top: "10%",
        right: "20%",
        position: "fixed",
      });

      mm.add("(min-width: 1000px)", () => {
        tl2.to(".header-container", { height: "12vh", duration: 2 }, "navbar");
      });
      mm.add("(min-width: 1025px)", () => {
        tl2.to(".header-container", { height: "8vh", duration: 2 }, "navbar");
      });

      tl2.to(
        ".header-container>h1",
        {
          top: "1.5rem",
          left: "4rem",
          duration: 2,
          fontSize: "1.5rem",
          position: "fixed",
          transform: "none",
        },
        "navbar"
      );
      tl2.to(
        ".header-container>p",
        {
          top: "2rem",
          right: "4rem",
          duration: 2,
          fontSize: "1rem",
          position: "fixed",
          transform: "none",
        },
        "navbar"
      );

      tl2.to(
        ".header-scroll",
        {
          opacity: 0,
          duration: 0.5,
        },
        "navbar"
      );

      gsap.to(".section2", {
        xPercent: -100,
        duration: 10,
        x: () => window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".section2",
          start: "bottom bottom",
          // markers: true,
          end: () => `+=${window.innerWidth * 3}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, mainRef);

    return () => {
      return ctx.revert();
    };
    // }
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
    <ReactLenis root>
      <div className={`page ${showHTML && "page-fade"}`}>
        <div className="html-content">
          <section className="header">
            <div className="header-section">
              <div className="titles">
                <div className="header-container" ref={headerRef}>
                  <p>{addSpans("Pottery Portfolio")}</p>
                  <h1 ref={h1Ref}>{addSpans("Samantha Foo")}</h1>
                </div>
                <div className="header-scroll">
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

          <div className="first-move section-margin"></div>
          <section className="section1">
            <div className="about-section-container">
              <div className="about-section">
                <div className="shadow-box">
                  <h3>About</h3>
                </div>
              </div>
              <div className="about-section-description">
                <img src="./pictures/self.jpg" className="img img1" />
                <p>Welcome, I'm Samantha Foo.</p>

                <p>
                  As a dedicated and passionate potter based in Singapore, I've
                  been crafting unique ceramics for over five years. My pieces
                  are made with care, thoughtfulness, and a deep love for the
                  craft.
                </p>
                <p>
                  Each of my creations is a reflection of my artistic vision,
                  with the aim of bringing warmth, beauty, and function into
                  your everyday life. I invite you to explore my portfolio, and
                  if something catches your eye, know that my works are
                  available for purchase.
                </p>
                <p>
                  To keep up-to-date with my latest pieces, please follow me on
                  Instagram.
                </p>
                <a href="#"> Instagram </a>
              </div>

              <div className="second-move section-margin"></div>
            </div>
          </section>

          <section className="section2">
            <div className="second-examples">
              <div className="examples-header-container">
                <p>My work</p>
              </div>
              {imageNames.map((image) => (
                <div className="image-container" key={image}>
                  <img className="img-masonry" src={`/pictures/${image}`}></img>
                </div>
              ))}
            </div>
          </section>
          <div className="third-move section-margin"></div>
          <section className="section3">
            <div className="third-section">
              <div className="contact-information">
                <div className="shadow-box">
                  <h2>Samantha Foo Pottery</h2>
                </div>
              </div>
            </div>
          </section>
          <footer className="footer">
            <h4>Thank you for visiting</h4>
            <p>
              Created by{" "}
              <a
                href="https://adamshelley.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                adamshelley.com
              </a>
            </p>
          </footer>
        </div>
      </div>
    </ReactLenis>
  );
}
