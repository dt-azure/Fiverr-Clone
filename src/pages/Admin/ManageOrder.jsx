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

const ManageOrder = () => {
  const [totalCount, setTotalCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isSubmit, setIsSubmit] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState({
    id: 0,
    maCongViec: 0,
    maNguoiThue: 0,
    ngayThue: "",
    hoanThanh: false,
  });

  const fetcher = ([pageIndex, pageSize, keyword]) =>
    manageGigServ
      .getOrderDataWithPagination(pageIndex, pageSize, keyword)
      .then((res) => {
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
      id: 0,
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: false,
    },
    onSubmit: async () => {
      if (isSubmit) {
        try {
          await manageGigServ.addOrder(values);
          notifySuccess("Order added successfully.");
        } catch (err) {
          notifyErrBasic();
        }
      } else {
        try {
          console.log(values);
          await manageGigServ.updateOrder(selectedOrder.id, values);
          mutate([...data]);
          notifySuccess("Order updated successfully.");
        } catch (err) {
          notifyErrBasic();
        }
      }
    },
    validationSchema: Yup.object({
      maCongViec: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
      maNguoiThue: Yup.number()
        .typeError("Invalid ID.")
        .required("Field is required."),
    }),
  });

  const handleDeleteOrder = async (orderId) => {
    try {
      await manageGigServ.deleteOrder(orderId);
      mutate([...data]);

      notifySuccess("Order deleted successfully.");
    } catch (err) {
      notifyErrBasic();
    }
  };

  useEffect(() => {
    // Reset form when modal is closed
    if (!isOpen) {
      setIsSubmit(true);

      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (parseInt(searchParams.get("page")) > 1) {
      setSearchParams({ query: searchParams.get("query"), page: "1" });
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between admin-dashboad-header">
        <h2 className="dashboard-title">Order List</h2>
        <Button onPress={onOpen} className="admin-add-btn" radius="sm">
          Add Order
        </Button>
      </div>

      <Table
        className="admin-table order-table"
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
          <TableColumn key="id">Order ID</TableColumn>
          <TableColumn key="name">Gig ID</TableColumn>
          <TableColumn key="email">Buyer ID</TableColumn>
          <TableColumn key="phone">Order Date</TableColumn>
          <TableColumn key="phone">Status</TableColumn>
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
              <TableCell>{item.maCongViec}</TableCell>
              <TableCell>{item.maNguoiThue}</TableCell>
              <TableCell>{formatDate(item.ngayThue)}</TableCell>
              <TableCell>
                {item.hoanThanh ? (
                  <p className="text-green-500 font-bold">Finished</p>
                ) : (
                  <p className="text-orange-600 font-bold">Ongoing</p>
                )}
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
                          setSelectedOrder(item);
                          setIsSubmit(false);

                          setValues({
                            id: item.id,
                            maCongViec: item.maCongViec,
                            maNguoiThue: item.maNguoiThue,
                            ngayThue: today(getLocalTimeZone()),
                            hoanThanh: values.hoanThanh,
                          });

                          onOpen();
                        }}
                        className="admin-edit-btn"
                      >
                        Edit
                      </DropdownItem>

                      <DropdownItem
                        className="admin-delete-btn"
                        onClick={() => {
                          handleDeleteOrder(item.id);
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
              {isSubmit ? (
                <ModalHeader>Add Gig</ModalHeader>
              ) : (
                <ModalHeader>Update Gig</ModalHeader>
              )}
              <ModalBody>
                <AddOrderForm
                  data={selectedOrder}
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
    </>
  );
};

export default ManageOrder;
