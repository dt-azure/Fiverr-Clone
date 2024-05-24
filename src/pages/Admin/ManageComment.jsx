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
import { manageCommentServ } from "../../services/manageComment";
import { http } from "../../services/config";
import AddCommentForm from "./AddCommentForm";

const ManageComment = () => {
  const [totalCount, setTotalCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedComment, setSelectedComment] = useState({});

  const fetcher = (url) =>
    http.get(url).then((res) => {
      setTotalCount(res.data.content.length);

      return res.data.content;
    });

  const { data, error, isLoading, mutate } = useSWR(`/binh-luan`, fetcher, {
    keepPreviousData: true,
  });

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
      content: "",
      rating: "",
    },
    onSubmit: async () => {
      try {
        let newComment = {
          id: selectedComment.id,
          maCongViec: selectedComment.maCongViec,
          maNguoiBinhLuan: selectedComment.maNguoiBinhLuan,
          ngayBinhLuan: selectedComment.ngayBinhLuan,
          noiDung: values.content,
          saoBinhLuan: values.rating,
        };
        await manageCommentServ.updateComment(selectedComment.id, newComment);
        mutate([...data]);
        notifySuccess("Comment updated successfully.");
      } catch (err) {
        notifyErrBasic();
      }
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment cannot be empty."),
      rating: Yup.number()
        .typeError("Rating has to be a number")
        .required("Field is required.")
        .min(0, "Rating must be from 0 to 5.")
        .max(5, "Rating must be from 0 to 5."),
    }),
  });

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }
    let newData = [...data];
    return newData.slice(10 * (page - 1), 10 * page - 1);
  }, [data, page]);

  const handleDeleteComment = async (commentId) => {
    try {
      await manageCommentServ.deleteComment(commentId);
      mutate([...data]);

      notifySuccess("Comment deleted successfully.");
    } catch (err) {
      console.log(err);
      notifyErrBasic();
    }
  };

  useEffect(() => {
    // Reset form when modal is closed
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center justify-between admin-dashboad-header">
        <h2 className="dashboard-title">Order List</h2>
        {/* <Button onPress={onOpen} className="admin-add-btn" radius="sm">
          Add Comment
        </Button> */}
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
                  setPage(page);
                  mutate([...data].slice(10 * (page - 1), 10 * page - 1));
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
          <TableColumn key="id">Comment ID</TableColumn>
          <TableColumn key="name">Gig ID</TableColumn>
          <TableColumn key="email">Commenter ID</TableColumn>
          <TableColumn key="phone">Date</TableColumn>
          <TableColumn key="phone">Rating</TableColumn>
          <TableColumn key="phone">Content</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody
          items={filteredData ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.maCongViec}</TableCell>
              <TableCell>{item.maNguoiBinhLuan}</TableCell>
              <TableCell>{formatDate(item.ngayBinhLuan)}</TableCell>
              <TableCell className="flex justify-center items-center">
                <p className="mr-2">{item.saoBinhLuan}</p>
                <i className="fa-solid fa-star"></i>
              </TableCell>
              <TableCell>{item.noiDung}</TableCell>
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
                          setSelectedComment(item);
                          setValues({
                            rating: item.saoBinhLuan,
                            content: item.noiDung,
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
                          handleDeleteComment(item.id);
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
              <ModalHeader>Update Comment</ModalHeader>

              <ModalBody>
                <AddCommentForm
                  data={selectedComment}
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

                <Button
                  onPress={handleSubmit}
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

export default ManageComment;
