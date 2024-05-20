import React, { useEffect, useRef, useState } from "react";
import BasicButton from "../../components/Button/BasicButton";
import { Button, Modal, Popover } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";
import { manageUserServ } from "../../services/manageUser";
import { notifyErrBasic, notifySuccess } from "../../utils/util";

const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState({ url: "", file: null });

  const generateDescItem = (text) => {
    return (
      <div className="desc-item flex items-center gap-4">
        {text}
        <Popover
          content={
            <div className="profile-popover">
              <p>Edit</p>
            </div>
          }
          trigger="hover"
          id="profile-popover"
        >
          <Button>
            <i class="fa-solid fa-pen"></i>
          </Button>
        </Popover>
        <Popover
          content={
            <div className="profile-popover">
              <p>Delete</p>
            </div>
          }
          trigger="hover"
          id="profile-popover"
        >
          <Button>
            <i class="fa-solid fa-trash-can"></i>
          </Button>
        </Popover>
      </div>
    );
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    // Reset input
    document.getElementById("avatar-input").value = "";
    setCurrentAvatar({ url: "", file: null });
    setModalOpen(false);
  };

  const handleAvatarChange = (e) => {
    let avatarURL =
      e.target.files.length != 0 ? URL.createObjectURL(e.target.files[0]) : "";
    setCurrentAvatar({ url: avatarURL, file: e.target.files[0] });
  };

  const handleGetProfileData = async () => {
    try {
      dispatch(handleLoadingOn());
      const res = await manageUserServ.getUserDataById(profileId);
      setProfile(res.data.content);
      // setCurrentAvatar(res.data.content.avatar);
    } catch (err) {
      // notifyErrBasic();
    } finally {
      dispatch(handleLoadingOff());
    }
  };

  const handleUpdateAvatar = async () => {
    let formData = new FormData();

    formData.append("formFile", currentAvatar.file);

    try {
      await manageUserServ.updateAvatar(formData);
      notifySuccess("Avatar updated successfully.");

      // Set displayed avatar to the new one
      setProfile({ ...profile, avatar: currentAvatar.url });
      setTimeout(() => {
        setModalOpen(false);
      }, "2000");
    } catch (err) {
      notifyErrBasic();
    }
  };

  useEffect(() => {
    handleGetProfileData();
  }, [profileId]);

  if (!profile) {
    return <span>Profile does not exist.</span>;
  }

  return (
    <>
      <div className="profile-details space-y-8">
        <div className="top profile-section flex flex-col justify-center items-center">
          <div
            className="avatar flex items-center"
            onClick={() => {
              showModal();
            }}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="" />
            ) : (
              <div className="default-avatar"></div>
            )}
            <div className="camera-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5.8182C6.29294 5.8182 4.90909 7.20205 4.90909 8.90911C4.90909 10.6162 6.29294 12 8 12C9.70706 12 11.0909 10.6162 11.0909 8.90911C11.0909 7.20205 9.70706 5.8182 8 5.8182Z"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.45455 15.2727C1.06878 15.2727 0.698807 15.1195 0.426027 14.8467C0.153246 14.5739 0 14.204 0 13.8182V4.36366C0 3.97789 0.153246 3.60792 0.426027 3.33514C0.698807 3.06236 1.06878 2.90911 1.45455 2.90911H4.36364L5.81818 0.727295H10.1818L11.6364 2.90911H14.5455C14.9312 2.90911 15.3012 3.06236 15.574 3.33514C15.8468 3.60792 16 3.97789 16 4.36366V13.8182C16 14.204 15.8468 14.5739 15.574 14.8467C15.3012 15.1195 14.9312 15.2727 14.5455 15.2727H1.45455ZM3.81818 8.90911C3.81818 6.59956 5.69045 4.72729 8 4.72729C10.3096 4.72729 12.1818 6.59956 12.1818 8.90911C12.1818 11.2187 10.3096 13.0909 8 13.0909C5.69045 13.0909 3.81818 11.2187 3.81818 8.90911ZM2.90909 5.09093C2.90909 5.49259 2.58348 5.8182 2.18182 5.8182C1.78016 5.8182 1.45455 5.49259 1.45455 5.09093C1.45455 4.68927 1.78016 4.36366 2.18182 4.36366C2.58348 4.36366 2.90909 4.68927 2.90909 5.09093Z"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <span className="profile-name">{profile.name}</span>
            <i class="fa-regular fa-pen-to-square"></i>
            <div className="profile-tag">
              <span>NEW</span>
            </div>
          </div>

          <span className="email">{profile.email}</span>

          <BasicButton
            text="Preview Fiverr Profile"
            className="preview-btn w-full"
          />

          <div className="basic-info w-full space-y-4">
            <div className="flex justify-between items-center">
              <span>
                <i class="fa-solid fa-location-dot"></i>
                From
              </span>

              <span className="font-bold">Vietnam</span>
            </div>

            <div className="flex justify-between items-center">
              <span>
                <i class="fa-solid fa-user-large"></i>
                Member since
              </span>

              <span className="font-bold">May 2024</span>
            </div>
          </div>
        </div>

        <div className="learn profile-section flex flex-col items-center">
          <div className="learn-logo">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg"
              alt=""
            />
          </div>

          <div>
            <img
              src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/fiverr_learn/enroll-icon.69b770f.svg"
              alt=""
            />
          </div>

          <span>Earn badges and stand out</span>
          <span>Boost your sales, by boosting your expertise.</span>

          <BasicButton text="Enroll Now" className="enroll-btn" />
        </div>

        <div className="bottom profile-section">
          {/* Description */}
          <div className="desc-wrapper">
            <div className="desc-header flex items-center justify-between">
              <h3>Description</h3>
              <span className="add-btn">Edit Description</span>
            </div>

            <div className="desc-details">
              {profile.description ? profile.description : ""}
            </div>

            <div className="desc-input"></div>
          </div>

          {/* Languages */}
          <div className="desc-wrapper">
            <div className="desc-header flex items-center justify-between">
              <h3>Languages</h3>
              <span className="add-btn">Add New</span>
            </div>

            <div className="desc-details">
              {profile.languages
                ? profile.languages.map((item) => {
                    generateDescItem(item);
                  })
                : ""}
            </div>

            <div className="desc-input"></div>
          </div>

          {/* Skills */}
          <div className="desc-wrapper">
            <div className="desc-header flex items-center justify-between">
              <h3>Skills</h3>
              <span className="add-btn">Add New</span>
            </div>

            <div className="desc-details">
              {profile.skill
                ? profile.skill.map((item) => {
                    generateDescItem(item);
                  })
                : ""}
            </div>

            <div className="desc-input"></div>
          </div>

          {/* Education */}
          <div className="desc-wrapper">
            <div className="desc-header flex items-center justify-between">
              <h3>Education</h3>
              <span className="add-btn">Add New</span>
            </div>

            <div className="desc-details">
              {profile.education
                ? profile.education.map((item) => {
                    generateDescItem(item);
                  })
                : ""}
            </div>

            <div className="desc-input"></div>
          </div>

          {/* Certification */}
          <div className="desc-wrapper">
            <div className="desc-header flex items-center justify-between">
              <h3>Certification</h3>
              <span className="add-btn">Add New</span>
            </div>

            <div className="desc-details">
              {profile.certification
                ? profile.certification.map((item) => {
                    generateDescItem(item);
                  })
                : ""}
            </div>

            <div className="desc-input"></div>
          </div>
        </div>
      </div>

      {/* Avatar upload modal */}
      <Modal open={modalOpen} footer={null} onCancel={handleCancel}>
        <div className="profile-modal-wrapper">
          <div className="modal-item">
            <div className="avatar-container flex items-center justify-center">
              {currentAvatar.url == "" ? (
                profile.avatar == "" ? (
                  <div className="placeholder-avatar"></div>
                ) : (
                  <img src={profile.avatar}></img>
                )
              ) : (
                <img src={currentAvatar.url}></img>
              )}
            </div>
            <div className="input-wrapper flex-1 flex justify-center">
              <input
                id="avatar-input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className="btn-field flex justify-end">
            <button
              type="submit"
              className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
              onClick={() => {
                if (currentAvatar.url != "") {
                  handleUpdateAvatar();
                }
              }}
            >
              Update Avatar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileDetails;
