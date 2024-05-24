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
import { List } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useRef, useState } from "react";

const AddGigForm = ({
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
  return (
    <div className="user-form">
      {isSubmit ? null : (
        <p className="user-id">
          <span>ID:</span> {data.id}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <Input
            value={values.nguoiTao}
            type="text"
            id="nguoiTao"
            label="Seller ID"
            variant="bordered"
            radius="sm"
            isInvalid={errors.nguoiTao && touched.nguoiTao ? true : false}
            color={errors.nguoiTao && touched.nguoiTao ? "danger" : "default"}
            errorMessage={errors.nguoiTao}
            onValueChange={handleChange}
            onChange={handleChange}
            //   className="max-w-xs"
            onBlur={handleBlur}
            touched={touched.nguoiTao}
          />

          <Input
            value={values.tenCongViec}
            type="text"
            id="tenCongViec"
            label="Gig Name"
            variant="bordered"
            radius="sm"
            isInvalid={errors.tenCongViec && touched.tenCongViec ? true : false}
            color={
              errors.tenCongViec && touched.tenCongViec ? "danger" : "default"
            }
            errorMessage={errors.tenCongViec}
            onValueChange={handleChange}
            onChange={handleChange}
            //   className="max-w-xs"
            onBlur={handleBlur}
            touched={touched.tenCongViec}
          />

          <Input
            value={values.giaTien}
            type="text"
            id="giaTien"
            label="Price"
            variant="bordered"
            radius="sm"
            isInvalid={errors.giaTien && touched.giaTien ? true : false}
            color={errors.giaTien && touched.giaTien ? "danger" : "default"}
            errorMessage={errors.giaTien}
            onValueChange={handleChange}
            onChange={handleChange}
            //   className="max-w-xs"
            onBlur={handleBlur}
            touched={touched.giaTien}
          />

          <Input
            value={values.danhGia}
            type="text"
            id="danhGia"
            label="Review Count"
            variant="bordered"
            radius="sm"
            isInvalid={errors.danhGia && touched.danhGia ? true : false}
            color={errors.danhGia && touched.danhGia ? "danger" : "default"}
            errorMessage={errors.danhGia}
            onValueChange={handleChange}
            onChange={handleChange}
            //   className="max-w-xs"
            onBlur={handleBlur}
            touched={touched.danhGia}
          />

          <Input
            value={values.saoCongViec}
            type="text"
            id="saoCongViec"
            label="Rating"
            variant="bordered"
            radius="sm"
            isInvalid={errors.saoCongViec && touched.saoCongViec ? true : false}
            color={
              errors.saoCongViec && touched.saoCongViec ? "danger" : "default"
            }
            errorMessage={errors.saoCongViec}
            onValueChange={handleChange}
            onChange={handleChange}
            //   className="max-w-xs"
            onBlur={handleBlur}
            touched={touched.saoCongViec}
          />
        </div>

        <div className="flex gap-8">
          <Textarea
            id="moTa"
            value={values.moTa}
            variant="bordered"
            radius="sm"
            maxRows={5}
            label="Description"
            placeholder="Enter your description"
            isInvalid={errors.moTa && touched.moTa ? true : false}
            color={errors.moTa && touched.moTa ? "danger" : "default"}
            errorMessage={errors.moTa}
            onValueChange={handleChange}
            onChange={handleChange}
            className="admin-text-area"
            onBlur={handleBlur}
            touched={touched.moTa}
          />

          <Textarea
            id="moTaNgan"
            value={values.moTaNgan}
            variant="bordered"
            radius="sm"
            maxRows={5}
            label="Short Description"
            placeholder="Enter your short description"
            isInvalid={errors.moTaNgan && touched.moTaNgan ? true : false}
            color={errors.moTaNgan && touched.moTaNgan ? "danger" : "default"}
            errorMessage={errors.moTaNgan}
            onValueChange={handleChange}
            onChange={handleChange}
            className="admin-text-area"
            onBlur={handleBlur}
            touched={touched.moTaNgan}
          />
        </div>
      </form>
    </div>
  );
};

export default AddGigForm;
