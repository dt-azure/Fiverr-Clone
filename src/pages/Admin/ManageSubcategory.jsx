import React, { useEffect, useMemo, useRef, useState } from "react";
import { manageGigServ } from "../../services/manageGig";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
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
import {
  formatDate,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VerticalDotsIcon } from "../../components/Icons/VerticalDotsIcon";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import Search from "antd/es/input/Search";
import AddSubcategoryForm from "./AddSubcategoryForm";

const ManageSubcategory = () => {
  const searchRef = useRef();
  const [totalCount, setTotalCount] = useState(0);
  const formModal = useDisclosure();
  const photoModal = useDisclosure();
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [currentPhoto, setCurrentPhoto] = useState("");

  const fetcher = ([pageIndex, pageSize, keyword]) =>
    manageGigServ
      .getGigSubcategoryWithPagination(pageIndex, pageSize, keyword)
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
  } = useFormik({
    initialValues: {
      maLoaiCongviec: "",
      dsChiTietLoai: [],
      tenNhom: "",
    },
    onSubmit: async () => {
      console.log(values);
      if (isSubmit) {
        try {
          await manageGigServ.addGigSubcategoryGroup({
            tenChiTiet: values.tenNhom,
            maLoaiCongViec: values.maLoaiCongviec,
            danhSachChiTiet: [],
          });
          mutate([...data]);
          notifySuccess("Subcategory group added successfully.");
        } catch (err) {
          console.log(err);
          notifyErrBasic();
        }
      } else {
        try {
          await manageGigServ.updateGigSubcategoryGroup(values.id, {
            id: values.id,
            tenChiTiet: values.tenChiTiet,
            maLoaiCongViec: values.maLoaiCongviec,
            danhSachChiTiet: values.dsChiTietLoai,
          });
          mutate([...data]);
          notifySuccess("Subcategory group updated successfully.");
        } catch (err) {
          console.log(err);
          notifyErrBasic();
        }
      }
    },
    validationSchema: Yup.object({
      tenNhom: Yup.string().required("Field is required."),
      maLoaiCongviec: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
    }),
  });

  const handleDeleteCategory = async (cateId) => {
    try {
      await manageGigServ.deleteGigCategory(cateId);
      mutate([...data]);

      notifySuccess("Category deleted successfully.");
    } catch (err) {
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

  const handleUpdatePhoto = async (groupId, avatar) => {
    let formData = new FormData();

    formData.append("formFile", avatar);

    try {
      await manageGigServ.updateGigSubcategoryGroupPhoto(groupId, formData);
      mutate([...data]);
      notifySuccess("Photo updated successfully.");
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
  }, [formModal.isOpen]);

  useEffect(() => {
    if (parseInt(searchParams.get("page")) > 1) {
      setSearchParams({ query: searchParams.get("query"), page: "1" });
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between admin-dashboad-header">
        <h2 className="dashboard-title">Category List</h2>
        <Button
          onPress={formModal.onOpen}
          className="admin-add-btn"
          radius="sm"
        >
          Add Category
        </Button>
      </div>

      <div className="search-box">
        <Search
          className="admin-search"
          placeholder="Search by category"
          allowClear
          onSearch={onSearch}
          onChange={onSearchChange}
          ref={searchRef}
        />
      </div>

      <Table
        className="admin-table"
        classNames={{ tr: "admin-table-row" }}
        aria-label="Order Table"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center admin-pagination">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                initialPage={page}
                page={page}
                total={pages}
                onChange={(page) => {
                  setSearchParams({
                    page: page,
                    query: searchParams.get("query"),
                  });
                  setPage(page);

                  setTimeout(() => {
                    document
                      .querySelector(".admin-pagination")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="id">Category ID</TableColumn>
          <TableColumn key="maLoaiCongviec">Sub Group ID</TableColumn>
          <TableColumn key="tenNhom">Sub Group Name</TableColumn>
          <TableColumn key="hinhAnh">Sub Group Photo</TableColumn>
          <TableColumn key="dsChiTietLoai">Subcategories</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody
          items={data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?.id}>
              <TableCell>{item.maLoaiCongviec}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.tenNhom}</TableCell>
              <TableCell>
                <div className="dashboard-avatar flex items-center justify-center">
                  {item.hinhAnh == "" ? (
                    <div className="placeholder-avatar"></div>
                  ) : (
                    <img src={item.hinhAnh}></img>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">Expand</div>
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
                          setIsSubmit(false);
                          setSelectedGroup(item);
                          setValues({
                            id: item.id,
                            tenChiTiet: "",
                            maLoaiCongviec: item.maLoaiCongviec,
                            dsChiTietLoai: item.dsChiTietLoai,
                            tenNhom: item.tenNhom,
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
                 
                          setCurrentPhoto({
                            groupId: item.id,
                            url: item.hinhAnh,
                            file: null,
                          });
                          photoModal.onOpen();
                        }}
                      >
                        Change Group Photo
                      </DropdownItem>

                      <DropdownItem
                        className="admin-delete-btn"
                        onClick={() => {
                          handleDeleteCategory(item.id);
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
                <ModalHeader>Add Subcategory Group</ModalHeader>
              ) : (
                <ModalHeader>Update Subcategory Group</ModalHeader>
              )}
              <ModalBody>
                <AddSubcategoryForm
                  data={selectedGroup}
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
                  onPress={formModal.onClose}
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

      {/* Photo Modal */}
      <Modal
        isOpen={photoModal.isOpen}
        onOpenChange={photoModal.onOpenChange}
        className="admin-modal"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Subcategory Group Photo</ModalHeader>
              <ModalBody>
                <div className="modal-item items-center">
                  <div className="avatar-input flex items-center justify-center">
                    {currentPhoto.url == "" ? (
                      <div className="placeholder-avatar"></div>
                    ) : (
                      <img src={currentPhoto.url}></img>
                    )}
                  </div>
                  <div className="input-wrapper flex-1 flex justify-center">
                    <input
                      id="avatar-input"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        let photoURL =
                          e.target.files.length != 0
                            ? URL.createObjectURL(e.target.files[0])
                            : "";
                        setCurrentPhoto({
                          groupId: currentPhoto.groupId,
                          url: photoURL,
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
                    if (currentPhoto) {
                      handleUpdatePhoto(
                        currentPhoto.groupId,
                        currentPhoto.file
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

export default ManageSubcategory;
