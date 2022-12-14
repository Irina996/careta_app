import { ReactElement, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import Booking from "../pages/Booking";
import Rent from "../pages/Rent";
import { Fines } from "../pages/Fines";
import Admin from "../pages/Admin";
import { AdminFines } from "../pages/AdminFines";
import { AdminRent } from "../pages/AdminRent";
import Car from "../pages/Car";
import Auth from "../pages/Auth";
import Stripe from "../pages/Stripe";

import { Context } from "..";
import { useAuthContext } from "../contexts";
import UserStore from "../store/UserStore";

export const AppRouter = (): ReactElement => {
  const { isAuthenticated, role } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Auth />} />
          <Route path="/registration" element={<Auth />} />
        </>
      )}
      {isAuthenticated && role === "client" && (
        <>
          <Route path="/booking" element={<Booking />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/fines" element={<Fines />} />
          <Route path="/car/:id" element={<Car />} />
          <Route path="/payment/pay" element={<Stripe />} />
        </>
      )}
      {isAuthenticated && role === "admin" && (
        <>
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminrent" element={<AdminRent />} />
          <Route path="/adminfines" element={<AdminFines />} />
        </>
      )}
      <Route
        path="*"
        element={
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "80px" }}>Not found</span>
          </div>
        }
      />
    </Routes>
  );
};
