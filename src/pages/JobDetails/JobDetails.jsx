import React, { useEffect, useState } from "react";
import Footer from "../../layouts/Footer/Footer";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Loading from "../../components/Loading/Loading";
import GigInfo from "./GigInfo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { manageGigServ } from "../../services/manageGig";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";
import { ToastContainer } from "react-toastify";

const JobDetails = () => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const [gigDetails, setGigDetails] = useState({
    id: "",
    congViec: {
      id: "",
      tenCongViec: "",
      danhGia: "",
      giaTien: "",
      nguoiTao: "",
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: "",
      moTaNgan: "",
      saoCongViec: "",
    },
    tenLoaiCongViec: "",
    tenNhomChiTietLoai: "",
    tenChiTietLoai: "",
    tenNguoiTao: "",
    avatar: "",
  });
  const { gigId } = useParams();
  const dispatch = useDispatch();

  const handleGetGigDetails = async () => {
    try {
      dispatch(handleLoadingOn());
      const res = await manageGigServ.getGigDetails(gigId);
      setGigDetails(res.data.content[0]);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOff());
    }
  };

  useEffect(() => {
    // dispatch(handleLoadingOn());
    handleGetGigDetails();
  }, [gigId]);

  // useEffect(() => {
    
  // }, [gigDetails]);

  // useEffect(() => {
  //   console.log(gigDetails)
  //   dispatch(handleLoadingOff());
  // }, [gigDetails]);

  return (
    <>
      <FixedHeader />
      {isLoading ? <Loading /> : <GigInfo gigDetails={gigDetails} />}
      {/* <GigInfo /> */}
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
      <Footer />
    </>
  );
};

export default JobDetails;
