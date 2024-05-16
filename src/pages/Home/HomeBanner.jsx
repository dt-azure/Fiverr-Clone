import { Carousel, Input } from "antd";
import React from "react";
import "./banner.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Search } = Input;

const HomeBanner = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="home__banner-container relative">
        <Carousel
          id="home__banner"
          dots={false}
          autoplay={false}
          autoplaySpeed={5000}
        >
          <div className="christina h-screen relative">
            <div className="model-tag flex items-center absolute">
              <div className="avatar mr-5">
                <img
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png"
                  alt=""
                  className="mx-auto"
                />
              </div>
              <div className="model-text">
                <div className="social flex justify-between items-center text-white">
                  <p>@jordanruncie_</p>
                  <p>
                    5 <i class="fa fa-star" aria-hidden="true"></i>
                  </p>
                </div>
                <div className="title text-white">
                  <p className="font-bold">Production Assistant</p>
                </div>
              </div>
            </div>
          </div>
          <div className="colin h-screen relative">
            <div className="model-tag flex">
              <div className="avatar"></div>
              <div className="model-text">
                <div className="flex justify-between">
                  <p>@jordanruncie_</p>
                  <p>
                    5<FontAwesomeIcon icon="fa-solid fa-star" />
                  </p>
                </div>
                <div className="title"></div>
              </div>
            </div>
          </div>
          <div className="jenny h-screen relative">
            <div className="model-tag flex">
              <div className="avatar"></div>
              <div className="model-text">
                <div className="flex justify-between">
                  <p>@jordanruncie_</p>
                  <p>
                    5<FontAwesomeIcon icon="fa-solid fa-star" />
                  </p>
                </div>
                <div className="title"></div>
              </div>
            </div>
          </div>
          <div className="jordan h-screen relative">
            <div className="model-tag flex">
              <div className="avatar"></div>
              <div className="model-text">
                <div className="flex justify-between">
                  <p>@jordanruncie_</p>
                  <p>
                    5<FontAwesomeIcon icon="fa-solid fa-star" />
                  </p>
                </div>
                <div className="title"></div>
              </div>
            </div>
          </div>
          <div className="scarlett h-screen relative">
            <div className="model-tag flex">
              <div className="avatar"></div>
              <div className="model-text">
                <div className="flex justify-between">
                  <p>@jordanruncie_</p>
                  <p>
                    5<FontAwesomeIcon icon="fa-solid fa-star" />
                  </p>
                </div>
                <div className="title"></div>
              </div>
            </div>
          </div>
        </Carousel>
        <div className="home__banner-text absolute">
          <div className="text-container">
            <h1 className="header text-white font-bold mb-10">
              Find the right <em>freelance</em> <br /> service, right away
            </h1>
            <Search
              placeholder="Search for any service..."
              allowClear
              enterButton
              size="large"
              onSearch={onSearch}
            />
            <div className="popular flex mt-10 text-white gap-5 items-center font-bold">
              <span>Popular: </span>
              <div className="flex gap-8">
                <ul className="flex gap-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="py-1 px-3 border-2 rounded-full flex items-center"
                    >
                      Website Design
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="py-1 px-3 border-2 rounded-full flex items-center"
                    >
                      WordPress
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="py-1 px-3 border-2 rounded-full flex items-center"
                    >
                      Logo Design
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="py-1 px-3 border-2 rounded-full flex items-center"
                    >
                      AI Services
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trusted container">
        <div className="flex items-center justify-center gap-8">
          <span>Trusted by:</span>
          <ul className="trusted__list flex items-center justify-center">
            <li>
              <picture className="trusted__logo">
                <source
                  media="(min-width: 900px)"
                  srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta2x.b364aec.png 2x"
                />
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
                  alt=""
                />
              </picture>
            </li>

            <li>
              <picture className="trusted__logo">
                <source
                  media="(min-width: 900px)"
                  srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google2x.4fa6c20.png 2x"
                />
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
                  alt=""
                />
              </picture>
            </li>

            <li>
              <picture className="trusted__logo">
                <source
                  media="(min-width: 900px)"
                  srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix2x.6b36ad6.png 2x"
                />
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
                  alt=""
                />
              </picture>
            </li>

            <li>
              <picture className="trusted__logo">
                <source
                  media="(min-width: 900px)"
                  srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg2x.0d06f7b.png 2x"
                />
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
                  alt=""
                />
              </picture>
            </li>

            <li>
              <picture className="trusted__logo">
                <source
                  media="(min-width: 900px)"
                  srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal2x.d2fa54d.png 2x"
                />
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
                  alt=""
                />
              </picture>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
