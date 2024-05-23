import Search from "antd/es/input/Search";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  PopoverContent,
  PopoverTrigger,
  Popover,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { manageUserServ } from "../../services/manageUser.js";
import {
  formatDate,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util.js";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import useSWR from "swr";
import { VerticalDotsIcon } from "../../components/Icons/VerticalDotsIcon.jsx";
import AddUserForm from "./AddUserForm.jsx";
import { getLocalTimeZone, today } from "@internationalized/date";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const searchRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User form
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
      if (isSubmit) {
        try {
          await manageUserServ.addUser({
            ...values,
            birthday: values.birthday.toString(),
          });
          notifySuccess("User added successfully.");
        } catch (err) {
          notifyErr("An error has occurred.");
          console.log(err);
        }
      } else {
        try {
          const newFormData = {
            id: selectedUser.id,
            name: values.name,
            email: values.email,
            phone: values.phone,
            birthday: values.birthday.toString(),
            gender: values.gender,
            role: values.role,
            skill: values.skill,
            certification: values.certification,
          };
          await manageUserServ.updateUserInfo(selectedUser.id, newFormData);
          setSearchParams(searchParams);
          notifySuccess("User info updated successfully.");
        } catch (err) {
          notifyErr("An error has occurred.");
          console.log(err);
        }
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
      password: isSubmit
        ? Yup.string()
            .required("Field is required.")
            .matches(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and have at least 8 characters."
            )
        : null,
    }),
  });

  const fetcher = ([pageIndex, pageSize, keyword]) =>
    manageUserServ
      .getUserDataWithPagination(pageIndex, pageSize, keyword)
      .then((res) => {
        console.log(res);
        setTotalCount(res.data.content.totalRow);

        return res.data.content.data;
      });

  const { data, error, isLoading, mutate } = useSWR(
    [
      searchParams.get("page"),
      pageSize,
      searchParams.get("query") == "all" ? "" : searchParams.get("query"),
    ],
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const pages = useMemo(() => {
    return data ? Math.ceil(totalCount / pageSize) : 0;
  }, [data?.length, pageSize, totalCount]);

  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

  // Take items from skills/cert list and format them into 1 str
  const formatStr = (list) => {
    let result = "";
    list.map((item) => {
      result += item + ", ";
    });
    return result.slice(0, -2);
  };

  // const handleGetUserData = async (
  //   pageIndex = "",
  //   pageSize = "",
  //   keyword = ""
  // ) => {
  //   try {
  //     setTableLoading(true);
  //     const users = await manageUserServ.getUserDataWithPagination(
  //       pageIndex,
  //       pageSize,
  //       keyword
  //     );

  //     let newUserList = [];
  //     await users.data.content.data.map((item) => {
  //       let newRow = generateRow(item);
  //       newUserList.push(newRow);
  //     });

  //     setUserList(newUserList);
  //     setTableParams({
  //       ...tableParams,
  //       pagination: {
  //         // current: 1,
  //         // pageSize: 10,
  //         total: users.data.content.totalRow,
  //       },
  //     });
  //     setTableLoading(false);
  //   } catch (err) {
  //     notifyErr("An error has occurred.");
  //     setTableLoading(false);
  //   }
  // };

  // Handle API call with search keyword when search button is pressed
  const onSearch = (value, _e, info) => {
    setSearchParams({
      page: "1",
      query: value,
    });
  };

  // Reset table when search input field is empty
  const onSearchChange = () => {
    if (searchRef.current.input.value == "") {
      setSearchParams({ page: searchParams.get("page"), query: "all" });
    }
  };

  // API call to delete user
  const handleDeleteUser = async (id) => {
    try {
      await manageUserServ.deleteUser(id);
      notifySuccess("User deleted successfully.");

      mutate([...data]);
    } catch (err) {
      notifyErr("An error has occurred.");
    }
  };

  // Pass selected user's info to store then redirect to manage user page when update button is pressed
  // const handleEditUserClick = async (user) => {
  //   dispatch(handleSelectUser(user));
  //   dispatch(handleEnableUpdateBtn());
  //   navigate(`../manage-user/${user.id}`);
  // };

  useEffect(() => {
    // handleGetUserData("1", "10");

    return () => {
      setSearchKeyword("");
    };
  }, []);

  useEffect(() => {
    // setUserList([]);
    // handleGetUserData("1", "10", searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    // Reset form when modal is closed
    if (!isOpen) {
      setIsSubmit(true);
      resetForm();
    }
  }, [isOpen]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="dashboard-title">User List</h2>
        <Button onPress={onOpen} className="admin-add-btn" radius="sm">
          Add User
        </Button>
      </div>
      <div className="search-box">
        <Search
          className="admin-search"
          placeholder="Search by account name"
          allowClear
          onSearch={onSearch}
          onChange={onSearchChange}
          ref={searchRef}
        />
      </div>

      <Table
        className="admin-table"
        classNames={{ tr: "admin-table-row" }}
        aria-label="User Table"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => {
                  setSearchParams({
                    page: page,
                    query: searchParams.get("query"),
                  });
                  setPage(page);
                }}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="phone">Phone No.</TableColumn>
          <TableColumn key="birthday">Birthday</TableColumn>
          <TableColumn key="avatar">Avatar</TableColumn>
          <TableColumn key="gender">Gender</TableColumn>
          <TableColumn key="role">Role</TableColumn>
          <TableColumn key="cert-and-skill">Cert & Skill</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody
          items={data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{formatDate(item.birthday)}</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>{item.gender ? "Male" : "Female"}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell className="flex items-center justify-center">
                <Popover placement="bottom-end" className="skill-popover">
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      disableAnimation={true}
                      disableRipple={true}
                    >
                      <i class="fa-solid fa-caret-down"></i>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="cert-and-skill space-y-4">
                      <p>
                        Skill: <span>{formatStr(item.skill)}</span>
                      </p>
                      <p>
                        Certification:{" "}
                        <span>{formatStr(item.certification)}</span>
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        disableAnimation={true}
                        disableRipple={true}
                      >
                        <VerticalDotsIcon className="text-default-300" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          setSelectedUser(item);
                          setIsSubmit(false);
                          setValues({
                            name: item.name,
                            email: item.email,
                            password: "",
                            phone: item.phone,
                            birthday: today(getLocalTimeZone()),
                            gender: item.gender,
                            role: item.role,
                            skill: item.skill,
                            certification: item.certification,
                          });
                          console.log(values);
                          onOpen();
                        }}
                        className="admin-edit-btn"
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        className="admin-delete-btn"
                        onClick={() => {
                          handleDeleteUser(item.id);
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="admin-modal"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add User</ModalHeader>
              <ModalBody>
                <AddUserForm
                  user={selectedUser}
                  isSubmit={isSubmit}
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="admin-close-btn"
                  radius="sm"
                >
                  Close
                </Button>
                {isSubmit ? (
                  <Button color="primary" onPress={handleSubmit} radius="sm">
                    Submit
                  </Button>
                ) : (
                  <Button
                    onPress={handleSubmit}
                    className="admin-update-btn"
                    radius="sm"
                  >
                    Update
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManageUsers;
