import React, { useEffect, useState } from "react";
import "animate.css";
import { Popover } from "antd";
import { exploreText, fiverrProText } from "./headerText";
import "./header.scss";
import Search from "antd/es/input/Search";
import { getLocalStorage, removeLocalStorage } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { manageGigServ } from "../../services/manageGig";

const FixedHeader = () => {
  const userLocal = getLocalStorage("user");
  const avatar = userLocal ? userLocal.data.content.user.avatar : null;
  const navigate = useNavigate();
  const urlCheck = new RegExp("(profile)");
  const [menuItems, setMenuItems] = useState([]);

  const handleToggleMenu = (id) => {
    document
      .querySelector(`#${id} i`)
      .classList.toggle("navbar__dropdown-closed");
  };

  const handleLogOut = () => {
    removeLocalStorage("user");
    if (urlCheck.test(window.location)) {
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  const handleGetMenuItems = async () => {
    try {
      const res = await manageGigServ.getMenuItems();
      setMenuItems(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (input) => {
    navigate(`/gigs?query=${input}&page=1`);
  };

  useEffect(() => {
    handleGetMenuItems();
  }, []);

  return (
    <header className="home__navbar fixed">
      <div className="navbar__container flex justify-between items-center text-white px-24 pt-4 pb-6">
        <div
          className="navbar__logo cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            width="89"
            height="27"
            viewBox="0 0 89 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="main-logo">
              <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
            </g>
            <g fill="#1dbf73">
              <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
            </g>
          </svg>
        </div>
        <div className="search-box">
          <Search
            placeholder="What service are you looking for today?"
            onSearch={handleSearch}
            enterButton
          />
        </div>

        {userLocal ? (
          <nav className="navbar__links signed-in">
            <ul className="flex items-center gap-8 font-semibold">
              <li>
                <div>
                  <Popover
                    id="nav-popover"
                    trigger="hover"
                    content={<p>Notifications</p>}
                    // placement="bottomLeft"
                    arrow={true}
                  >
                    <button className="navbar__links-btn flex items-center justify-center">
                      <i className="fa-regular fa-bell"></i>
                    </button>
                  </Popover>
                </div>
              </li>

              <li>
                <div>
                  <Popover
                    id="nav-popover"
                    trigger="hover"
                    content={<p>Messages</p>}
                    // placement="bottomLeft"
                    arrow={true}
                  >
                    <button className="navbar__links-btn flex items-center justify-center">
                      <i className="fa-solid fa-envelope"></i>
                    </button>
                  </Popover>
                </div>
              </li>

              <li>
                <div>
                  <Popover
                    id="nav-popover"
                    trigger="hover"
                    content={<p>Lists</p>}
                    // placement="bottomLeft"
                    arrow={true}
                  >
                    <button className="navbar__links-btn flex items-center justify-center">
                      <i className="fa-regular fa-heart"></i>
                    </button>
                  </Popover>
                </div>
              </li>

              <li>
                <span className="text-lg cursor-pointer nav-order-btn">
                  Orders
                </span>
              </li>

              <li>
                <div>
                  <Popover
                    id="nav-popover-avatar"
                    trigger="click"
                    content={
                      <ul>
                        <li
                          key="1"
                          onClick={() => {
                            navigate(
                              `/profile/${userLocal.data.content.user.id}`
                            );
                          }}
                        >
                          Profile
                        </li>
                        <li key="2">Post a Request</li>
                        <li key="3" className="highlight">
                          Refer a Friend
                        </li>
                        <li key="4" className="divider"></li>
                        <li key="5">Become a Seller</li>
                        <li key="6">Settings</li>
                        <li key="7">Billing & Payments</li>
                        <li key="8" className="divider"></li>
                        <li key="9" className="flex items-center">
                          <span className="mr-2">English</span>
                          <i className="fa-solid fa-earth-americas mt-1"></i>
                        </li>
                        <li key="10">$ USD</li>
                        <li key="11">Help & Support</li>
                        <li key="12" className="divider"></li>
                        <li
                          key="13"
                          className="flex items-center justify-between"
                        >
                          <span className="mr-4">Invite your team</span>
                          <a className="flex items-center justify-center">
                            FIVERR PRO
                          </a>
                        </li>
                        <li key="1" onClick={handleLogOut}>
                          Logout
                        </li>
                      </ul>
                    }
                    placement="bottomRight"
                    arrow={false}
                  >
                    <div className="nav-avatar">
                      {avatar == "" ? (
                        <div className="placeholder-avatar"></div>
                      ) : (
                        <img src={avatar} alt="" />
                      )}
                    </div>
                  </Popover>
                </div>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="navbar__links">
            <ul className="flex items-center gap-8 font-semibold">
              <li key="1">
                <div>
                  <Popover
                    trigger="click"
                    content={fiverrProText}
                    placement="bottomLeft"
                    arrow={false}
                  >
                    <button
                      id="fiverr-pro"
                      onClick={() => {
                        handleToggleMenu("fiverr-pro");
                      }}
                      className=""
                    >
                      Fiverr Pro
                      <i className="fa-solid fa-chevron-down ml-4 .navbar__dropdown-closed"></i>
                    </button>
                  </Popover>
                </div>
              </li>
              <li key="1">
                <div>
                  <Popover
                    id="navbar__explore"
                    trigger="click"
                    content={exploreText}
                    placement="bottomLeft"
                    arrow={false}
                  >
                    <button
                      id="explore"
                      onClick={() => {
                        handleToggleMenu("explore");
                      }}
                    >
                      Explore
                      <i className="fa-solid fa-chevron-down ml-4 .navbar__dropdown-closed"></i>
                    </button>
                  </Popover>
                </div>
              </li>
              <li key="2" className="cursor-pointer">
                English
              </li>
              <li key="3" className="cursor-pointer">
                Become a Seller
              </li>
              <li
                key="4"
                className="cursor-pointer"
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Sign In
              </li>
              <li
                key="5"
                className="cursor-pointer py-2 px-4 join-btn"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Join
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="categories-menu px-1">
        <ul className="flex">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a href="/">{item.tenLoaiCongViec}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default FixedHeader;
