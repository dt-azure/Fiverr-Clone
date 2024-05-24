import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import dayjs, { Dayjs } from "dayjs";
import React, { useRef, useState } from "react";
import { formatDate } from "../../utils/util";

const AddCommentForm = ({
  data,
  values,
  errors,
  touched,
  handleSubmit,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const [dateErr, setDateErr] = useState({ status: false, message: "" });

  return (
    <div className="user-form">
      <p className="user-id">
        <span>Comment ID:</span> {data.id}
      </p>
      <p className="user-id">
        <span>Gig ID:</span> {data.maCongViec}
      </p>
      <p className="user-id">
        <span>Commenter ID:</span> {data.maNguoiBinhLuan}
      </p>
      <p className="user-id">
        <span>Date:</span> {formatDate(data.ngayBinhLuan)}
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
        {/* Left column */}

        <Input
          value={values.rating}
          type="text"
          id="rating"
          label="Rating"
          variant="bordered"
          radius="sm"
          isInvalid={errors.rating && touched.rating ? true : false}
          color={errors.rating && touched.rating ? "danger" : "default"}
          errorMessage={errors.rating}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.rating}
        />

        <Textarea
          id="content"
          value={values.content}
          variant="bordered"
          radius="sm"
          maxRows={5}
          label="Description"
          placeholder="Enter your description"
          isInvalid={errors.content && touched.content ? true : false}
          color={errors.content && touched.content ? "danger" : "default"}
          errorMessage={errors.content}
          onValueChange={handleChange}
          onChange={handleChange}
          className="admin-text-area"
          onBlur={handleBlur}
          touched={touched.content}
        />
      </form>
    </div>
  );
};

export default AddCommentForm;
