import { Button, Modal, Popover, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";
import { current } from "@reduxjs/toolkit";
import { notifyErr, notifyErrBasic, notifySuccess } from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageGigSubcategory = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const subcategoryColumns = [
    {
      title: "Group ID",
      dataIndex: "id",
      key: "id",
      // width: 80,
    },
    {
      title: "Subcategory Group",
      dataIndex: "tenNhom",
      key: "tenNhom",
      //   width: 150,
    },
    {
      title: "Group Img",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      //   width: 150,
    },
    {
      title: "Category ID",
      dataIndex: "maLoaiCongViec",
      key: "maLoaiCongViec",
      //   width: 150,
    },
    {
      title: "Subcategory ID",
      dataIndex: "idChiTiet",
      key: "idChiTiet",
      //   width: 150,
    },
    {
      title: "Subcategory Name",
      dataIndex: "tenChiTiet",
      key: "tenChiTiet",
      //   width: 150,
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
      category: "",
    },
    onSubmit: async () => {},
    validationSchema: Yup.object({
      category: Yup.string().required("Field is required"),
    }),
  });

  const generateRow = (subcategoryGroup, subcategory) => {
    return {
      id: subcategoryGroup.id,
      tenNhom: subcategoryGroup.tenNhom,
      hinhAnh: (
        <div className="dashboard-img">
          <img src={subcategoryGroup.hinhAnh}></img>
        </div>
      ),
      maLoaiCongViec: subcategoryGroup.maLoaiCongviec,
      idChiTiet: subcategory.id,
      tenChiTiet: subcategory.tenChiTiet,
      action: (
        <div className="dashboard-action flex items-center gap-4">
          <Popover
            content={<div className="text-green-600">Edit Subcategory</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button onClick={() => {}}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-red-600">Delete Subcategory</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button onClick={() => {}}>
              <i className="fa-solid fa-trash text-red-500 hover:text-red-600"></i>
            </Button>
          </Popover>
        </div>
      ),
    };
  };

  //   API call to get data
  const handleGetSubcategoryData = async (pageIndex, pageSize, keyword) => {
    try {
      setTableLoading(true);
      const subcategories = await manageGigServ.getGigSubcategoryWithPagination(
        pageIndex,
        pageSize,
        keyword
      );
      console.log(subcategories);
      let newSubcategoryList = [];
      subcategories.data.content.data.map((item) => {
        if (item.dsChiTietLoai.length == 0) {
          let newRow = generateRow(item, {
            id: "",
            tenChiTiet: "",
          });
          newSubcategoryList.push(newRow);
        } else {
          item.dsChiTietLoai.map((subItem) => {
            let newRow = generateRow(item, subItem);
            newSubcategoryList.push(newRow);
          });
        }
      });
      setSubcategoryList(newSubcategoryList);

      setTableParams({
        ...tableParams,
        pagination: {
          total: subcategories.data.content.totalRow,
        },
      });
    } catch (err) {
      notifyErr("An error has occurred.");
      setTableLoading(false);
    }
  };

  const handleTableChange = async (pagination, sorter) => {
    if (pagination.current * pagination.pageSize > subcategoryList.length) {
      await manageGigServ
        .getGigSubcategoryWithPagination(
          "1",
          pagination.current * pagination.pageSize,
          searchKeyword
        )
        .then((res) => {
          // Add to raw data
          // setRawData(
          //   [...rawData].concat(
          //     res.data.content.data.slice(subcategoryList.length)
          //   )
          // );

          // Add to data source for the table
          const newSubcategoryList = [];
          res.data.content.data.slice(subcategoryList.length).map((item) => {
            if (item.dsChiTietLoai.length == 0) {
              // If a category group has no subcategory then add an empty row so it doesn't affect the numbering of the rest
              let newRow = generateRow(item, { id: "", tenChiTiet: "" });
              newSubcategoryList.push(newRow);
            } else {
              item.dsChiTietLoai.map((subItem) => {
                let newRow = generateRow(item, subItem);
                newSubcategoryList.push(newRow);
              });
            }
          });

          const newList = [...subcategoryList].concat(newSubcategoryList);

          setSubcategoryList(newList);
          // setTableLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          notifyErr("An error has occurred.");
        });
    }

    setTableParams({
      ...pagination,
      pagination: {
        total:
          subcategoryList.length > pagination.total
            ? subcategoryList.length
            : pagination.total,
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
      setSubcategoryList([]);

      handleGetSubcategoryData("1", "10", "");
    }
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    // Pull the data again if user added new categories/ updated existing ones
    // Pulling from page 1 upto current number of items + new additions to avoid changing order of the data
    if (isEdit) {
      // handleGetCategoryData("1", cateList.length + 1, searchKeyword);
      setIsEdit(false);
    }

    // Reset input when modal closed
    resetForm();

    setModalOpen(false);
  };

  useEffect(() => {
    if (subcategoryList.length == 0) {
      handleGetSubcategoryData("1", "10", searchKeyword);
    }

    return () => {
      setSelectedCategory({});
      resetForm();
    };
  }, []);

  useEffect(() => {
    setSubcategoryList([]);
    handleGetSubcategoryData("1", "10", searchRef.current.input.value);
  }, [searchKeyword]);

  useEffect(() => {
    setTableLoading(false);
  }, [subcategoryList]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="dashboard-title">Subcategory List</h2>
        <button
          className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
          onClick={() => {
            setIsUpdate(false);
            showModal();
          }}
        >
          Add Subcategory
        </button>
      </div>
      <Search
        placeholder="Search by subcategory group name"
        allowClear
        onSearch={onSearch}
        onChange={onSearchChange}
        ref={searchRef}
      />
      <Table
        columns={subcategoryColumns}
        rowKey={(record) =>
          record.id +
          "-" +
          record.tenNhom +
          "-" +
          record.maLoaiCongViec +
          "-" +
          record.idChiTiet +
          "-" +
          record.tenChiTiet
        }
        scroll={{
          //   x: 1500,
          y: window.innerHeight * 0.5,
          scrollToFirstRowOnChange: false,
        }}
        loading={tableLoading}
        pagination={tableParams.pagination}
        dataSource={subcategoryList}
        onChange={handleTableChange}
      />

      <Modal
        open={modalOpen}
        footer={null}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="admin-modal-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="flex modal-item">
              <span className="font-bold block w-1/3 pr-8 pt-2">Category:</span>
              <div className="input-wrapper flex-1">
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.category && touched.category ? (
                  <p className="text-red-500 text-sm mt-3">{errors.category}</p>
                ) : null}
              </div>
            </div>
            <div className="btn-field flex justify-end">
              {isUpdate ? (
                <button
                  type="submit"
                  className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                >
                  Update Subcategory
                </button>
              ) : (
                <button
                  type="submit"
                  className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                >
                  Add Subcategory
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageGigSubcategory;
