import { Button, Modal, Popover, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { manageGigServ } from "../../services/manageGig";
import { current } from "@reduxjs/toolkit";
import {
  formatDate,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util";
import { manageCommentServ } from "../../services/manageComment";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../../components/Input/InputCustom";

const ManageComments = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const columns = [
    {
      title: "Comment ID",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "Gig ID",
      dataIndex: "maCongViec",
      key: "maCongViec",
      width: 130,
    },
    {
      title: "Commenter ID",
      dataIndex: "maNguoiBinhLuan",
      key: "maNguoiBinhLuan",
      width: 130,
    },
    {
      title: "Date",
      dataIndex: "ngayBinhLuan",
      key: "ngayBinhLuan",
      width: 130,
    },
    {
      title: "Rating",
      dataIndex: "saoBinhLuan",
      key: "saoBinhLuan",
      width: 130,
    },
    {
      title: "Content",
      dataIndex: "noiDung",
      key: "noiDung",
      // width: 200,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      // width: 80,
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
      content: "",
      rating: "",
    },
    onSubmit: async (values) => {
      try {
        let newComment = {
          id: selectedComment.id,
          maCongViec: selectedComment.maCongViec,
          maNguoiBinhLuan: selectedComment.maNguoiBinhLuan,
          ngayBinhLuan: selectedComment.ngayBinhLuan,
          noiDung: values.content,
          saoBinhLuan: values.rating,
        };

        await manageCommentServ.updateComment(selectedComment.id, newComment);
        notifySuccess("Comment updated successfully. Closing window...");
        handleGetCommentData();
        setTimeout(() => {
          setModalOpen(false);
        }, "2000");
      } catch (err) {
        notifyErrBasic();
      }
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment cannot be empty."),
      rating: Yup.number().typeError("Rating has to be a number")
        .required("Field is required.")
        .min(0, "Rating must be from 0 to 5.")
        .max(5, "Rating must be from 0 to 5."),
    }),
  });

  const generateRow = (comment) => {
    return {
      id: comment.id,
      maCongViec: comment.maCongViec,
      maNguoiBinhLuan: comment.maNguoiBinhLuan,
      ngayBinhLuan: formatDate(comment.ngayBinhLuan),
      saoBinhLuan: comment.saoBinhLuan,
      noiDung: comment.noiDung,
      action: (
        <div className="dashboard-action flex items-center gap-4">
          <Popover
            content={<div className="text-green-600">Edit Comment</div>}
            trigger="hover"
            id="dashboard-popover"
            onClick={async () => {
              setSelectedComment(comment);

              showModal();
            }}
          >
            <Button onClick={() => {}}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </Popover>

          <Popover
            content={<div className="text-red-600">Delete Comment</div>}
            trigger="hover"
            id="dashboard-popover"
          >
            <Button
              onClick={() => {
                handleDeleteComment(comment.id);
              }}
            >
              <i className="fa-solid fa-trash text-red-500 hover:text-red-600"></i>
            </Button>
          </Popover>
        </div>
      ),
    };
  };

  //   API call to get comment data
  const handleGetCommentData = async () => {
    try {
      setTableLoading(true);
      const comments = await manageCommentServ.getComments();

      let newCommentList = [];
      await comments.data.content.map((item) => {
        let newRow = generateRow(item);
        newCommentList.push(newRow);
      });

      setCommentList(newCommentList);

      setTableLoading(false);
    } catch (err) {
      notifyErr("An error has occurred.");
      setTableLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // console.log(commentList);
      await manageCommentServ.deleteComment(commentId);

      // findIndex is too slow so it's better to call the API again for now
      handleGetCommentData();

      notifySuccess("Comment deleted successfully.");
    } catch (err) {
      console.log(err);
      notifyErrBasic();
    }
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    handleGetCommentData();

    return () => {
      setSelectedComment([]);
      setCommentList([]);
    };
  }, []);

  useEffect(() => {
    if (commentList.length == 0) {
      setTableLoading(true);
    } else {
      setTableLoading(false);
    }
  }, [commentList]);

  useEffect(() => {
    // Making sure fields are updated after a comment is selected as set state is async
    setFieldValue("rating", selectedComment.saoBinhLuan);
    setFieldValue("content", selectedComment.noiDung);
  }, [selectedComment]);

  return (
    <div>
      <h2 className="dashboard-title">Comment List</h2>
      {/* <Search placeholder="Search by comment name" allowClear onSearch onChange /> */}
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        scroll={{
          //   x: 1500,
          y: window.innerHeight * 0.5,
          scrollToFirstRowOnChange: false,
        }}
        loading={tableLoading}
        dataSource={commentList}
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
              <span className="font-bold w-1/3 text-right pr-8">
                Comment ID:
              </span>
              <span>{selectedComment.id}</span>
            </div>

            <div className="flex modal-item">
              <span className="font-bold w-1/3 text-right pr-8">Gig ID:</span>
              <span>{selectedComment.maCongViec}</span>
            </div>

            <div className="flex modal-item">
              <span className="font-bold w-1/3 text-right pr-8">
                Commenter ID:
              </span>
              <span>{selectedComment.maNguoiBinhLuan}</span>
            </div>

            <div className="flex modal-item">
              <span className="font-bold w-1/3 text-right pr-8">Date:</span>
              <span>{formatDate(selectedComment.ngayBinhLuan)}</span>
            </div>

            <div className="flex modal-item items-center">
              <span className="font-bold block w-1/3 text-right pr-8">
                Rating:
              </span>
              <div className="input-wrapper flex-1">
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  value={values.rating}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.rating && touched.rating ? (
                  <p className="text-red-500 text-sm mt-3">{errors.rating}</p>
                ) : null}
              </div>
            </div>

            <div className="flex modal-item items-center">
              <span className="font-bold block w-1/3 text-right pr-8">
                Comment:
              </span>
              <div className="input-wrapper flex-1">
                <input
                  type="text"
                  name="content"
                  id="content"
                  value={values.content}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.rating && touched.rating ? (
                  <p className="text-red-500 text-sm mt-3">{errors.content}</p>
                ) : null}
              </div>
            </div>

            <div className="btn-field flex justify-end">
              <button
                type="submit"
                className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
              >
                Update Comment
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageComments;
