import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Admin from "../pages/Admin/Admin";
import ManageGigs from "../pages/Admin/ManageGigs";
import ManageHiredGigs from "../pages/Admin/ManageHiredGigs";
import ManageGigCategory from "../pages/Admin/ManageGigCategory";
import ManageGigSubcategory from "../pages/Admin/ManageGigSubcategory";
import ManageComments from "../pages/Admin/ManageComments";
import JobList from "../pages/JobList/JobList";
import ManageUsers from "../pages/Admin/ManageUsers";


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
      children: [,
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
          element: <ManageHiredGigs />,
        },
        {
          path: "categories",
          element: <ManageGigCategory />,
        },
        {
          path: "subcategories",
          element: <ManageGigSubcategory />,
        },
        {
          path: "comments",
          element: <ManageComments />,
        },
      ],
    },
  ]);

  return routes;
};

export default useRoutesCustom;
