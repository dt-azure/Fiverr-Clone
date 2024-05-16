import dayjs from "dayjs";
import { toast } from "react-toastify";

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveLocalStorage = (key, data) => {
  const stringData = JSON.stringify(data);
  return localStorage.setItem(key, stringData);
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  console.log(newDate)
  if (isNaN(newDate)) {
    return date;
  }

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

export const formatDateNew = (date) => {
  const newDate = dayjs(date)

  
  if (isNaN(newDate)) {
    return date;
  }

  return newDate.format("DD/MM/YYYY")
}

export const notifySuccess = (message) => toast.success(message);
export const notifyErr = (message) => toast.error(message);
export const notifyErrBasic = () => toast.error("An error has occurred.");

export const formatPaginationParams = (pageIndex, pageSize, keyword) => {
  let apiParam = "";
  if (pageIndex != "") {
    apiParam += `pageIndex=${pageIndex}`;
  }

  if (pageSize != "") {
    apiParam += "&" + `pageSize=${pageSize}`;
  }

  if (keyword != "") {
    apiParam += "&" + `keyword=${keyword}`;
  }

  return apiParam;
};
