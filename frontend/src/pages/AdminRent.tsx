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
import { fetchAdminRentalList, IRentalList } from "../http/rentalApi";
import { RentalElem } from "../components/RentalElem";

export const AdminRent = (): ReactElement => {
  const [rentalList, setRentalList] = useState<{
    active: Array<IRentalList>;
    history: [Array<IRentalList>, Array<IRentalList>];
  }>();

  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchAdminRentalList(token).then((data) => setRentalList(data.data));
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
        {rentalList?.active?.map((rent) => (
          <RentalElem key={rent.rent_id} rent={rent} />
        ))}
      </Container>
      <Container
        style={{
          background: "lightgray",
          width: 1100,
          padding: 20,
          marginTop: 50,
        }}
      >
        <div className="d-flex mx-auto justify-content-center align-items-center ">
          <h2>Rental history</h2>
        </div>
        {rentalList?.history &&
          rentalList.history[0] &&
          rentalList.history[0].length !== 0 && (
            <>
              <h2>Good</h2>
              {rentalList.history[0].map((rent) => (
                <RentalElem key={rent.rent_id} rent={rent} isHistory />
              ))}
            </>
          )}
        {rentalList?.history &&
          rentalList.history[1] &&
          rentalList.history[1].length !== 0 && (
            <>
              <h2>Bad</h2>
              {rentalList.history[1].map((rent) => (
                <RentalElem key={rent.rent_id} rent={rent} isHistory />
              ))}
            </>
          )}
      </Container>
    </>
  );
};
