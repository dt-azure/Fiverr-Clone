import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Admin from "../pages/Admin/Admin";
import ManageGigs from "../pages/Admin/ManageGigs";
import ManageGigSubcategory from "../pages/Admin/ManageGigSubcategory";
import JobList from "../pages/JobList/JobList";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageOrder from "../pages/Admin/ManageOrder";
import ManageCategory from "../pages/Admin/ManageCategory";
import ManageComment from "../pages/Admin/ManageComment";
import ManageSubcategory from "../pages/Admin/ManageSubcategory";


const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/job/:gigId",
      element: <JobDetails />,
    },
    {
      path: "/profile/:profileId",
      element: <Profile />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/gigs",
      element: <JobList />,
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        ,
        {
          path: "users",
          element: <ManageUsers />,
        },
        {
          path: "gigs",
          element: <ManageGigs />,
        },
        {
          path: "order",
          element: <ManageOrder />,
        },
        {
          path: "category",
          element: <ManageCategory />,
        },
        {
          path: "subcategory",
          element: <ManageSubcategory />,
        },
        {
          path: "comment",
          element: <ManageComment />,
        },
      ],
    },
  ]);

  return routes;
};

export default useRoutesCustom;
