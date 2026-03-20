import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./components/public/homepage.jsx";
import Register from "./components/public/register.jsx";
import Login from "./components/public/login.jsx";
import Layout from "./layout.jsx";
import Dashboard from "./components/dashboard/Main_page.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Dashboard_layout from "./components/dashboard/dashboard_layout.jsx";
import Main_page from "./components/dashboard/Main_page.jsx";
import Movies from "./components/dashboard/Movies.jsx";
import Watchlist from "./components/dashboard/watchlist.jsx";
import Profile from "./components/dashboard/Profile.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import MovieDetails from "./components/dashboard/MovieDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="home" element={<Homepage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard_layout />
          </ProtectedRoutes>
        }
      >
        <Route path="main" element={<Main_page />} />
        <Route path="movies" element={<Movies />}></Route>
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>,
  ),
);
//PassWord.123
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>,
);
