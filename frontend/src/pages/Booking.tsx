import React, { ReactElement, useEffect, useCallback, useState } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import {
  BOOKING_ROUTE,
  HOME_ROUTE,
  ADMINFINES_ROUTE,
  // PAYMENT_ROUTE,
} from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts";
import { deleteBooking, fetchBookingList,  createPayment, IBookingList } from "../http/carAPI";
import { BookingElem } from "../components/BookingElem";

export const Booking = (): ReactElement => {
  const [bookingList, setBookingList] = useState< Array<IBookingList>
  

  >([]);

  const { token } = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      fetchBookingList(token).then((data) => setBookingList(data.data));
    }
  }, [token]);

  const onDelete = useCallback(
    async (id: number) => {
      if (bookingList && bookingList.length !== 0) {
        await deleteBooking({ id }, token);
        setBookingList(
          (prev) => prev?.filter((curr) => curr.booking_id !== id) || []
        );
      }
    },
    [bookingList, token]
  );



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
          <h2>Booking list</h2>
        </div>
        {bookingList && bookingList?.map((book) => (
          <BookingElem onDelete={() => onDelete(book.booking_id)} key={book.booking_id} book={book} />
        ))}

        
      </Container>
      
    </>
  );
};

