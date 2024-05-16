import React, { useEffect, useState } from "react";
import "./gigInfo.scss";
import { Collapse, Rate, Tabs } from "antd";
import BasicButton from "../../components/Button/BasicButton";
import TextArea from "antd/es/input/TextArea";
import Comments from "./Comments";

const GigInfo = ({ gigDetails }) => {
  const tabItem = (
    <div className="package-details">
      <div className="flex justify-between items-center">
        <span>Standard</span>
        <span>$350</span>
      </div>

      <div className="package-desc">
        5 Pages Fully Responsive Webflow Website - CMS & Medium interactions.
      </div>

      <div className="flex items-center font-bold">
        <i class="fa-regular fa-clock"></i>
        <span>6-day delivery</span>
        <i class="fa-solid fa-arrows-rotate"></i>
        <span>Unlimited Revisions</span>
      </div>

      <button className="package-btn flex items-center justify-center w-full">
        Continue
        <i class="fa-solid fa-arrow-right"></i>
      </button>

      <p className="text-xs text-center cursor-pointer">Compare packages</p>
    </div>
  );

  return (
    <div className="main-container gig-page flex justify-between">
      <div className="main">
        <div className="breadcrumb mb-8">
          <span className="flex items-center gap-2">
            <a>{gigDetails.tenLoaiCongViec}</a>{" "}
            <i class="fa-solid fa-chevron-right"></i>{" "}
            <a>{gigDetails.tenNhomChiTietLoai}</a>{" "}
            <i class="fa-solid fa-chevron-right"></i>{" "}
            <a>{gigDetails.tenChiTietLoai}</a>
          </span>
        </div>
        <div className="gig-details">
          <div className="title">
            <h2>{gigDetails.congViec.tenCongViec}</h2>
          </div>
          <div className="gig-seller flex items-center">
            <div className="seller-avatar">
              <img src={gigDetails.avatar} alt="" />
            </div>

            <div className="seller-details flex flex-col justify-around">
              <h4>{gigDetails.tenNguoiTao}</h4>
              <div className="rating flex gap-4">
                <Rate disabled defaultValue={gigDetails.congViec.saoCongViec} />
                <div className="separator"></div>
                <a href="/">
                  (<span>{gigDetails.congViec.danhGia}</span>)
                </a>
              </div>
            </div>
          </div>

          <div className="preview flex items-center justify-center">
            <img src={gigDetails.congViec.hinhAnh} />
          </div>

          <div className="gig-desc">
            <h3 className="gig-header">About this gig</h3>
            <div className="desc">{gigDetails.congViec.moTa}</div>
          </div>

          <div className="gig-seller-bottom">
            <h3 className="gig-header">Get to know {gigDetails.tenNguoiTao}</h3>
            <div className="gig-seller flex items-center">
              <div className="seller-avatar">
                <img src={gigDetails.avatar} alt="" />
              </div>

              <div className="seller-details flex flex-col justify-around">
                <h4>{gigDetails.tenNguoiTao}</h4>
                <div className="rating flex gap-4">
                  <Rate
                    disabled
                    defaultValue={gigDetails.congViec.saoCongViec}
                  />
                  <div className="separator"></div>
                  <a href="/">
                    (<span>{gigDetails.congViec.danhGia}</span>)
                  </a>
                </div>
              </div>
            </div>
            <BasicButton text="Contact me" />
          </div>

          <div className="faq">
            <h3 className="gig-header">FAQ</h3>

            <Collapse
              accordion
              items={[
                {
                  key: "1",
                  label:
                    "What information do I need to provide you to get started?",
                  children: (
                    <p>
                      I need your contents and other relevant files such as
                      images, text, logo, documents, website references. Also, I
                      need your Webflow credentials.
                    </p>
                  ),
                },
                {
                  key: "2",
                  label: "What about Responsive Design?",
                  children: (
                    <p>
                      It’s really important cause every user nowadays uses the
                      smartphone for visiting any website, that's why responsive
                      design needs to have a clear and excellent appearance. No
                      worries, I have great experience with responsive design.
                    </p>
                  ),
                },
                {
                  key: "3",
                  label: "Do you offer discounts?",
                  children: (
                    <p>
                      Yes, I offer discounted rates to those with big or
                      multiple projects.
                    </p>
                  ),
                },
                {
                  key: "4",
                  label:
                    "Can you convert Figma, xd and sketch design into Webflow?",
                  children: (
                    <p>
                      Yes, I can convert Figma, xd and sketch design into
                      Webflow.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          {/* <div className="comments">Text</div> */}
          <Comments />

          <div className="comments-input flex gap-2">
            <div className="user-avatar">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/129c0b6148f0a2bcb3ad82a3639d58de-1649589210201/80745c5a-8c7d-4ca1-a5d6-fbfb9a04a857.jpg"
                alt=""
              />
            </div>
            <div className="text-field w-full">
              <TextArea rows={4} />
              <BasicButton text="Add Comment" />
            </div>
          </div>
        </div>
      </div>
      <div className="side-bar">
        <Tabs
          centered
          items={[
            {
              key: "1",
              label: "Basic",
              children: (
                <div className="package-details">
                  <div className="flex justify-between items-center">
                    <span>Basic</span>
                    <span>${gigDetails.congViec.giaTien}</span>
                  </div>

                  <div className="package-desc">
                    {gigDetails.congViec.moTaNgan}
                  </div>

                  <div className="flex items-center font-bold">
                    <i class="fa-regular fa-clock"></i>
                    <span>6-day delivery</span>
                    <i class="fa-solid fa-arrows-rotate"></i>
                    <span>Unlimited Revisions</span>
                  </div>

                  <button className="package-btn flex items-center justify-center w-full">
                    Continue
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>

                  <p className="text-xs text-center cursor-pointer">
                    Compare packages
                  </p>
                </div>
              ),
            },
            {
              key: "2",
              label: "Standard",
              children: (
                <div className="package-details">
                  <div className="flex justify-between items-center">
                    <span>Standard</span>
                    <span>${gigDetails.congViec.giaTien}</span>
                  </div>

                  <div className="package-desc">
                    {gigDetails.congViec.moTaNgan}
                  </div>

                  <div className="flex items-center font-bold">
                    <i class="fa-regular fa-clock"></i>
                    <span>6-day delivery</span>
                    <i class="fa-solid fa-arrows-rotate"></i>
                    <span>Unlimited Revisions</span>
                  </div>

                  <button className="package-btn flex items-center justify-center w-full">
                    Continue
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>

                  <p className="text-xs text-center cursor-pointer">
                    Compare packages
                  </p>
                </div>
              ),
            },
            {
              key: "3",
              label: "Premium",
              children: (
                <div className="package-details">
                  <div className="flex justify-between items-center">
                    <span>Premium</span>
                    <span>${gigDetails.congViec.giaTien}</span>
                  </div>

                  <div className="package-desc">
                    {gigDetails.congViec.moTaNgan}
                  </div>

                  <div className="flex items-center font-bold">
                    <i class="fa-regular fa-clock"></i>
                    <span>6-day delivery</span>
                    <i class="fa-solid fa-arrows-rotate"></i>
                    <span>Unlimited Revisions</span>
                  </div>

                  <button className="package-btn flex items-center justify-center w-full">
                    Continue
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>

                  <p className="text-xs text-center cursor-pointer">
                    Compare packages
                  </p>
                </div>
              ),
            },
          ]}
          defaultActiveKey="2"
        />

        <div className="contact-btn">
          <button
            className="flex items-center justify-center w-full"
            onClick={() => {
              document
                .querySelector(".contact-btn")
                .classList.toggle("expanded");
            }}
          >
            Contact me <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div className="contact-content space-y-2">
            <h3>How can I help?</h3>
            <div className="contact-item flex items-center justify-between py-2 px-4">
              <div className="contact-icon flex items-center justify-center">
                <i class="fa-regular fa-file-lines"></i>
              </div>
              <span>Get a quote</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
            <div className="contact-item flex items-center justify-between py-2 px-4">
              <div className="contact-icon flex items-center justify-center">
                <i class="fa-regular fa-comment-dots"></i>
              </div>
              <span>Ask a question</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="highly-responsive flex items-center">
          <i class="fa-solid fa-bolt"></i>
          <div className="flex flex-col justify-around">
            <span>Highly responsive!</span>
            <span>Known for exceptionally quick replies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigInfo;
