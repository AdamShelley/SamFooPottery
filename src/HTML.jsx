import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export default function HTML({ mainRef, showHTML }) {
  gsap.registerPlugin(ScrollTrigger);
  let mm = gsap.matchMedia();
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
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
          end: () => window.innerHeight * 2,
          scrub: 0.3,
        },
      });

      gsap.set(".header-container", {
        height: "25vh",
      });

      mm.add("(min-width: 350px)", () => {
        tl2.to(".header-container", { height: "10vh", duration: 2 }, "navbar");
        gsap.set(".header-container>h1", {
          top: "10rem",
          left: "3rem",
          letterSpacing: "4px",
          fontSize: "2.5rem",
          whiteSpace: "nowrap",
          willChange: "transform",
        });
        gsap.set(".header-container>p", {
          top: "9rem",
          right: "4rem",
          fontSize: "1.0rem",
        });

        tl2.to(
          ".header-container>h1",
          {
            top: "1.5rem",
            left: "2rem",
            duration: 2,
            fontSize: "1rem",
          },
          "navbar"
        );
        tl2.to(
          ".header-container>p",
          {
            top: "1.5rem",
            right: "2rem",
            duration: 2,
            fontSize: "0.9rem",
          },
          "navbar"
        );
      });

      mm.add("(min-width: 1000px)", () => {
        tl2.to(".header-container", { height: "12vh", duration: 2 }, "navbar");

        gsap.set(".header-container>h1", {
          top: "10rem",
          left: "25rem",
          letterSpacing: "7px",
          fontSize: "6rem",
        });
        gsap.set(".header-container>p", {
          top: "10rem",
          right: "25rem",
          fontSize: "2.5rem",
        });

        tl2.to(
          ".header-container>h1",
          {
            top: "1.5rem",
            left: "4rem",
            duration: 2,
            fontSize: "1.5rem",
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
          },
          "navbar"
        );
      });
      mm.add("(min-width: 1025px)", () => {
        tl2.to(".header-container", { height: "8vh", duration: 2 }, "navbar");
      });

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
        duration: 5,
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

      // Animate images up on horizontal scroll
      imageRefs.current.forEach((image) => {
        const imageCenter = image.offsetLeft + image.offsetWidth / 2;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: image,
              start: () => `${imageCenter - window.innerWidth} center`,
              end: () => `${imageCenter + window.innerWidth} center`,
              scrub: true,
            },
          })
          .fromTo(image, { opacity: 0.6 }, { opacity: 1, duration: 1 });
      });

      //  fade out animation
      gsap.to(".image-container", {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".section3",
          start: "top center",
          end: "center top",
          toggleActions: "restart none none none",
          // scrub: true,
        },
      });
    }, mainRef);

    return () => {
      return ctx.revert();
    };
    // }
  }, [mainRef]);

  const imageNames = ["4.png", "5.png", "6.png", "7.png", "8.png", "9.png"];

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
                <a
                  href="https://www.instagram.com/samfoopottery/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram{" "}
                </a>
              </div>

              <div className="second-move section-margin"></div>
            </div>
          </section>

          <section className="section2">
            <div className="second-examples" ref={containerRef}>
              <div className="examples-header-container">
                <p>My work</p>
              </div>
              {imageNames.map((image, index) => (
                <div
                  className="image-container"
                  key={image}
                  ref={(el) => (imageRefs.current[index] = el)}
                >
                  <img className="img-masonry" src={`/pictures/${image}`} />
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
                <div className="column-container">
                  <div className="big-image-container">
                    <img src={"/pictures/column2.JPG"} alt="description" />
                    <p>Creating art that blends beauty and functionality.</p>
                  </div>
                  <div className="medium-image-container">
                    <img src={"/pictures/column1.png"} alt="description" />
                    <p>Bringing clay to life, one masterpiece at a time.</p>
                  </div>
                  <div className="medium-image-container">
                    <img src={"/pictures/column3.JPG"} alt="description" />
                    <p>Transforming clay into expressions of inspiration.</p>
                  </div>
                </div>
                <span>Follow me on instagram for more ceramics!</span>
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
