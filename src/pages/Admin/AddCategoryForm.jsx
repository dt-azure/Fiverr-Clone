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
} from "@nextui-org/react";
import { List } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useRef, useState } from "react";

const AddCategoryForm = ({
  data,
  values,
  errors,
  touched,
  isSubmit,
  handleSubmit,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const [dateErr, setDateErr] = useState({ status: false, message: "" });

  return (
    <div className="user-form">
      {isSubmit ? null : (
        <p className="user-id">
          <span>Category ID:</span> {values.id}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {/* Left column */}

        <Input
          value={values.category}
          type="text"
          id="category"
          label="Category"
          variant="bordered"
          radius="sm"
          isInvalid={errors.category && touched.category ? true : false}
          color={errors.category && touched.category ? "danger" : "default"}
          errorMessage={errors.category}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.category}
        />
      </form>
    </div>
  );
};

export default AddCategoryForm;
