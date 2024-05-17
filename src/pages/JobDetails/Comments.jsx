import React, { useEffect, useState } from "react";
import { manageCommentServ } from "../../services/manageComment";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import dayjs from "dayjs";
import BasicButton from "../../components/Button/BasicButton";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  formatDate,
  getLocalStorage,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util";

const Comments = () => {
  const [commentList, setCommentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { gigId } = useParams();
  const userLocal = getLocalStorage("user");
  const userAvatar = userLocal ? userLocal.data.content.user.avatar : "";

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
    setFieldValue,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    onSubmit: async () => {
      handlePostComment();
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Field is required."),
    }),
  });

  const handleChangeRating = (e) => {
    setFieldValue("rating", e);
  };

  const commentItem = (comment) => (
    <div key={comment.id}>
      <div className="commenter-info flex items-center">
        <div className="commenter-avatar">
          {comment.avatar == "" ? (
            <div className="placeholder-avatar"></div>
          ) : (
            <img src={comment.avatar} alt="" />
          )}
        </div>
        <div className="">
          <h3>{comment.tenNguoiBinhLuan}</h3>
          <Rate disabled defaultValue={comment.saoBinhLuan} />
        </div>
      </div>
      <div className="comment-details">
        <span>{comment.noiDung}</span>
        <div className="comment-date">
          <span>Commented on {formatDate(comment.ngayBinhLuan)}</span>
        </div>
      </div>
    </div>
  );

  const handleGetComments = async (id) => {
    try {
      const comments = await manageCommentServ.getCommentsByGigId(id);
      setCommentList(comments.data.content);
      setIsLoading(false);
    } catch (err) {
      notifyErrBasic();
    }
  };

  const handlePostComment = async () => {
    let newComment = {
      maCongViec: gigId,
      maNguoiBinhLuan: userLocal ? userLocal.data.content.user.id : "",
      ngayBinhLuan: new Date(),
      noiDung: values.comment,
      saoBinhLuan: values.rating,
    };

    try {
      manageCommentServ.postComment(newComment);
      // const commentToAdd = commentItem({
      //   id: "tempt",
      //   avatar: userAvatar,
      //   tenNguoiBinhLuan: userLocal.data.content.user.name,
      //   saoBinhLuan: values.rating,
      //   noiDung: values.comment,
      //   ngayBinhLuan: formatDate(new Date()),
      // });

      // Add the new comment to the list without calling the API again
      let newCommentList = [...commentList];
      newCommentList.unshift({
        id: "tempt",
        avatar: userAvatar,
        tenNguoiBinhLuan: userLocal.data.content.user.name,
        saoBinhLuan: values.rating,
        noiDung: values.comment,
        ngayBinhLuan: formatDate(new Date()),
      });
      setCommentList(newCommentList);
      console.log(newCommentList);
      notifySuccess("Comment added successfully.");
      resetForm({ values: { comment: "", rating: 0 } });
    } catch (err) {
      notifyErrBasic();
    }
  };

  useEffect(() => {
    handleGetComments(gigId);
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading comments...</p>
      </div>
    );
  }

  return (
    <>
      <div className="comments space-y-10">
        {commentList.map((comment) => commentItem(comment))}
      </div>
      <div className="comments-input flex gap-2">
        <div className="user-avatar">
          {userAvatar == "" ? (
            <div className="placeholder-avatar"></div>
          ) : (
            <img src={userAvatar} alt="" />
          )}
        </div>
        <div className="text-field w-full">
          <form onSubmit={handleSubmit}>
            <Rate value={values.rating} onChange={handleChangeRating} />
            <TextArea
              id="comment"
              name="comment"
              rows={4}
              value={values.comment}
              style={{ resize: "none" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.comment && touched.comment ? (
              <p className="text-red-500 text-sm mt-3">{errors.comment}</p>
            ) : null}
            <BasicButton text="Add Comment" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Comments;
