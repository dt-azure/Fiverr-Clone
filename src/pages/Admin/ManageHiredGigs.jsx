import { Button, DatePicker, Modal, Popover, Select, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";
import {
  formatDate,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

const ManageHiredGigs = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [orderList, setOrderList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({
    id: 0,
    maCongViec: 0,
    maNguoiThue: 0,
    ngayThue: "",
    hoanThanh: false,
  });
  const [dateErr, setDateErr] = useState(false);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      // width: 100,
    },
    {
      title: "Gig ID",
      dataIndex: "maCongViec",
      key: "maCongViec",
      // width: 100,
    },
    {
      title: "Buyer ID",
      dataIndex: "maNguoiThue",
      key: "maNguoiThue",
      // width: 100,
    },
    {
      title: "Order Date",
      dataIndex: "ngayThue",
      key: "ngayThue",
      // width: 150,
    },
    {
      title: "Status",
      dataIndex: "hoanThanh",
      key: "hoanThanh",
      // width: 150,
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
  } = useFormik({
    initialValues: {
      id: 0,
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: false,
    },
    onSubmit: async () => {},
    validationSchema: Yup.object({
      maCongViec: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
      maNguoiThue: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
    }),
  });

  const generateRow = (order) => {
    return {
      id: order.id,
      maCongViec: order.maCongViec,
      maNguoiThue: order.maNguoiThue,
      ngayThue: formatDate(order.ngayThue),
      hoanThanh: order.hoanThanh ? (
        <p className="text-green-500 font-bold">Finished</p>
      ) : (
        <p className="text-orange-600 font-bold">Ongoing</p>
      ),
      action: (
        <div className="dashboard-action flex items-center gap-4">
          <Popover
            content={<div className="text-green-600">Edit Info</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                setSelectedOrder(order);
                showModal();
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-red-600">Delete Order</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                handleDeleteOrder(order.id);
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
  const handleGetOrderData = async (
    pageIndex = "",
    pageSize = "",
    keyword = ""
  ) => {
    try {
      setTableLoading(true);
      const order = await manageGigServ.getOrderDataWithPagination(
        pageIndex,
        pageSize,
        keyword
      );

      let newOrderList = [];
      await order.data.content.data.map((item) => {
        let newRow = generateRow(item);
        newOrderList.push(newRow);
      });

      setOrderList(newOrderList);
      return order.data.content.totalRow;
    } catch (err) {
      notifyErr("An error has occurred.");
      setTableLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    console.log(tableParams);
    if (!tableParams.pageSize) {
      notifyErr("An error has occurred, please try again.");
      return;
    }

    try {
      await manageGigServ.deleteOrder(orderId);

      setOrderList([]);
      handleGetOrderData(
        "1",
        tableParams.current * tableParams.pageSize,
        searchKeyword
      ).then((result) => {
        setTableParams({...tableParams});
      });
      setTableLoading(false)
      notifySuccess("Order deleted successfully.");
    } catch (err) {
      notifyErrBasic();
    }
  };

  const handleTableChange = async (pagination, sorter) => {
    if (pagination.current * pagination.pageSize > orderList.length) {
      await manageGigServ
        .getOrderDataWithPagination(
          "1",
          pagination.current * pagination.pageSize,
          searchKeyword
        )
        .then((res) => {
          const newOrderList = [];
          res.data.content.data.slice(orderList.length).map((item) => {
            let newRow = generateRow(item);
            newOrderList.push(newRow);
          });

          const newList = [...orderList].concat(newOrderList);
          // console.log(newList);
          setOrderList(newList);
          setTableLoading(false);
        })
        .catch((err) => {
          notifyErr("An error has occurred.");
        });
    }

    setTableParams({
      current: pagination.current,
      pageSize: pagination.pageSize,
      pagination: {
        total: pagination.total,
      },
    });
    return;
  };

  const handleUpdateOrder = async () => {
    const updatedOrder = {
      id: selectedOrder.id,
      maCongViec: values.maCongViec,
      maNguoiThue: values.maNguoiThue,
      ngayThue: values.ngayThue,
      hoanThanh: values.hoanThanh,
    };

    try {
      await manageGigServ.updateOrder(selectedOrder.id, updatedOrder);
      handleGetOrderData("1", tableParams.current * tableParams.pageSize, "");
      notifySuccess("Order updated successfully. Closing window...");

      setTimeout(() => {
        setModalOpen(false);
        setTableLoading(false)
      }, "2000");
    } catch (err) {
      console.log(err);
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
      setOrderList([]);

      const total = handleGetOrderData("1", "10", "");

      setTableParams({
        ...tableParams,
        pagination: {
          total: total,
        },
      });
    }
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    resetForm();
    setSelectedOrder({});
    setModalOpen(false);
  };

  const onStatusChange = (value) => {
    setFieldValue("hoanThanh", value);
  };

  const onDateChange = (date, dateString) => {
    const currentDate = new Date();
    if (date > currentDate) {
      setDateErr(true);
    } else {
      setDateErr(false);
    }

    setFieldValue("ngayThue", dateString);
  };

  useEffect(() => {
    handleGetOrderData("1", "10", searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    if (tableParams.pageSize) {
      handleGetOrderData(
        "1",
        tableParams.current * tableParams.pageSize,
        searchKeyword
      ).then((result) => {
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: result,
          },
        }));
      });
    } else {
      handleGetOrderData("1", "10", "").then((result) => {
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: result,
          },
        }));
      });
    }
    setTableLoading(false)
    return () => {
      setSearchKeyword("");
      setOrderList([]);
      setSelectedOrder({});
    };
  }, []);

  useEffect(() => {
    setFieldValue("hoanThanh", selectedOrder.hoanThanh);
    setFieldValue("maNguoiThue", selectedOrder.maNguoiThue);
  }, [selectedOrder]);

  useEffect(() => {}, [orderList]);

  return (
    <div>
      <h2 className="dashboard-title">Order List</h2>
      {/* <Search
        placeholder="Search by order ID"
        allowClear
        onSearch={onSearch}
        onChange={onSearchChange}
      /> */}
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
        dataSource={orderList}
        onChange={handleTableChange}
      />

      <Modal open={modalOpen} footer={null} onCancel={handleCancel}>
        <div className="admin-modal-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="flex modal-item items-center">
              <span className="font-bold block w-1/3 text-right pr-8">
                Gig ID:
              </span>
              <div className="input-wrapper flex-1">
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={selectedOrder.id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-400"
                  disabled
                />
              </div>
            </div>

            <div className="flex modal-item items-center">
              <span className="font-bold block w-1/3 text-right pr-8">
                Buyer ID:
              </span>
              <div className="input-wrapper flex-1">
                <input
                  type="text"
                  name="maNguoiThue"
                  id="maNguoiThue"
                  value={values.maNguoiThue}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.maNguoiThue && touched.maNguoiThue ? (
                  <p className="text-red-500 text-sm mt-3">
                    {errors.maNguoiThue}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex modal-item items-center">
              <span className="font-bold block w-1/3 text-right pr-8">
                Order Date:
              </span>
              <div className="input-wrapper flex-1">
                <DatePicker
                  id="ngayThue"
                  onChange={onDateChange}
                  format="DD-MM-YYYY"
                  // defaultValue={dayjs(values.ngayThue)}
                />
                {dateErr ? (
                  <p className="text-red-500 text-sm mt-3">
                    Date cannot be from the future.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex modal-item items-center">
              <span className="font-bold block w-1/3 text-right pr-8">
                Status:
              </span>
              <div className="input-wrapper flex-1">
                <Select
                  id="hoanThanh"
                  value={values.hoanThanh}
                  options={[
                    { value: true, label: "Finished" },
                    { value: false, label: "Ongoing" },
                  ]}
                  onChange={onStatusChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className="btn-field flex justify-end">
              <button
                type="submit"
                className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                onClick={handleUpdateOrder}
              >
                Update Order
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageHiredGigs;
