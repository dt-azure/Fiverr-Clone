import { Button, Modal, Popover, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { manageUserServ } from "../../services/manageUser";
import {
  formatDate,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util.js";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEnableUpdateBtn,
  handleSelectUser,
} from "../../redux/slice/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const ManageUsers = () => {
  const [userList, setUserList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const searchRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isEdit, setIsEdit] = useState(false);
  // const [currentAvatar, setCurrentAvatar] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      width: 150,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
    },
  ];

  // Generating HTML element for each row of the user list table
  const generateRow = (user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: formatDate(user.birthday),
      avatar: (
        <div className="dashboard-avatar flex items-center justify-center">
          {user.avatar == "" ? (
            <div className="placeholder-avatar"></div>
          ) : (
            <img src={user.avatar}></img>
          )}
        </div>
      ),
      gender: user.gender ? "Male" : "Female",
      role: user.role,
      skillsAndCert: [user.skill, user.certification],
      action: (
        <div className="dashboard-action flex items-center gap-4">
          <Popover
            content={<div className="text-green-600">Edit Info</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                handleEditUserClick(user);
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-red-600">Delete User</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                handleDeleteUser(user.id);
              }}
            >
              <i className="fa-solid fa-trash text-red-500 hover:text-red-600"></i>
            </Button>
          </Popover>
        </div>
      ),
    };
  };

  // Take items from skills/cert list and format them into 1 str
  const formatStr = (list) => {
    let result = "";
    list.map((item) => {
      result += item + ", ";
    });
    return result.slice(0, -2);
  };

  // Generate the HTML element for skill/cert expanded section
  const generateSkillSection = (item) => (
    <div className="m-0">
      <div className="skills flex items-center">
        <span className="mr-4 font-bold">Skills:</span>
        {formatStr(item[0])}
      </div>
      <div className="cert flex items-center">
        <span className="mr-4 font-bold">Certifications:</span>
        {formatStr(item[1])}
      </div>
    </div>
  );

  // Handle table pagination
  const handleTableChange = async (pagination, sorter) => {
    if (pagination.current * pagination.pageSize > userList.length) {
      await manageUserServ
        .getUserDataWithPagination(
          "1",
          pagination.current * pagination.pageSize,
          searchKeyword
        )
        .then((res) => {
          const newUserList = [];
          res.data.content.data.slice(userList.length).map((item) => {
            let newRow = generateRow(item);
            newUserList.push(newRow);
          });
          const newList = [...userList].concat(newUserList);
          // console.log(newList);
          setUserList(newList);
          setTableLoading(false);
        })
        .catch((err) => {
          notifyErr("An error has occurred.");
        });
    }

    setTableParams({
      ...pagination,
      pagination: {
        total: pagination.total,
      },
    });
  };

  // API call to get user data
  const handleGetUserData = async (
    pageIndex = "",
    pageSize = "",
    keyword = ""
  ) => {
    try {
      setTableLoading(true);
      const users = await manageUserServ.getUserDataWithPagination(
        pageIndex,
        pageSize,
        keyword
      );

      let newUserList = [];
      await users.data.content.data.map((item) => {
        let newRow = generateRow(item);
        newUserList.push(newRow);
      });

      setUserList(newUserList);
      setTableParams({
        ...tableParams,
        pagination: {
          // current: 1,
          // pageSize: 10,
          total: users.data.content.totalRow,
        },
      });
      setTableLoading(false);
    } catch (err) {
      notifyErr("An error has occurred.");
      setTableLoading(false);
    }
  };

  // Handle API call with search keyword when search button is pressed
  const onSearch = (value, _e, info) => {
    setSearchKeyword(value);
  };

  // Reset table when search input field is empty
  const onSearchChange = () => {
    if (searchRef.current.input.value == "") {
      setSearchKeyword("");
      setUserList([]);

      handleGetUserData("1", "10", "");
    }
  };

  // API call to delete user
  const handleDeleteUser = async (id) => {
    try {
      await manageUserServ.deleteUser(id);
      notifySuccess("User deleted successfully.");

      // Update table with a new API call, keyword used to make sure current view is not changed
      setUserList([]);
      handleGetUserData("1", "10", searchKeyword);
    } catch (err) {
      notifyErr("An error has occurred.");
    }
  };

  // const handleUpdateAvatar = async (avatar) => {
  //   let formData = new FormData();

  //   formData.append("File", avatar);
  //   console.log(formData)
  //   try {
  //     await manageUserServ.updateAvatar(formData);
  //     setIsEdit(true);
  //     notifySuccess("Avatar updateds successfully.");
  //   } catch (err) {
  //     console.log(err);
  //     notifyErrBasic();
  //   }
  // };

  // Pass selected user's info to store then redirect to manage user page when update button is pressed
  const handleEditUserClick = async (user) => {
    dispatch(handleSelectUser(user));
    dispatch(handleEnableUpdateBtn());
    navigate(`../manage-user/${user.id}`);
  };

  // const showModal = () => {
  //   setModalOpen(true);
  // };

  // const handleCancel = () => {
  //   if (isEdit) {
  //     handleGetUserData(
  //       tableParams.current,
  //       tableParams.pageSize,
  //       searchKeyword
  //     );
  //     setIsEdit(false);
  //   }

  //   // Reset input
  //   document.getElementById("avatar-input").value = "";
  //   setCurrentAvatar("");
  //   setModalOpen(false);
  // };

  useEffect(() => {
    handleGetUserData("1", "10");

    return () => {
      setSearchKeyword("");
    };
  }, []);

  useEffect(() => {
    setUserList([]);
    handleGetUserData("1", "10", searchKeyword);
  }, [searchKeyword]);

  return (
    <div>
      <h2 className="dashboard-title">User List</h2>
      <Search
      id="admin-search"
        placeholder="Search by account name"
        allowClear
        onSearch={onSearch}
        onChange={onSearchChange}
        ref={searchRef}
      />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) =>
            generateSkillSection(record.skillsAndCert),
        }}
        scroll={{
          x: 1500,
          y: window.innerHeight * 0.5,
          scrollToFirstRowOnChange: false,
        }}
        loading={tableLoading}
        pagination={tableParams.pagination}
        dataSource={userList}
        onChange={handleTableChange}
      />
      {/* <Modal open={modalOpen} footer={null} onCancel={handleCancel}>
        <div className="admin-modal-wrapper">
          <div className="flex modal-item items-center">
            <div className="dashboard-avatar flex items-center justify-center">
              {currentAvatar.url == "" ? (
                <div className="placeholder-avatar"></div>
              ) : (
                <img src={currentAvatar.url}></img>
              )}
            </div>
            <div className="input-wrapper flex-1">
              <input
                id="avatar-input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => {
                  let avatarURL =
                    e.target.files.length != 0
                      ? URL.createObjectURL(e.target.files[0])
                      : "";
                  setCurrentAvatar({ url: avatarURL, file: e.target.files[0] });
                }}
              />
            </div>
          </div>

          <div className="btn-field flex justify-end">
            <button
              type="submit"
              className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
              onClick={() => {
                if (currentAvatar) {
                  handleUpdateAvatar(currentAvatar.file);
                }
              }}
            >
              Update Avatar
            </button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default ManageUsers;
