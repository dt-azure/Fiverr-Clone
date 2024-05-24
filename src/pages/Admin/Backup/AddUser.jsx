import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../../components/Input/InputCustom";
import InputPasswordCustom from "../../components/Input/InputPasswordCustom";
import { Button, DatePicker, Input, List, Select, Space } from "antd";
import { manageUserServ } from "../../services/manageUser";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEnableSubmitBtn,
  handleSelectUser,
} from "../../redux/slice/userSlice";
import dayjs from "dayjs";
import { notifyErr, notifySuccess } from "../../utils/util";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [dateErr, setDateErr] = useState(false);
  const [genderErr, setgenderErr] = useState(false);
  const [roleErr, setRoleErr] = useState(false);
  const skillRef = useRef();
  const certRef = useRef();
  const formRef = useRef();
  const { submit, update, selectedUser } = useSelector(
    (state) => state.userSlice
  );
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const onChangeDate = (date, dateString) => {
    const currentDate = new Date();

    if (date >= currentDate) {
      setDateErr(true);
    } else {
      setDateErr(false);
      setFieldValue("birthday", dateString);
    }

    // console.log(dateString);
  };

  const onChangeGender = (value) => {
    setFieldValue("gender", value);
    setgenderErr(false);
  };

  const onChangeRole = (value) => {
    setFieldValue("role", value);
    setRoleErr(false);
  };

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
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
      skill: [],
      certification: [],
    },
    onSubmit: async (values) => {
      if (submit) {
        try {
          await manageUserServ.addUser({ ...values });
          notifySuccess("User added successfully.");
        } catch (err) {
          notifyErr("An error has occurred.");
        }
      } else {
        try {
          const newFormData = {
            id: values.id,
            name: values.name,
            email: values.email,
            phone: values.phone,
            birthday: values.birthday,
            gender: true,
            role: values.role,
            skill: values.skill,
            certification: values.certification,
          };
          await manageUserServ.updateUserInfo(values.id, newFormData);
          notifySuccess("User info updated successfully.");
        } catch (err) {
          notifyErr("An error has occurred.");
        }
      }
    },
    onReset: () => {
      if (refresh) {
        navigate("../manage-user");
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Field is required.")
        .matches(/^[a-zA-Z ]+$/, "Invalid name."),
      email: Yup.string()
        .required("Field is required.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email."
        ),
      phone: Yup.string()
        .required("Field is required.")
        .matches(/^[0-9]{8,10}$/, "Invalid phone number."),
      password: submit
        ? Yup.string()
            .required("Field is required.")
            .matches(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and have at least 8 characters."
            )
        : null,
    }),
  });

  // Remove a skill/cert item from the list when remove button is clicked
  const handleRemoveInputListItem = (values, fieldName, index) => {
    let newList = [...values];
    newList.splice(index, 1);
    setFieldValue(fieldName, newList);
  };

  // Add a skill/cert item from the list
  const handleAddInputListItem = (values, fieldName, value) => {
    if (value == "") {
      return;
    }

    let newList = [...values];
    newList.push(value);
    setFieldValue(fieldName, newList);
  };

  useEffect(() => {
    if (update) {
      setValues({
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        birthday: selectedUser.birthday,
        gender: selectedUser.gender,
        role: selectedUser.role,
        skill: selectedUser.skill,
        certification: selectedUser.certification,
      });
    }
    return () => {
      dispatch(handleEnableSubmitBtn());
    };
  }, [submit, update, refresh]);

  return (
    <div className="dashboard-add-user">
      <h2 className="dashboard-title mb-0">
        {submit ? "Add User" : "Edit User"}
      </h2>

      <div className="user-form">
        <form onSubmit={handleSubmit} className="flex" ref={formRef}>
          {/* Left column */}
          <div className="left w-1/2 pr-8 space-y-6">
            <InputCustom
              labelClassName="w-2/5"
              placeholder="Enter your full name"
              id="name"
              label="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              name="name"
              value={values.name}
            />

            <InputCustom
              labelClassName="w-2/5 "
              placeholder="Enter your phone number"
              id="phone"
              label="Phone Number"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              name="phone"
              value={values.phone}
            />

            <div className="flex items-center">
              <div className="w-2/5">
                <label
                  htmlFor="birthday"
                  className="text-sm font-medium text-gray-900"
                >
                  Birthday
                </label>
              </div>
              <div className="w-full">
                <DatePicker
                  id="birthday"
                  onChange={onChangeDate}
                  format="DD-MM-YYYY"
                  defaultValue={dayjs(selectedUser.birthday)}
                />
                {dateErr ? (
                  <p className="text-red-500 text-sm mt-3">
                    Missing date or date from the future.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-2/5">
                <label
                  htmlFor="gender"
                  className="text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
              </div>
              <div className="w-full">
                <Select
                  id="gender"
                  placeholder="Please select your gender"
                  defaultValue={selectedUser.email ? selectedUser.gender : null}
                  options={[
                    { value: true, label: "Male" },
                    { value: false, label: "Female" },
                  ]}
                  onChange={onChangeGender}
                  onBlur={handleBlur}
                />

                {genderErr ? (
                  <p className="text-red-500 text-sm mt-3">
                    Field is required.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="dashboard-skill-input-wrapper flex">
              <div className="w-2/5 mt-2">
                <label
                  htmlFor="skill"
                  className="text-sm font-medium text-gray-900"
                >
                  Skills
                </label>
              </div>

              <div className="dashboard-skill-input w-full">
                {values.skill.length == 0 ? null : (
                  <div className="dashboard-skill-input-list">
                    <List
                      dataSource={values.skill}
                      renderItem={(item, index) => (
                        <div className="dashboard-list-item px-4 py-2">
                          <div className="flex justify-between items-center">
                            <p>{item}</p>
                            <i
                              className="fa-solid fa-trash dashboard-remove-btn text-red-500 hover:text-red-600"
                              onClick={() => {
                                handleRemoveInputListItem(
                                  values.skill,
                                  "skill",
                                  index
                                );
                              }}
                            ></i>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                )}

                <Space.Compact
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    placeholder="Add your skills here"
                    ref={skillRef}
                    id="skill-input"
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      handleAddInputListItem(
                        values.skill,
                        "skill",
                        skillRef.current.input.value
                      );
                    }}
                  >
                    Add
                  </Button>
                </Space.Compact>
              </div>
            </div>

            <div className="dashboard-skill-input-wrapper flex">
              <div className="w-2/5 mt-2">
                <label
                  htmlFor="skill"
                  className="text-sm font-medium text-gray-900"
                >
                  Certifications
                </label>
              </div>

              <div className="dashboard-skill-input w-full">
                {values.certification.length == 0 ? null : (
                  <div className="dashboard-skill-input-list">
                    <List
                      dataSource={values.certification}
                      renderItem={(item, index) => (
                        <div className="dashboard-list-item px-4 py-2">
                          <div className="flex justify-between items-center">
                            <p>{item}</p>
                            <i
                              className="fa-solid fa-trash dashboard-remove-btn text-red-500 hover:text-red-600"
                              onClick={() => {
                                handleRemoveInputListItem(
                                  values.certification,
                                  "certification",
                                  index
                                );
                              }}
                            ></i>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                )}

                <Space.Compact
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    placeholder="Add your certifications here"
                    ref={certRef}
                    id="cert-input"
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      handleAddInputListItem(
                        values.certification,
                        "certification",
                        certRef.current.input.value
                      );
                    }}
                  >
                    Add
                  </Button>
                </Space.Compact>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="right w-1/2 pl-8 space-y-6">
            <InputCustom
              labelClassName="w-2/5 "
              placeholder="Enter your email"
              id="email"
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              name="email"
              value={values.email}
            />

            <InputPasswordCustom
              placeholder="Enter your password"
              id="password"
              label="Password"
              labelClassName="w-2/5"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              name="password"
              value={values.password}
              readOnly={update}
            />

            <div className="flex items-center">
              <div className="w-2/5">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-gray-900"
                >
                  Role
                </label>
              </div>

              <div className="w-full">
                <Select
                  id="role"
                  placeholder="Please select your role"
                  defaultValue={
                    selectedUser.role != "" ? selectedUser.role : null
                  }
                  options={[
                    { value: "USER", label: "USER" },
                    { value: "ADMIN", label: "ADMIN" },
                  ]}
                  onChange={onChangeRole}
                  onBlur={handleBlur}
                />

                {roleErr ? (
                  <p className="text-red-500 text-sm mt-3">
                    Field is required.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex justify-end w-full">
              {submit ? (
                <button
                  type="submit"
                  className={`bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md p-2 mr-2 disabled:bg-gray-500`}
                >
                  Add User
                </button>
              ) : (
                <button
                  type="submit"
                  className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md p-2 mr-2 disabled:bg-gray-500`}
                >
                  Update Info
                </button>
              )}
              <button
                type="button"
                className={`bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md p-2 disabled:bg-gray-500`}
                onClick={() => {
                  handleReset();
                }}
              >
                Reset Form
              </button>
              {update ? (
                <button
                  type="button"
                  className={`bg-black hover:bg-opacity-80 text-white font-semibold rounded-md p-2 ml-2 disabled:bg-gray-500`}
                  onClick={() => {
                    dispatch(
                      handleSelectUser({
                        name: "",
                        email: "",
                        password: "",
                        phone: "",
                        birthday: "",
                        gender: true,
                        role: "",
                        skill: [],
                        certification: [],
                      })
                    );
                    setRefresh(!refresh);
                    navigate("../manage-user");
                  }}
                >
                  Back to Add User
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
