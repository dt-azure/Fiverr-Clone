import React from "react";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Footer from "../../layouts/Footer/Footer";
import "./profile.scss";
import ProfileDetails from "./ProfileDetails";
import AcceptedGigs from "./AcceptedGigs";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  return (
    <>
      <FixedHeader />
      <div className="profile">
        <div className="profile-container flex justify-between">
          <ProfileDetails />
          <AcceptedGigs />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Footer />
    </>
  );
};

export default Profile;
