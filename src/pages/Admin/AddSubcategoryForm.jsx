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
import React, { useEffect, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";

const AddSubcategoryForm = ({
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
  const subcateRef = useRef();

  const handleAddSubcategoryItem = (value) => {
    if (value == "") {
      return;
    }

    let newList = [...values.dsChiTietLoai];
    newList.push({id: 1, tenChiTiet: value });

    setFieldValue("dsChiTietLoai", newList);
  };

  const handleRemoveSubcategoryItem = async (index) => {
    let newList = [...values.dsChiTietLoai];

    newList.splice(index, 1);
    setFieldValue("dsChiTietLoai", newList);
  };

  return (
    <div className="user-form">
      {isSubmit ? null : (
        <p className="user-id">
          <span>Sub Group ID:</span> {values.id}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {/* Left column */}

        <Input
          value={values.maLoaiCongviec}
          type="text"
          id="maLoaiCongviec"
          label="Category ID"
          variant={isSubmit ? "bordered" : "faded"}
          radius="sm"
          isDisabled={isSubmit ? false : true}
          isInvalid={
            errors.maLoaiCongviec && touched.maLoaiCongviec ? true : false
          }
          color={
            errors.maLoaiCongviec && touched.maLoaiCongviec
              ? "danger"
              : "default"
          }
          errorMessage={errors.maLoaiCongviec}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.maLoaiCongviec}
        />

        <Input
          value={values.tenNhom}
          type="text"
          id="tenNhom"
          label="Sub Group Name"
          variant={isSubmit ? "bordered" : "faded"}
          radius="sm"
          isDisabled={isSubmit ? false : true}
          isInvalid={errors.tenNhom && touched.tenNhom ? true : false}
          color={errors.tenNhom && touched.tenNhom ? "danger" : "default"}
          errorMessage={errors.tenNhom}
          onValueChange={handleChange}
          onChange={handleChange}
          //   className="max-w-xs"
          onBlur={handleBlur}
          touched={touched.tenNhom}
        />

        <div className="dashboard-skill-input-wrapper">
          <Input
            type="text"
            id="skill"
            label="Skills"
            variant="bordered"
            radius="sm"
            color="default"
            ref={subcateRef}
            endContent={
              <Button
                className="form-add-btn"
                onClick={() => {
                  handleAddSubcategoryItem(subcateRef.current.value);
                }}
              >
                Add
              </Button>
            }
          />

          <div className="dashboard-skill-input w-full">
            {values.dsChiTietLoai.length == 0 ? null : (
              <div className="dashboard-skill-input-list">
                <List
                  dataSource={values.dsChiTietLoai}
                  renderItem={(item, index) => (
                    <div className="dashboard-list-item px-4 py-2">
                      <div className="flex justify-between items-center">
                        <p>{item.tenChiTiet}</p>
                        <i
                          className="fa-solid fa-trash dashboard-remove-btn text-red-500 hover:text-red-600"
                          onClick={() => {
                            handleRemoveSubcategoryItem(index);
                          }}
                        ></i>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubcategoryForm;
