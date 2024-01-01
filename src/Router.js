import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Auth from "./auth/Auth";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Registration";
import Snackbar from "./components/snackbar/Snackbar";
import AlertDialog from "./components/alertDialog/AlertDialog";
import { logOut } from "./redux/authSlice";
import NotFound from "./pages/notFound/NotFound";
import Wishlist from "./pages/wishlist/Wishlist2";
import ItemDetails from "./pages/wishlist/ItemDetails";
import TableComponent from "./pages/search/SearchResults";

export default function Router() {
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    msg: "",
    severity: "error",
  });

  const [alertOpen, setAlertOpen] = useState(false);

  const dispatch = useDispatch();

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    dispatch(logOut());
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProps({ ...snackbarProps, open: false });
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setSnackbarProps={setSnackbarProps} />}/>
        <Route path="/register" element={<Register setSnackbarProps={setSnackbarProps} />}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route exact path="/item" element={<ItemDetails/>} />
        <Route path="/search/:query" element={<TableComponent />} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Snackbar
        snackbarOpen={snackbarProps.open}
        msg={snackbarProps.msg}
        severity={snackbarProps.severity}
        handleClose={handleSnackbarClose}
      />
      <AlertDialog open={alertOpen} handleClose={handleAlertClose} />
    </>
  );
}
