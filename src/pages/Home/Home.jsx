import React from "react";
import Header from "../../layouts/Header/Header";
import HomeBanner from "./HomeBanner";
import BasicCarousel from "../../components/Carousel/BasicCarousel";
import {
  gigContent,
  guidesContent,
  servicesContent,
  showcaseContent,
  testimonialContent,
} from "./carouselData";
import "./home.scss";
import BasicButton from "../../components/Button/BasicButton";
import SingleCarousel from "../../components/Carousel/SingleCarousel";
import Footer from "../../layouts/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <HomeBanner />

      {/* Services */}
      <section className="home__services container">
        <div className="home__services-content main-container mx-auto">
          <h2 className="mb-6">Recently Viewed & More</h2>
          <div className="recent-carousel">
            <BasicCarousel content={gigContent} />
          </div>
          <h2 className="mt-14 mb-6">Popular Services</h2>
          <div className="popular-carousel">
            <BasicCarousel
              content={servicesContent}
              backToTop={true}
              slidesToScroll={5}
            />
          </div>
        </div>
      </section>

      {/* Selling Propositions */}
      <section className="selling-proposition">
        <div className="main-container mx-auto flex justify-between">
          <div className="text">
            <h3 className="font-bold mb-6">The best part? Everything.</h3>
            <ul>
              <li>
                <div className="header flex items-center">
                  <i class="fa-regular fa-circle-check"></i>
                  <h4>Stick to your budget</h4>
                </div>
                <span>
                  Find the right service for every price point. No hourly rates,
                  just project-based pricing.
                </span>
              </li>

              <li>
                <div className="header flex items-center">
                  <i class="fa-regular fa-circle-check"></i>
                  <h4>Get quality work done quickly</h4>
                </div>
                <span>
                  Hand your project over to a talented freelancer in minutes,
                  get long-lasting results.
                </span>
              </li>

              <li>
                <div className="header flex items-center">
                  <i class="fa-regular fa-circle-check"></i>
                  <h4>Pay when you're happy</h4>
                </div>
                <span>
                  Upfront quotes mean no surprises. Payments only get released
                  when you approve.
                </span>
              </li>

              <li>
                <div className="header flex items-center">
                  <i class="fa-regular fa-circle-check"></i>
                  <h4>Count on 24/7 support</h4>
                </div>
                <span>
                  Our round-the-clock support team is available to help anytime,
                  anywhere.
                </span>
              </li>
            </ul>
          </div>

          <div className="video flex items-center">
            <div className="video-wrapper">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="main-categories">
        <div className="main-container mx-auto px-4">
          <h2>You need it, we've got it</h2>
          <ul className="categories flex flex-wrap justify-around text-center">
            <li className="w-1/5 top">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5 top">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5 top">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5 top">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5 top">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>

            <li className="w-1/5">
              <a href="/">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                Graphics & Design
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Ecommerce */}
      <section className="ecommerce">
        <div className="main-container text-white">
          <div className="flex justify-around">
            <div className="w-2/5">
              <div className="logo">
                <svg
                  width="139"
                  height="34"
                  viewBox="0 0 139 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#fff">
                    <path d="M81.6463 13.1117H78.4949C76.4661 13.1117 75.3797 14.6592 75.3797 17.2363V26.5544H69.4034V13.1117H66.8677C64.839 13.1117 63.7526 14.6592 63.7526 17.2363V26.5544H57.7763V8.13963H63.7526V10.9393C64.7301 8.76575 66.0705 8.13963 68.063 8.13963H75.3797V10.9393C76.3572 8.76575 77.6976 8.13963 79.6901 8.13963H81.6463V13.1117ZM56.4721 18.7838H44.0103C44.3358 20.8466 45.6036 22.0251 47.7413 22.0251C49.3345 22.0251 50.4584 21.3621 50.8201 20.1836L56.1092 21.6942C54.8051 24.8986 51.5811 26.8508 47.7413 26.8508C41.2569 26.8508 38.2869 21.7311 38.2869 17.3482C38.2869 13.0391 40.8952 7.88251 47.3784 7.88251C54.2607 7.88251 56.5424 13.1129 56.5424 16.9804C56.5436 17.8267 56.5073 18.379 56.4721 18.7838ZM50.6761 15.2115C50.531 13.6283 49.4083 12.1547 47.3795 12.1547C45.4959 12.1547 44.3732 13.0022 44.0103 15.2115H50.6761ZM27.855 26.5556H33.1078L39.6636 8.13963H33.651L30.4633 18.8576L27.203 8.13963H21.2267L27.855 26.5556ZM3.3692 26.5556H9.3092V13.1117H14.96V26.5556H20.8649V8.13963H9.31037V6.99808C9.31037 5.74583 10.1802 4.9721 11.5557 4.9721H14.9612V0H10.577C6.26662 0 3.3692 2.689 3.3692 6.63026V8.14082H0V13.1129H3.3692V26.5556Z"></path>
                    <path d="M86.9869 34V8.15269H90.4697V10.8905C91.5467 9.06569 93.7371 7.85986 96.2505 7.85986C101.708 7.85986 104.832 11.8749 104.832 17.3517C104.832 22.8273 101.564 26.8436 96.0714 26.8436C93.6657 26.8436 91.5116 25.7116 90.4709 23.9594V33.9988H86.9869V34ZM101.313 17.3529C101.313 13.52 99.0871 10.9643 95.7471 10.9643C92.3721 10.9643 90.1817 13.52 90.1817 17.3529C90.1817 21.1859 92.3721 23.7415 95.7471 23.7415C99.0871 23.7415 101.313 21.1859 101.313 17.3529Z"></path>
                    <path d="M116.757 11.2189H114.136C110.834 11.2189 109.755 14.2127 109.755 18.2277V26.5519H106.274V8.15259H109.757V11.6939C110.582 9.24771 112.018 8.15259 114.568 8.15259H116.758V11.2189H116.757Z"></path>
                    <path d="M115.91 17.3529C115.91 11.8404 119.823 7.86108 125.245 7.86108C130.666 7.86108 134.543 11.8404 134.543 17.3529C134.543 22.8655 130.666 26.8448 125.245 26.8448C119.823 26.8436 115.91 22.8643 115.91 17.3529ZM130.988 17.3529C130.988 13.5926 128.655 10.9643 125.243 10.9643C121.797 10.9643 119.463 13.5926 119.463 17.3529C119.463 21.1133 121.796 23.7416 125.243 23.7416C128.655 23.7416 130.988 21.1121 130.988 17.3529Z"></path>
                    <path d="M139 24.5201V24.5629C139 25.814 138.003 26.8294 136.771 26.8294C135.541 26.8294 134.542 25.8152 134.542 24.5629V24.5201C134.542 23.269 135.539 22.2537 136.771 22.2537C138.001 22.2537 139 23.269 139 24.5201Z"></path>
                  </g>
                </svg>
              </div>

              <h2>
                We're here for your <br /> <strong>e-Commerce</strong>{" "}
                everything
              </h2>

              <ul>
                <li>
                  <h4>Get a project manager</h4>
                  <span>
                    to guide you through each stage of launching your e-Commerce
                    business
                  </span>
                </li>

                <li>
                  <h4>Accelerate time-to-market</h4>
                  <span>
                    with a dedicated team of top-tier freelance experts
                  </span>
                </li>

                <li>
                  <h4>Optimize your budget</h4>
                  <span>
                    with a dedicated project manager who will handle all your
                    tasks, leaving you more money for marketing and growth
                  </span>
                </li>
              </ul>

              <BasicButton
                text="Get started"
                className={"mt-8 bg-orange-400 hover:bg-orange-600"}
              />
            </div>

            <div className="w-1/2">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/f83cfb5f5b7cdfed1482b83c956bc561-1710925224537/lohp-pro.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="main-container">
          <div className="testimonials__content px-10">
            <SingleCarousel content={testimonialContent} backToTop={true} />
          </div>

          <div className="logo-maker flex justify-between text-white">
            <div className="desc">
              <div className="logo mb-4">
                <svg
                  width="249"
                  height="34"
                  viewBox="0 0 249 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#FFFFFF">
                    <path d="M81.6,13.1h-3.1c-2,0-3.1,1.5-3.1,4.1v9.3h-6V13.1h-2.5c-2,0-3.1,1.5-3.1,4.1v9.3h-6V8.1h6v2.8 c1-2.2,2.3-2.8,4.3-2.8h7.3v2.8c1-2.2,2.3-2.8,4.3-2.8h2L81.6,13.1z M56.4,18.7H44c0.3,2.1,1.6,3.2,3.7,3.2 c1.6,0,2.7-0.7,3.1-1.8l5.3,1.5c-1.3,3.2-4.5,5.1-8.4,5.1c-6.5,0-9.5-5.1-9.5-9.5c0-4.3,2.6-9.4,9.1-9.4c6.9,0,9.2,5.2,9.2,9.1 C56.5,17.8,56.5,18.3,56.4,18.7z M50.7,15.2c-0.1-1.6-1.3-3-3.3-3c-1.9,0-3,0.8-3.4,3H50.7z M27.8,26.5H33l6.6-18.3h-6l-3.2,10.7 L27.2,8.1h-6L27.8,26.5z M3.4,26.5h5.9V13.1H15v13.4h5.9V8.1H9.3V7c0-1.2,0.9-2,2.2-2H15V0h-4.4C6.3,0,3.4,2.7,3.4,6.6v1.5H0v5 h3.4L3.4,26.5z"></path>
                    <path d="M88.4,0h3.5v26.6h-3.5V0z"></path>
                    <path d="M93.6,17.5c0-5.5,3.9-9.4,9.4-9.4c5.5,0,9.4,3.9,9.4,9.4s-3.9,9.4-9.4,9.4C97.5,26.9,93.6,23,93.6,17.5z M108.8,17.5c0-3.7-2.4-6.3-5.8-6.3c-3.5,0-5.8,2.6-5.8,6.3s2.4,6.3,5.8,6.3C106.4,23.8,108.8,21.2,108.8,17.5z"></path>
                    <path d="M130.1,28.3c0,3.3-2.1,5.7-5.6,5.7h-5.6c-3.8,0-5.8-2.2-5.8-5.4c0-1.5,0.8-2.9,1.9-3.7 c-0.9-0.7-1.4-1.6-1.4-2.8c0-1.5,0.9-2.5,2.2-3.8c-0.8-1-1.2-2.4-1.2-3.8c0-3.8,3-6.3,7-6.3c1,0,2,0.2,2.9,0.5l2.5-2.9l2.2,2 l-2.2,2.5c1,1.1,1.6,2.6,1.6,4.1c0,3.8-3,6.3-7,6.3c-1.3,0-2.5-0.3-3.5-0.7c-0.7,0.8-1,1.2-1,1.8c0,1,0.9,1.5,2,1.5h5.1 C127.6,23.3,130.1,24.9,130.1,28.3z M126.7,28.5c0-1.7-1.1-2.5-2.9-2.5h-4.2c-0.6,0-1.2,0-1.8-0.1c-0.9,0.7-1.2,1.6-1.2,2.6 c0,1.5,1,2.6,2.5,2.6h5.4C126.1,31.1,126.7,30,126.7,28.5z M117.9,14.4c0,2.2,1.7,3.5,3.7,3.5c2,0,3.7-1.3,3.7-3.5 c0-2.2-1.7-3.5-3.7-3.5C119.6,10.9,117.9,12.2,117.9,14.4z"></path>
                    <path d="M130.2,17.5c0-5.5,3.9-9.4,9.4-9.4c5.5,0,9.4,3.9,9.4,9.4s-3.9,9.4-9.4,9.4C134.2,26.9,130.2,23,130.2,17.5z M145.4,17.5c0-3.7-2.4-6.3-5.8-6.3c-3.5,0-5.8,2.6-5.8,6.3s2.4,6.3,5.8,6.3C143.1,23.8,145.4,21.2,145.4,17.5z"></path>
                    <path d="M155,8.4h3.5v3.3c0.8-2.1,2.7-3.5,5.4-3.5c3,0,5.2,1.3,5.9,3.7c0.7-2.1,3.1-3.7,5.9-3.7 c3.9,0,6.4,2.7,6.4,6.9v11.6h-3.5V16c0-2.9-1.5-4.8-3.9-4.8c-2.8,0-4.5,2-4.5,4.8v10.6h-3.5V16c0-2.9-1.5-4.8-3.8-4.8 c-2.8,0-4.5,2-4.5,4.8v10.6H155V8.4z"></path>
                    <path d="M199.3,14.7v11.9h-3.4v-3c-0.9,2-3.2,3.3-5.9,3.3c-3.7,0-6.2-2.3-6.2-5.5c0-3.7,2.4-5.9,7.1-5.9h3.9 c0.7,0,1.1-0.4,1.1-1v-0.1c0-2.2-2-3.6-4.5-3.6s-4.3,1.6-4.5,3.5h-3.2c0.3-3.6,3.5-6.3,7.6-6.3C195.9,8.1,199.3,10.7,199.3,14.7z M195.9,18.6v-0.5h-4.7c-2.8,0-3.9,1.2-3.9,3.3c0,1.6,1.5,2.8,3.4,2.8C193.9,24.1,195.9,22,195.9,18.6z"></path>
                    <path d="M207,17.9l-2.3,2.1v6.6h-3.5V0h3.5v15.6l8-7.2h4.5l-7.7,7.1l8.4,11.1h-4.3L207,17.9z"></path>
                    <path d="M243.2,11.4c-3.3,0-4.4,3-4.4,6.9v8.3h-3.5V8.4h3.5v3.5c0.8-2.4,2.3-3.5,4.8-3.5h2.2v3H243.2z"></path>
                    <path d="M230.4,20.7c-0.5,2.1-2.2,3.2-4.9,3.2c-3.2,0-5.4-2.4-5.7-5.8h13.9c0-0.3,0.1-0.9,0.1-1.4 c0-4.6-3-8.6-8.6-8.6c-5.6,0-8.8,4.2-8.8,9.3c0,5.1,3.5,9.5,9.2,9.5c4.1,0,7.2-2.1,8.2-5.3L230.4,20.7L230.4,20.7z M225.2,10.9 c3,0,4.9,1.8,5.1,4.6h-10.4C220.5,12.5,222.3,10.9,225.2,10.9z"></path>
                    <path d="M248.8,24.6L248.8,24.6c0,0.6-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.6,0.7c-0.3,0-0.6-0.1-0.9-0.2 c-0.3-0.1-0.5-0.3-0.7-0.5c-0.2-0.2-0.4-0.5-0.5-0.7c-0.1-0.3-0.2-0.6-0.2-0.9v0c0-0.3,0.1-0.6,0.2-0.9c0.1-0.3,0.3-0.5,0.5-0.7 c0.2-0.2,0.5-0.4,0.7-0.5c0.3-0.1,0.6-0.2,0.9-0.2c0.6,0,1.2,0.2,1.6,0.7C248.6,23.4,248.8,24,248.8,24.6z"></path>
                  </g>
                </svg>
              </div>

              <h4 className="mb-4 font-bold">
                Make an incredible logo <br />{" "}
                <span className="font-semibold italic">in minutes</span>
              </h4>
              <span className="mb-8 font-semibold">
                Pre-designed by top talent. Just add your touch.
              </span>
              <BasicButton
                text="Try Fiverr Logo Maker"
                className="logo-maker-btn"
              />
            </div>

            <div className="logo-maker-bg flex items-center">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1160,dpr_2.0/v1/attachments/generic_asset/asset/b49b1963f5f9008f5ff88bd449ec18f7-1608035772453/logo-maker-banner-wide-desktop-1352-2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="showcase">
        <div className="main-container">
          <div className="flex justify-between items-center mb-8">
            <h2>Inspiring work made on Fiverr</h2>
            <a href="/" className="see-more">
              See more <i class="fa-solid fa-chevron-right"></i>
            </a>
          </div>

          <BasicCarousel
            slideCount="4"
            backToTop={true}
            content={showcaseContent}
            slidesToScroll={4}
          />
        </div>
      </section>

      {/* Guides */}
      <section className="showcase guides">
        <div className="main-container">
          <div className="flex justify-between items-center mb-8">
            <h2>Guides to help you grow</h2>
            <a href="/" className="see-more">
              See more <i class="fa-solid fa-chevron-right"></i>
            </a>
          </div>

          <BasicCarousel
            slideCount="3"
            backToTop={false}
            content={guidesContent}
            slidesToScroll={1}
          />
        </div>
      </section>

      {/* Join now */}
      <section className="join-now">
        <div className="main-container">
          <div className="join-now-wrapper flex items-center">
            <div className="join-now-img">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png"
                alt=""
              />
            </div>

            <div className="join-now-text">
              <h3>Freelance services at your <br /> <span className="italic font-medium">fingertips!</span></h3>
              <BasicButton text="Join Fiverr" className="join-now-btn"/>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
