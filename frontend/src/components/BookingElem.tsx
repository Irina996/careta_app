import { ReactElement, useCallback } from "react";
import { Button, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts";

import { IBookingList, createPayment } from "../http/carAPI";
import { createCheckoutSession } from "../http/userAPI";
import { ADMINFINES_ROUTE, STRIPE_ROUTE, HOME_ROUTE } from "../utils/consts";

interface IBookingElemProps {
  book: IBookingList;
  onDelete: () => void;
}

export const BookingElem = ({
  book,
  onDelete,
}: IBookingElemProps): ReactElement => {
  const navigate = useNavigate();

  const { token } = useAuthContext()
  const {id} = useParams()

  // const onCreatePayment = useCallback(() => {
  //   // createPayment(
  //   //   { booking_id: id},
  //   //   {
  //   //     onSuccess: () => {
  //   //       navigate("/payment/pay");
  //   //     },
  //   //     token
  //   //   }
  //   // );
  // }, [id, token]);


  const onRent = useCallback(() => {
    if (token) {
      createCheckoutSession({ id: book.booking_id, payment_purpose: 'rent' }, token)
    }
  }, [book.booking_id, token])


  return (
    <Row className="d-flex mx-5 justify-content-center align-items-center">
      <div
        style={{ background: "white", width: 800 }}
        className="d-flex mx-5 mb-5 justify-content-around align-items-center"
      >
        <h5>{book.booking_id}</h5>
        <div className="d-flex flex-row">
          <Image width={170} height={150} src={book.image} />
        </div>

        <div className="d-flex flex-column ">
          <h6>Brand: {book.brand_name}</h6>
          <h6>Model: {book.model_name}</h6>
          <h6>Gearbox: {book.gearbox}</h6>
          <h6>Year: {book.creation_year}</h6>
        </div>

        <div className="d-flex flex-column ">
          <h6>Class: {book.class_name}</h6>
          <h6>Fuel: {book.fuel_consumption}</h6>
          <h6>Number of seats: {book.seats_number}</h6>
          <h6>Date: {book.booking_date.split('T')[0]}</h6>
        </div>

        <div className="d-flex flex-column ">
          <h6> </h6>
          <h6> </h6>
          <h5>Cost: {book.car_cost} $</h5>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center "> 
            <Button 
              // onClick={onCreatePayment}
              className="mb-2" 
              variant={"outline-secondary"} 
              onClick={onRent}
            > 
              Rent 
            </Button> 
            <Button 
              onClick={onDelete}
              className="mb-2" 
              variant={"outline-secondary"} 
            > 
              Cancel
            </Button> 
          </div>

      </div>
    </Row>
  );
};
