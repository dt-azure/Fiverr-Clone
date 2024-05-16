import React, { useEffect, useState } from "react";
import { manageCommentServ } from "../../services/manageComment";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import dayjs from "dayjs";

const Comments = () => {
  const [commentList, setCommentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { gigId } = useParams();

  const commentItem = (comment) => (
    <div>
      <div className="commenter-info flex items-center">
        <div className="commenter-avatar">
          <img src={comment.avatar} alt="" />
        </div>
        <div className="">
          <h3>{comment.tenNguoiBinhLuan}</h3>
          <Rate disabled defaultValue={comment.saoBinhLuan} />
        </div>
      </div>
      <div className="comment-details">
        <span>{comment.noiDung}</span>
        <div className="comment-date">
          <span>Commented on {comment.ngayBinhLuan}</span>
        </div>
      </div>
    </div>
  );

  const handleGetComments = async (id) => {
    try {
      const comments = await manageCommentServ.getCommentsByGigId(id);
      setCommentList(comments.data.content);
      setIsLoading(false);
      console.log(commentList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetComments(gigId);
  }, [gigId]);

  if (isLoading) {
    return (
      <div>
        <p>Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="comments space-y-10">
      {commentList.map((comment) => commentItem(comment))}
    </div>
  );
};

export default Comments;
