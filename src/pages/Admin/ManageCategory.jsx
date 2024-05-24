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
import {
  formatDate,
  notifyErr,
  notifyErrBasic,
  notifySuccess,
} from "../../utils/util";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { VerticalDotsIcon } from "../../components/Icons/VerticalDotsIcon";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getLocalTimeZone, today } from "@internationalized/date";
import AddOrderForm from "./AddOrderForm";
import Search from "antd/es/input/Search";
import AddCategoryForm from "./AddCategoryForm";

const ManageCategory = () => {
  const searchRef = useRef();
  const [totalCount, setTotalCount] = useState(0);
  const formModal = useDisclosure();
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const fetcher = ([pageIndex, pageSize, keyword]) =>
    manageGigServ
      .getGigCategoryWithPagination(pageIndex, pageSize, keyword)
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
      category: "",
    },
    onSubmit: async () => {
      if (isSubmit) {
        try {
          await manageGigServ.addGigCategory({
            tenLoaiCongViec: values.category,
          });
          mutate([...data]);
          notifySuccess("Category added successfully.");
        } catch (err) {
          // console.log(err);
          notifyErrBasic();
        }
      } else {
        try {
          console.log(values);
          await manageGigServ.updateGigCategory(values.id, {
            id: values.id,
            tenLoaiCongViec: values.category,
          });
          mutate([...data]);
          notifySuccess("Category updated successfully.");
        } catch (err) {
          // console.log(err);
          notifyErrBasic();
        }
      }
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Field is required"),
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
        className="admin-table category-table"
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
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="name">Category</TableColumn>
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
              <TableCell>{item.tenLoaiCongViec}</TableCell>
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

                          setValues({
                            id: item.id,
                            category: item.tenLoaiCongViec,
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
                          // photoModal.onOpen();
                        }}
                      >
                        Change Category Photo
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
                <ModalHeader>Add Category</ModalHeader>
              ) : (
                <ModalHeader>Update Category</ModalHeader>
              )}
              <ModalBody>
                <AddCategoryForm
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
    </>
  );
};

export default ManageCategory;
