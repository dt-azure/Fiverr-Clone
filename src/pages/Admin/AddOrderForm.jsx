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

const AddUserForm = ({
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
          <span>Order ID:</span> {data.id}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {/* Left column */}

        <Input
          value={values.maCongViec}
          type="text"
          id="maCongViec"
          label="Gig ID"
          variant="bordered"
          radius="sm"
          isInvalid={errors.maCongViec && touched.maCongViec ? true : false}
          color={errors.maCongViec && touched.maCongViec ? "danger" : "default"}
          errorMessage={errors.maCongViec}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.maCongViec}
        />

        <Input
          value={values.maNguoiThue}
          type="text"
          id="maNguoiThue"
          label="Buyer ID"
          variant="bordered"
          radius="sm"
          isInvalid={errors.maNguoiThue && touched.maNguoiThue ? true : false}
          color={
            errors.maNguoiThue && touched.maNguoiThue ? "danger" : "default"
          }
          errorMessage={errors.maNguoiThue}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.maNguoiThue}
        />

        <DatePicker
          label="Order Date"
          id="ngayThue"
          variant="bordered"
          radius="sm"
          isInvalid={dateErr.status}
          color={errors.ngayThue ? "danger" : "default"}
          errorMessage={dateErr.message}
          onChange={(value) => {
            let now = today(getLocalTimeZone());
            if (!value) {
              setDateErr({ status: true, message: "Field is required." });
            } else if (value > now) {
              setDateErr({
                status: true,
                message: "Cannot select date from the future.",
              });
            } else {
              setDateErr({ status: false, message: "" });
            }

            setFieldValue("ngayThue", Date(value));
          }}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.ngayThue}
        />

        <Select
          label="Status"
          variant="bordered"
          radius="sm"
          //   className="max-w-xs"
          onBlur={handleBlur}
          defaultSelectedKeys={isSubmit ? null : [values.hoanThanh]}
          onChange={(e) => {
            setFieldValue("hoanThanh", e.target.value);
          }}
        >
          <SelectItem key={true} value={true}>
            Finished
          </SelectItem>

          <SelectItem key={false} value={false}>
            Ongoing
          </SelectItem>
        </Select>
      </form>
    </div>
  );
};

export default AddUserForm;
