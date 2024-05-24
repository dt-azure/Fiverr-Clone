import { Button, Modal, Popover, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";
import { current } from "@reduxjs/toolkit";
import { notifyErr, notifyErrBasic, notifySuccess } from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageGigCategory = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [cateList, setCateList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const categoryColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Category",
      dataIndex: "tenLoaiCongViec",
      key: "tenLoaiCongViec",
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
    onSubmit: async () => {
      if (isUpdate) {
        try {
          await manageGigServ.updateGigCategory(selectedCategory.id, {
            id: selectedCategory.id,
            tenLoaiCongViec: values.category,
          });

          // Edit table with new data
          let newList = [...cateList];
          let index = newList.findIndex(
            (item) => item.id === selectedCategory.id
          );
          newList[index].tenLoaiCongViec = values.category;
          setCateList(newList);

          notifySuccess("Category updated successfully.");
        } catch (err) {
          notifyErrBasic();
        }
      } else {
        try {
          await manageGigServ.addGigCategory({
            tenLoaiCongViec: values.category,
          });

          // As we let the backend set the ID, we will call the API again when the modal is closed
          setIsEdit(true)
          notifySuccess("Category added successfully.")
        } catch (err) {
          console.log(err)
          notifyErrBasic();
        }
      }
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Field is required"),
    }),
  });

  const generateRow = (category) => {
    return {
      id: category.id,
      tenLoaiCongViec: category.tenLoaiCongViec,
      action: (
        <div className="dashboard-action flex items-center gap-4">
          <Popover
            content={<div className="text-green-600">Edit Category</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                setSelectedCategory(category);
                setFieldValue("category", category.tenLoaiCongViec);
                setIsUpdate(true);
                showModal();
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-red-600">Delete Category</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                handleDeleteCategory(category.id);
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
  const handleGetCategoryData = async (
    pageIndex = "",
    pageSize = "",
    keyword = ""
  ) => {
    try {
      setTableLoading(true);
      const categories = await manageGigServ.getGigCategoryWithPagination(
        pageIndex,
        pageSize,
        keyword
      );

      let newCategoryList = [];
      await categories.data.content.data.map((item) => {
        let newRow = generateRow(item);
        newCategoryList.push(newRow);
      });

      setCateList(newCategoryList);
      setTableParams({
        ...tableParams,
        pagination: {
          total: categories.data.content.totalRow,
        },
      });

      setTableLoading(false);
    } catch (err) {
      console.log(err)
      notifyErr("An error has occurred.");
      setTableLoading(false);
    }
  };

  const handleTableChange = async (pagination, sorter) => {
    if (pagination.current * pagination.pageSize > cateList.length) {
      await manageGigServ
        .getGigCategoryWithPagination(
          "1",
          pagination.current * pagination.pageSize,
          searchKeyword
        )
        .then((res) => {
          const newCategoryList = [];
          res.data.content.data.slice(cateList.length).map((item) => {
            let newRow = generateRow(item);
            newCategoryList.push(newRow);
          });


          const newList = [...cateList];
          setCateList(newList.concat(newCategoryList));
          setTableLoading(false);
        })
        .catch((err) => {
          console.log(err)
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

  // Handle delete API call
  const handleDeleteCategory = async (gigId) => {
    try {
      await manageGigServ.deleteGigCategory(gigId);
      handleGetCategoryData(tableParams.current, tableParams.pageSize, searchKeyword);
      setTableLoading(true);
      notifySuccess("Category deleted successfully.");
    } catch (err) {
      notifyErrBasic();
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
      setCateList([]);

      handleGetCategoryData("1", "10", "");
    }
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    // Pull the data again if user added new categories/ updated existing ones
    // Pulling from page 1 upto current number of items + new additions to avoid changing order of the data
    if (isEdit) {
      handleGetCategoryData("1", cateList.length + 1, searchKeyword);
      setIsEdit(false);
    }

    // Reset input when modal closed
    resetForm();

    setModalOpen(false);
  };

  useEffect(() => {
    setCateList([]);
    handleGetCategoryData("1", "10", searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {

    handleGetCategoryData("1", "10", searchKeyword);

    return () => {
      setSearchKeyword("");
      setSelectedCategory({});
      resetForm()
    };
  }, []);

  useEffect(() => {
    setTableLoading(false);
  }, [cateList]);



  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="dashboard-title">Category List</h2>
        <button
          className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
          onClick={() => {
            setIsUpdate(false);
            showModal();
          }}
        >
          Add Category
        </button>
      </div>
      <Search
        placeholder="Search by category"
        allowClear
        onSearch={onSearch}
        onChange={onSearchChange}
        ref={searchRef}
      />
      <Table
        columns={categoryColumns}
        rowKey={(record) => record.id}
        scroll={{
          //   x: 1500,
          y: window.innerHeight * 0.5,
          scrollToFirstRowOnChange: false,
        }}
        loading={tableLoading}
        pagination={tableParams.pagination}
        dataSource={cateList}
        onChange={handleTableChange}
      />

      <Modal
        open={modalOpen}
        footer={null}
        confirmLoading={confirmLoading}
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
                  Update Category
                </button>
              ) : (
                <button
                  type="submit"
                  className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                >
                  Add Category
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageGigCategory;
