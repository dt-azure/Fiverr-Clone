import Search from "antd/es/input/Search";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";

import { notifyErr, notifyErrBasic, notifySuccess } from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { VerticalDotsIcon } from "../../components/Icons/VerticalDotsIcon";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import AddGigForm from "./AddGigForm";

const ManageGigs = () => {
  const searchRef = useRef();
  const [selectedGig, setSelectedGig] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formModal = useDisclosure();
  const avatarModal = useDisclosure();
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const fetcher = ([pageIndex, pageSize, keyword]) =>
    manageGigServ
      .getGigDataWithPagination(pageIndex, pageSize, keyword)
      .then((res) => {
        // console.log(res);
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
    setErrors,
  } = useFormik({
    initialValues: {
      nguoiTao: "",
      tenCongViec: "",
      giaTien: "",
      moTa: "",
      moTaNgan: "",
      saoCongViec: "",
      danhGia: "",
    },
    onSubmit: async () => {
      if (isSubmit) {
        try {
          let newGig = { ...values, hinhAnh: "" };
          await manageGigServ.addGig(newGig);
          notifySuccess("Gig added successfully.");
          mutate([...data]);
        } catch (err) {
          notifyErrBasic();
        }
      } else {
        try {
          await manageGigServ.updateGig(selectedGig.id, {
            ...values,
            id: selectedGig.id,
          });
          notifySuccess("Gig updated successfully.");
          mutate([...data]);
        } catch (err) {
          notifyErrBasic();
        }
      }
    },
    validationSchema: Yup.object({
      nguoiTao: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
      tenCongViec: Yup.string().required("Field is required"),
      moTa: Yup.string().required("Field is required"),
      moTaNgan: Yup.string().required("Field is required"),
      giaTien: Yup.number()
        .typeError("Invalid number.")
        .required("Field is required."),
      saoCongViec: Yup.number()
        .typeError("Rating must be a number between 0 and 5.")
        .required("Field is required.")
        .min(0, "Rating must be from 0 to 5.")
        .max(5, "Rating must be from 0 to 5."),
      danhGia: Yup.number()
        .typeError("Invalid number.")
        .required("Field is required."),
    }),
  });

  const handleUpdateAvatar = async (gigId, avatar) => {
    let formData = new FormData();

    formData.append("formFile", avatar);
    console.log(formData);
    try {
      await manageGigServ.updateGigPhoto(gigId, formData);
      mutate([...data]);
      notifySuccess("Avatar updated successfully.");
    } catch (err) {
      console.log(err);
      notifyErrBasic();
    }
  };

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

  const handleDeleteGig = (gigId) => {
    try {
      manageGigServ.deleteGig(gigId);
      notifySuccess("Gig removed successfully.");
      mutate([...data]);
    } catch (err) {
      console.log(err);
      notifyErrBasic();
    }
  };

  useEffect(() => {
    // Reset form when modal is closed
    if (!formModal.isOpen) {
      setIsSubmit(true);

      resetForm();
    }

    if (!avatarModal.isOpen) {
      setCurrentAvatar({});
    }
  }, [formModal.isOpen, avatarModal.isOpen]);

  useEffect(() => {
    if (parseInt(searchParams.get("page")) > 1) {
      setSearchParams({ query: searchParams.get("query"), page: "1" });
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between admin-dashboad-header">
        <h2 className="dashboard-title">Gig List</h2>
        <Button
          onPress={formModal.onOpen}
          className="admin-add-btn"
          radius="sm"
        >
          Add Gig
        </Button>
      </div>
      <div className="search-box">
        <Search
          className="admin-search"
          placeholder="Search by gig name"
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
          <TableColumn key="name">Gig Name</TableColumn>
          <TableColumn key="email">Seller ID</TableColumn>
          <TableColumn key="phone">Price</TableColumn>
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
              <TableCell>{item.tenCongViec}</TableCell>
              <TableCell>{item.nguoiTao}</TableCell>
              <TableCell>{item.giaTien}</TableCell>
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
                          setSelectedGig(item);
                          setIsSubmit(false);
                          setValues({
                            nguoiTao: item.nguoiTao,
                            tenCongViec: item.tenCongViec,
                            giaTien: item.giaTien,
                            moTa: item.moTa,
                            moTaNgan: item.moTaNgan,
                            saoCongViec: item.saoCongViec,
                            danhGia: item.danhGia,
                          });

                          formModal.onOpen();
                        }}
                        className="admin-edit-btn"
                      >
                        Edit
                      </DropdownItem>

                      <DropdownItem
                        className="admin-avatar-btn"
                        onClick={() => {
                          setCurrentAvatar({
                            gigId: item.id,
                            url: item.hinhAnh,
                            file: null,
                          });
                          avatarModal.onOpen();
                        }}
                      >
                        Change Gig Photo
                      </DropdownItem>

                      <DropdownItem
                        className="admin-delete-btn"
                        onClick={() => {
                          handleDeleteGig(item.id);
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

      {/* Form Modal */}
      <Modal
        isOpen={formModal.isOpen}
        onOpenChange={formModal.onOpenChange}
        className="admin-modal"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {isSubmit ? (
                <ModalHeader>Add Gig</ModalHeader>
              ) : (
                <ModalHeader>Update Gig</ModalHeader>
              )}
              <ModalBody>
                <AddGigForm
                  data={selectedGig}
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

      {/* Avatar Modal */}
      <Modal
        isOpen={avatarModal.isOpen}
        onOpenChange={avatarModal.onOpenChange}
        className="admin-modal"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Gig Photo</ModalHeader>
              <ModalBody>
                <div className="modal-item items-center">
                  <div className="avatar-input flex items-center justify-center">
                    {currentAvatar.url == "" ? (
                      <div className="placeholder-avatar"></div>
                    ) : (
                      <img src={currentAvatar.url}></img>
                    )}
                  </div>
                  <div className="input-wrapper flex-1 flex justify-center">
                    <input
                      id="avatar-input"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        let avatarURL =
                          e.target.files.length != 0
                            ? URL.createObjectURL(e.target.files[0])
                            : "";
                        setCurrentAvatar({
                          gigId: currentAvatar.gigId,
                          url: avatarURL,
                          file: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="admin-close-btn"
                  radius="sm"
                >
                  Close
                </Button>

                <Button
                  onPress={() => {
                    if (currentAvatar) {
                      handleUpdateAvatar(
                        currentAvatar.gigId,
                        currentAvatar.file
                      );
                    }
                  }}
                  className="admin-update-btn"
                  radius="sm"
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManageGigs;
