import React, { ReactElement, useEffect, useState } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import {
  BOOKING_ROUTE,
  HOME_ROUTE,
  ADMINFINES_ROUTE,
  // PAYMENT_ROUTE,
} from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts";
import { fetchRentalList, IRentalList } from "../http/rentalApi";
import { RentalItem } from "../components/RentalItem";

export const Rent = (): ReactElement => {
  const [rentalList, setRentalList] = useState<Array<IRentalList>>([]);

  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchRentalList(token).then((data) => setRentalList(data.data));
    }
  }, [token]);

  return (
    <>
      <Container
        style={{
          background: "lightgray",
          width: 1100,
          padding: 20,
          marginTop: 50,
        }}
      >
        <div className="d-flex mx-auto justify-content-center align-items-center ">
          <h2>Rental list</h2>
        </div>
        {rentalList && rentalList?.map((rent) => (
          <RentalItem key={rent.rent_id} rent={rent} />
        ))}
      </Container>

    </>
  );
};
