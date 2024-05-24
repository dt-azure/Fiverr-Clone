import { Button, Modal, Popover, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";
import { current } from "@reduxjs/toolkit";
import { notifyErr, notifyErrBasic, notifySuccess } from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageGigs = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [gigList, setGigList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchRef = useRef();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Gig Name",
      dataIndex: "tenCongViec",
      key: "tenCongViec",
      //   width: 150,
    },
    {
      title: "Seller ID",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      width: 100,
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
    setFieldValue,
    handleReset,
    resetForm,
    setErrors,
  } = useFormik({
    initialValues: {
      nguoiTao: "",
      tenCongViec: "",
      giaTien: "",
      moTa: "",
      moTaNgan: "",
      saoCongViec: "",
      danhGia: "",
    },
    onSubmit: async () => {
      if (isUpdate) {
        try {
          await manageGigServ.updateGig(selectedGig, {
            ...values,
            id: selectedGig.id,
          });
          setIsEdit(true);
          notifySuccess("Gig updated successfully.");
        } catch (err) {
          notifyErrBasic();
        }
      } else {
        try {
          let newGig = { ...values, hinhAnh: "" };
          await manageGigServ.addGig(newGig);
          setIsEdit(true);
          notifySuccess("Gig added successfully.");
        } catch (err) {
          notifyErrBasic();
        }
      }
    },
    validationSchema: Yup.object({
      nguoiTao: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
      tenCongViec: Yup.string().required("Field is required"),
      moTa: Yup.string().required("Field is required"),
      moTaNgan: Yup.string().required("Field is required"),
      giaTien: Yup.number()
        .typeError("Invalid number.")
        .required("Field is required."),
      saoCongViec: Yup.number()
        .typeError("Rating must be a number between 0 and 5.")
        .required("Field is required.")
        .min(0, "Rating must be from 0 to 5.")
        .max(5, "Rating must be from 0 to 5."),
      danhGia: Yup.number()
        .typeError("Invalid number.")
        .required("Field is required."),
    }),
  });

  const generateRow = (gig) => {
    return {
      id: gig.id,
      tenCongViec: gig.tenCongViec,
      nguoiTao: gig.nguoiTao,
      giaTien: gig.giaTien,
      action: (
        <div className="dashboard-action flex items-center gap-4">
          <Popover
            content={<div className="text-green-600">Edit Info</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                setSelectedGig(gig);
                setIsUpdate(true);
                setValues({
                  nguoiTao: gig.nguoiTao,
                  tenCongViec: gig.tenCongViec,
                  giaTien: gig.giaTien,
                  moTa: gig.moTa,
                  moTaNgan: gig.moTaNgan,
                  saoCongViec: gig.saoCongViec,
                  danhGia: gig.danhGia,
                });
                setModalOpen(true);
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-black">Update Picture</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                setCurrentAvatar({ gigId: gig.id, url: gig.hinhAnh, file: null });
                setAvatarModalOpen(true)
              }}
            >
              <i class="fa-solid fa-camera"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-red-600">Delete Gig</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                handleDeleteGig(gig.id);
              }}
            >
              <i className="fa-solid fa-trash text-red-500 hover:text-red-600"></i>
            </Button>
          </Popover>
        </div>
      ),
    };
  };

  //   API call to get gig data
  const handleGetGigData = async (
    pageIndex = "",
    pageSize = "",
    keyword = ""
  ) => {
    try {
      setTableLoading(true);
      const gigs = await manageGigServ.getGigDataWithPagination(
        pageIndex,
        pageSize,
        keyword
      );

      let newGigList = [];
      await gigs.data.content.data.map((item) => {
        let newRow = generateRow(item);
        newGigList.push(newRow);
      });

      setGigList(newGigList);
      setTableParams({
        ...tableParams,
        pagination: {
          total: gigs.data.content.totalRow,
        },
      });

      setTableLoading(false);
    } catch (err) {
      notifyErr("An error has occurred.");
      setTableLoading(false);
    }
  };

  const handleDeleteGig = async (gigId) => {
    try {
      await manageGigServ.deleteGig(gigId);
      //   handleGetGigData();
      setGigList([]);

      handleGetGigData(
        "1",
        tableParams.current * tableParams.pageSize,
        searchKeyword
      );
      notifySuccess("Gig deleted successfully.");
    } catch (err) {
      notifyErrBasic();
    }
  };

  const handleUpdateAvatar = async (gigId, avatar) => {
    let formData = new FormData();

    formData.append("formFile", avatar);
    console.log(formData)
    try {
      await manageGigServ.updateGigPhoto(gigId, formData)
      setIsEdit(true);
      notifySuccess("Avatar updateds successfully.");
    } catch (err) {
      console.log(err);
      notifyErrBasic();
    }
  };

  const handleTableChange = async (pagination, sorter) => {
    if (pagination.current * pagination.pageSize > gigList.length) {
      await manageGigServ
        .getGigDataWithPagination(
          "1",
          pagination.current * pagination.pageSize
          //   searchKeyword
        )
        .then((res) => {
          const newGigList = [];
          res.data.content.data.slice(gigList.length).map((item) => {
            let newRow = generateRow(item);
            newGigList.push(newRow);
          });

          const newList = [...gigList].concat(newGigList);
          // console.log(newList);
          setGigList(newList);
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

  // Handle API call with search keyword when search button is pressed
  const onSearch = (value, _e, info) => {
    setSearchKeyword(value);
  };

  // Reset table when search input field is empty
  const onSearchChange = () => {
    if (searchRef.current.input.value == "") {
      setSearchKeyword("");
      setGigList([]);

      handleGetGigData("1", "10", "");
    }
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    // Pull the data again if user added new categories/ updated existing ones
    // Pulling from page 1 upto current number of items + new additions to avoid changing order of the data
    if (isEdit) {
      handleGetGigData(
        "1",
        tableParams.current * tableParams.pageSize + 1,
        searchKeyword
      );
      setIsEdit(false);
    }

    // Reset input when modal closed
    resetForm();
    setSelectedGig({});
    document.getElementById("avatar-input").value = ""
    setCurrentAvatar("")

    setModalOpen(false);
    setAvatarModalOpen(false)
  };

  useEffect(() => {
    handleGetGigData("1", "10");

    // return () => {
    //   setSearchKeyword("");
    // };
  }, []);

  useEffect(() => {
    setGigList([]);
    handleGetGigData("1", "10", searchKeyword);
  }, [searchKeyword]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="dashboard-title">Gig List</h2>
        <button
          className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
          onClick={() => {
            setIsUpdate(false);
            showModal();
          }}
        >
          Add Gig
        </button>
      </div>
      <Search
        placeholder="Search by gig name"
        allowClear
        onSearch={onSearch}
        onChange={onSearchChange}
        ref={searchRef}
      />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        scroll={{
          //   x: 1500,
          y: window.innerHeight * 0.5,
          scrollToFirstRowOnChange: false,
        }}
        loading={tableLoading}
        pagination={tableParams.pagination}
        dataSource={gigList}
        onChange={handleTableChange}
      />

      <Modal
        open={modalOpen}
        footer={null}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <div className="admin-modal-wrapper">
          <form onSubmit={handleSubmit} className="flex">
            <div className="left w-1/2 pr-6">
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">ID:</span>
                <span className="block w-1/3 pr-8 pt-2">
                  {isUpdate ? selectedGig.id : null}
                </span>
              </div>

              {/* Seller ID */}
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">
                  Seller ID:
                </span>
                <div className="input-wrapper flex-1">
                  <input
                    type="text"
                    name="nguoiTao"
                    id="nguoiTao"
                    value={values.nguoiTao}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-300"
                    disabled={isUpdate ? true : false}
                  />
                  {errors.nguoiTao && touched.nguoiTao ? (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.nguoiTao}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Gig Name */}
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">
                  Gig Name:
                </span>
                <div className="input-wrapper flex-1">
                  <input
                    type="text"
                    name="tenCongViec"
                    id="tenCongViec"
                    value={values.tenCongViec}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.tenCongViec && touched.tenCongViec ? (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.tenCongViec}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Price */}
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">Price:</span>
                <div className="input-wrapper flex-1">
                  <input
                    type="text"
                    name="giaTien"
                    id="giaTien"
                    value={values.giaTien}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.giaTien && touched.giaTien ? (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.giaTien}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Reviews */}
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">
                  Reviews:
                </span>
                <div className="input-wrapper flex-1">
                  <input
                    type="text"
                    name="danhGia"
                    id="danhGia"
                    value={values.danhGia}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.danhGia && touched.danhGia ? (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.danhGia}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Rating */}
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">Rating:</span>
                <div className="input-wrapper flex-1">
                  <input
                    type="text"
                    name="saoCongViec"
                    id="saoCongViec"
                    value={values.saoCongViec}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {errors.saoCongViec && touched.saoCongViec ? (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.saoCongViec}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="right w-1/2 pl-6">
              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">
                  Description:
                </span>
                <div className="input-wrapper flex-1">
                  <textarea
                    name="moTa"
                    id="moTa"
                    value={values.moTa}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    rows="5"
                  ></textarea>
                  {errors.moTa && touched.moTa ? (
                    <p className="text-red-500 text-sm mt-3">{errors.moTa}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex modal-item">
                <span className="font-bold block w-1/3 pr-8 pt-2">
                  Short Description:
                </span>
                <div className="input-wrapper flex-1">
                  <textarea
                    name="moTaNgan"
                    id="moTaNgan"
                    value={values.moTaNgan}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    rows="5"
                  ></textarea>
                  {errors.moTaNgan && touched.moTaNgan ? (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.moTaNgan}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="btn-field flex justify-end">
                {isUpdate ? (
                  <button
                    type="submit"
                    className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                  >
                    Update Gig
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                  >
                    Add Gig
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal open={avatarModalOpen} footer={null} onCancel={handleCancel}>
        <div className="admin-modal-wrapper">
          <div className="modal-item items-center">
            <div className="avatar-input flex items-center justify-center">
              {currentAvatar.url == "" ? (
                <div className="placeholder-avatar"></div>
              ) : (
                <img src={currentAvatar.url}></img>
              )}
            </div>
            <div className="input-wrapper flex-1 flex justify-center">
              <input
                id="avatar-input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => {
                  let avatarURL =
                    e.target.files.length != 0
                      ? URL.createObjectURL(e.target.files[0])
                      : "";
                  setCurrentAvatar({gigId: currentAvatar.gigId, url: avatarURL, file: e.target.files[0] });
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
                  handleUpdateAvatar(currentAvatar.gigId, currentAvatar.file);
                }
              }}
            >
              Update Avatar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageGigs;
