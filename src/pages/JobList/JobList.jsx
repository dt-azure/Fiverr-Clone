import React, { useEffect, useMemo, useState } from "react";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Loading from "../../components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Footer from "../../layouts/Footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Image,
  Pagination,
  Radio,
  RadioGroup,
  Input,
} from "@nextui-org/react";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";
import { manageGigServ } from "../../services/manageGig";
import "./jobList.scss";
import { Popover, Rate } from "antd";
import useSWR from "swr";

import { formatNumber, formatPaginationParams } from "../../utils/util";

const JobList = () => {
  //   const { isLoading } = useSelector((state) => state.loadingSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState({
    seller: false,
    budget: false,
    delivery: false,
  });
  const [budgetValue, setBudgetValue] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const filterField = document.querySelector(".filter-field");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   Helper function for useSWR hook
  const fetcher = ([pageIndex, pageSize, keyword]) =>
    manageGigServ.getGigsData(pageIndex, pageSize, keyword).then((res) => {
      if (res.data.content.totalRow != pageCount) {
        setPageCount(res.data.content.totalRow);
      }

      return res.data.content.data;
    });

  // Help with fetching data
  const { data, error, isLoading } = useSWR(
    [
      searchParams.get("page"),
      12,
      searchParams.get("query") == "all" ? "" : searchParams.get("query"),
    ],
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const rowsPerPage = 12;

  const pages = useMemo(() => {
    return pageCount ? Math.ceil(pageCount / rowsPerPage) : 0;
  }, [pageCount, rowsPerPage]);

  const generateGigItem = (gig) => {
    return (
      <Card shadow="none" radius="sm" className="gig-item">
        <Image
          radius="sm"
          width="100%"
          alt={gig.tenCongViec}
          className="w-full object-cover h-[200px] gig-photo"
          src={gig.hinhAnh}
          onClick={() => {
            navigate(`/job/${gig.id}`);
          }}
        />
        <div className="seller">
          <div className="seller-info flex  items-center">
            <div
              className="seller-avatar flex items-center justify-center"
              onClick={() => {
                navigate(`/profile/${gig.nguoiTao}`);
              }}
            >
              <img
                src={
                  "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/6476a8dae10f9b969318ac7871dfe838-1705492754110/dd369637-583e-4a2b-b494-a50203c9ed60.png"
                }
                alt=""
              />
              {/* <div className="placeholder-avatar"></div> */}
            </div>
            <div>
              <span
                className="seller-name"
                onClick={() => {
                  navigate(`/profile/${gig.nguoiTao}`);
                }}
              >
                Seller
              </span>
              <div className="rating flex ">
                <Rate disabled defaultValue={gig.saoCongViec} />
                <span className="reviews">({gig.danhGia})</span>
              </div>
            </div>
          </div>
        </div>

        <span
          className="title line-clamp-3"
          title={gig.moTaNgan}
          onClick={() => {
            navigate(`/job/${gig.id}`);
          }}
        >
          {gig.moTaNgan}
        </span>

        <span className="price">From ${gig.giaTien}</span>
      </Card>
    );
  };

  //   Only allows input that is number and no more than 5 digits
  const handleControlBudgetInput = (val) => {
    if (isNaN(val)) {
      return;
    }

    if (parseInt(val) > 99999) {
      setBudgetValue("");
    } else {
      setBudgetValue(val);
    }
  };

  //   Close all other filters when one is opened
  const handleFilterOpen = (query) => {
    let newState = { ...isFilterOpen };

    for (let [key, value] of Object.entries(newState)) {
      if (key == query) {
        newState[key] = !value;
      } else {
        newState[key] = false;
      }
    }

    setIsFilterOpen(newState);
  };

  const sellerFilter = (
    <div className="filter-modal">
      <div className="filter-style filter-selection-wrapper">
        <CheckboxGroup label="Seller Level" className="filter-selection">
          <Checkbox value="top-rated" className="checkbox-item">
            Top Rated Seller <span className="review-count">(250)</span>
          </Checkbox>
          <Checkbox value="level-1" className="checkbox-item">
            Level 1 <span className="review-count">(100)</span>
          </Checkbox>
          <Checkbox value="level-2" className="checkbox-item">
            Level 2 <span className="review-count">(100)</span>
          </Checkbox>
          <Checkbox value="new-seller" className="checkbox-item">
            New Seller <span className="review-count">(100)</span>
          </Checkbox>
        </CheckboxGroup>

        <div className="divider"></div>

        <CheckboxGroup label="Seller Type" className="filter-selection">
          <Checkbox value="agency" className="checkbox-item">
            Agency <span className="new-label">NEW</span> <span>(10)</span>
          </Checkbox>
        </CheckboxGroup>

        <div className="divider"></div>

        <CheckboxGroup label="Seller Availability" className="filter-selection">
          <Checkbox value="online-now" className="checkbox-item">
            Online Now <span>(50)</span>
          </Checkbox>
        </CheckboxGroup>

        <div className="divider"></div>

        <CheckboxGroup label="Seller speaks" className="filter-selection">
          <Checkbox value="english" className="checkbox-item">
            English <span>(50)</span>
          </Checkbox>
          <Checkbox value="urdu" className="checkbox-item">
            Urdu <span>(50)</span>
          </Checkbox>
          <Checkbox value="Hindi" className="checkbox-item">
            Hindi <span>(50)</span>
          </Checkbox>
          <Checkbox value="spanish" className="checkbox-item">
            Spanish <span>(50)</span>
          </Checkbox>
        </CheckboxGroup>
        <span className="selection-expand">+10 more</span>

        <div className="divider"></div>

        <CheckboxGroup label="Seller lives in" className="filter-selection">
          <Checkbox value="united-states" className="checkbox-item">
            United States <span>(50)</span>
          </Checkbox>
          <Checkbox value="united-kingdom" className="checkbox-item">
            United Kingdom <span>(50)</span>
          </Checkbox>
          <Checkbox value="canada" className="checkbox-item">
            Canada <span>(50)</span>
          </Checkbox>
          <Checkbox value="australia" className="checkbox-item">
            Australia <span>(50)</span>
          </Checkbox>
        </CheckboxGroup>
        <span className="selection-expand">+10 more</span>
      </div>

      <div className="filter-btn-wrapper flex items-center justify-between">
        <span>Clear All</span>
        <Button className="filter-apply-btn">Apply</Button>
      </div>
    </div>
  );

  const budgetFilter = (
    <div className="filter-modal">
      <div className="filter-style filter-radio-wrapper">
        <RadioGroup
          className="filter-radio"
          value={radioValue}
          onValueChange={setRadioValue}
        >
          <Radio value="value" className="radio-item">
            Value <span>Under $495</span>
          </Radio>
          <Radio value="mid-range" className="radio-item">
            Mid-range <span>$495 -$850</span>
          </Radio>
          <Radio value="high-end" className="radio-item">
            High-end <span className="review-count">$850 & above</span>
          </Radio>
          <Radio value="custom-budget" className="radio-item">
            Custom
          </Radio>
          <Input
            className="filter-input"
            // type="number"
            label=""
            placeholder="0.00"
            labelPlacement="inside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            value={budgetValue}
            onValueChange={(val) => {
              handleControlBudgetInput(val);
            }}
            onFocus={() => {
              setRadioValue("custom-budget");
            }}
          />
        </RadioGroup>
      </div>

      <div className="filter-btn-wrapper flex items-center justify-between">
        <span>Clear All</span>
        <Button className="filter-apply-btn">Apply</Button>
      </div>
    </div>
  );

  const deliveryTimeFilter = (
    <div className="filter-modal">
      <div className="filter-style filter-radio-wrapper">
        <RadioGroup
          className="filter-radio"
          value={radioValue}
          onValueChange={setRadioValue}
        >
          <Radio value="express" className="radio-item">
            Express 24H
          </Radio>
          <Radio value="3-day" className="radio-item">
            Up to 3 days
          </Radio>
          <Radio value="7-day" className="radio-item">
            Up to 7 days
          </Radio>
          <Radio value="anytime" className="radio-item">
            Anytime
          </Radio>
        </RadioGroup>
      </div>

      <div className="filter-btn-wrapper flex items-center justify-between">
        <span>Clear All</span>
        <Button className="filter-apply-btn">Apply</Button>
      </div>
    </div>
  );

  //   const handleGetGigsData = async (pageIndex, pageSize, keyword) => {
  //     try {
  //       const res = await manageGigServ.getGigsData(pageIndex, pageSize, keyword);

  //       setGigList(res.data.content.data);
  //       let totalPages = Math.ceil(res.data.content.totalRow / 12);
  //       if (totalPages != pageCount) {
  //         setPageCount(totalPages);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     dispatch(handleLoadingOn());
  //     let query = searchParams.get("query");
  //     let page = searchParams.get("page");
  //     console.log(query, page);
  //     if (query != "all") {
  //       handleGetGigsData(page, "12", query);
  //     } else {
  //       handleGetGigsData(page, "12", "");
  //     }

  //     // console.log(gigList);
  //   }, [searchParams]);

  //   useEffect(() => {
  //     if (data) {
  //       dispatch(handleLoadingOff());
  //     }
  //   }, [data]);

  useEffect(() => {
    dispatch(handleLoadingOn());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    //   Close all filters when click outside

    const handleClickOutside = (e) => {
      if (!filterField.contains(e.target)) {
        setIsFilterOpen({ seller: false, budget: false, delivery: false });
      }
    };

    if (filterField) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterField]);

  useEffect(() => {
    dispatch(handleLoadingOff());
    // console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <>
        <FixedHeader />
        <Loading />
        <Footer />
      </>
    );
  }
  return (
    <>
      <FixedHeader />
      <div className="gig-list-container">
        <div className="gig-list-wrapper flex flex-col items-center">
          <div className="filter-wrapper w-full">
            <div className="filter-field">
              {/* Seller details */}
              <Popover
                overlayClassName="filter-modal-overlay"
                className="filter-modal"
                placement="bottomLeft"
                trigger="click"
                content={sellerFilter}
                arrow={false}
                open={isFilterOpen.seller}
                onClick={() => {
                  handleFilterOpen("seller");
                }}
              >
                <Button className="filter-button">
                  <div className="flex items-center">
                    <span>Seller details</span>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                </Button>
              </Popover>

              {/* Budget */}
              <Popover
                overlayClassName="filter-modal-overlay"
                className="filter-modal"
                placement="bottomLeft"
                trigger="click"
                content={budgetFilter}
                arrow={false}
                open={isFilterOpen.budget}
                onClick={() => {
                  handleFilterOpen("budget");
                }}
              >
                <Button className="filter-button">
                  <div className="flex items-center">
                    <span>Budget</span>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                </Button>
              </Popover>

              {/* Delivery time */}
              <Popover
                overlayClassName="filter-modal-overlay"
                className="filter-modal"
                placement="bottomLeft"
                trigger="click"
                content={deliveryTimeFilter}
                arrow={false}
                open={isFilterOpen.delivery}
                onClick={() => {
                  handleFilterOpen("delivery");
                }}
              >
                <Button className="filter-button">
                  <div className="flex items-center">
                    <span>Delivery time</span>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                </Button>
              </Popover>
            </div>

            {pageCount == 0 ? (
              <p>No result found.</p>
            ) : (
              <p>{formatNumber(pageCount)} results</p>
            )}
          </div>
          <div className="gig-list w-full grid grid-cols-4 gap-6">
            {data.length != 0 ? data.map((gig) => generateGigItem(gig)) : null}
          </div>
          <Pagination
            total={pages}
            page={page}
            onChange={(page) => {
              setSearchParams({ query: searchParams.get("query"), page: page });
              setPage(page);
              document
                .querySelector(".gig-list-container")
                .scrollIntoView({ behavior: "smooth" });
            }}
          />
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
      <Footer />
    </>
  );
};

export default JobList;
