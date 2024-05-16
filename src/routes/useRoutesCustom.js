import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Admin from "../pages/Admin/Admin";
import ManageUsers from "../pages/Admin/ManageUsers";
import AddUser from "../pages/Admin/AddUser";
import ManageGigs from "../pages/Admin/ManageGigs";
import ManageHiredGigs from "../pages/Admin/ManageHiredGigs";
import ManageGigCategory from "../pages/Admin/ManageGigCategory";
import ManageGigSubcategory from "../pages/Admin/ManageGigSubcategory";
import ManageComments from "../pages/Admin/ManageComments";

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
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true,
          element: <AddUser />,
        },
        {
          path: "users",
          element: <ManageUsers />,
        },
        {
          path: "manage-user",
          element: <AddUser />,
        },
        {
          path: "manage-user/:userId",
          element: <AddUser />,
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
