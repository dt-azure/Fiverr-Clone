import React from "react";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Footer from "../../layouts/Footer/Footer";
import "./profile.scss";
import ProfileDetails from "./ProfileDetails";
import AcceptedGigs from "./AcceptedGigs";

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
      <Footer />
    </>
  );
};

export default Profile;
