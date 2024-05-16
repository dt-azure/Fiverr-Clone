import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import Lottie from "react-lottie";
import * as registerAnimation from "../../assets/animation/register.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  notifyErrBasic,
  saveLocalStorage,
} from "../../utils/util";
import InputPasswordCustom from "../../components/Input/InputPasswordCustom";
import { useDispatch, useSelector } from "react-redux";
import "./signUp.scss";
import { DatePicker, Select } from "antd";
import { current } from "@reduxjs/toolkit";
import { manageUserServ } from "../../services/manageUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const dispatch = useDispatch();
  let userLocal = getLocalStorage("user");
  const [dateErr, setDateErr] = useState(false);
  const [genderErr, setgenderErr] = useState(false);
  const notify = (message) => toast.success(message);

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
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "USER",
      skill: [],
      certification: [],
    },
    onSubmit: async (values) => {
      console.log(typeof values.gender != "boolean");
      if (values.birthday == "") {
        setDateErr(true);
      }

      if (typeof values.gender != "boolean") {
        setgenderErr(true);
      }

      if (values.birthday == "" || typeof values.gender != "boolean") {
        return;
      }

      try {
        const res = await manageUserServ.signUp({ ...values });

        const user = await manageUserServ.signIn({
          email: values.email,
          password: values.password,
        });
        saveLocalStorage("user", user);
        notify("Sign up successful. Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, "2000");
      } catch (err) {
        notifyErrBasic();
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
      password: Yup.string()
        .required("Field is required.")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and have at least 8 characters."
        ),
    }),
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    // if (update) {
    //   let user = userLocal.data.content;
    //   setValues({
    //     taiKhoan: user.taiKhoan,
    //     matKhau: "",
    //     email: user.email,
    //     soDt: user.soDT,
    //     hoTen: user.hoTen,
    //   });
    // }

    let windowWidth = window.innerWidth;
    if (windowWidth < 1024) {
      setDimensions({ width: 300, height: 300 });
    }

    // return () => {
    //   dispatch(handleEnableSubmitBtn());
    // };
  }, []);

  return (
    <div className="signUp-container flex items-start">
      <div className="animation_signUp w-0 md:w-1/3 lg:w-5/12 flex items-center md:translate-x-10 lg:translate-x-20">
        <Lottie
          options={defaultOptions}
          height={dimensions.height}
          width={dimensions.width}
        />
      </div>
      <div className="form_signUp w-full md:w-2/3 lg:w-7/12 flex justify-start ml-0 md:ml-20 px-8 lg:px-0">
        <div className="mt-10 lg:mt-0 p-4 md:p-10 border border-gray-400 rounded-md space-y-5 w-full lg:w-2/3">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputCustom
              labelClassName="w-1/2 "
              placeholder="Enter your full name"
              id="name"
              label="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              name="name"
              value={values.name}
              // disabled={update ? true : false}
            />

            {/* <InputCustom
              labelClassName="w-1/2 "
              type="password"
              placeholder="Enter your password"
              id="matKhau"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
            /> */}

            <InputCustom
              labelClassName="w-1/2 "
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
              labelClassName="w-1/2"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              name="password"
              value={values.password}
            />

            <InputCustom
              labelClassName="w-1/2 "
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

            <div className="flex">
              <div className="w-1/2">
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
                />
                {dateErr ? (
                  <p className="text-red-500 text-sm mt-3">
                    Missing date or date from the future.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
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
                  defaultValue="Please select your gender"
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

            <div>
              {/* {submit ? (
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 w-full"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 w-full"
                >
                  Update
                </button>
              )} */}
              <button
                type="submit"
                className="bg-black text-white rounded-md py-2 w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignUp;
