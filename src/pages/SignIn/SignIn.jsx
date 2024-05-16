import React, { useContext, useEffect } from "react";
import InputCustom from "../../components/Input/InputCustom";
import InputPasswordCustom from "../../components/Input/InputPasswordCustom";
import Lottie from "react-lottie";
import * as registerAnimation from "../../assets/animation/register.json";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
  saveLocalStorage,
} from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";
import "./signIn.scss";
import { manageUserServ } from "../../services/manageUser";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const SignIn = () => {
  // const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const userLocal = getLocalStorage("user");

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        try {
          // console.log(values)
          const res = await manageUserServ.signIn(values);
          saveLocalStorage("user", res);
          notifySuccess("Signed in successfully. Redirecting...");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          // notify(error.response.data.content);
          if (
            error.response.data.content == "Email hoặc mật khẩu không đúng !"
          ) {
            notifyErr("Incorrect email or password!");
          } else {
            notifyErrBasic();
          }
        }
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please enter username."),
        password: Yup.string().required("Please enter password"),
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
    dispatch(handleLoadingOn());
    const userLocal = getLocalStorage("user");
    if (userLocal) {
      navigate("/");
      dispatch(handleLoadingOff());
    } else {
      dispatch(handleLoadingOff());
    }

    if (userLocal) {
      navigate("/")
    }
  }, []);

  if (!userLocal) {
    return (
      <div className="signIn-container flex items-center">
        <div className="animation_signIn w-0 md:w-6/12 flex items-center lg:translate-x-20">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="form_signIn w-full md:w-6/12 flex flex-col items-center md:items-start justify-center ml-0 lg:ml-20">
          <div className="p-10 border border-gray-400 rounded-md space-y-5">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputCustom
                placeholder="Enter your username"
                id="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                name="email"
                value={values.email}
                labelClassName="w-1/2"
              />

              <InputPasswordCustom
                placeholder="Enter your password"
                id="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                name="password"
                value={values.password}
                labelClassName="w-1/2"
              />

              <div>
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 w-full"
                >
                  Sign In
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
  }

  return <Loading className="full-screen" />;
};

export default SignIn;
