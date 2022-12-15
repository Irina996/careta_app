import { ReactElement, useCallback } from "react";
import { Button, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts";

import { badRent, goodRent, IRentalList } from "../http/rentalApi";
import { ADMINFINES_ROUTE } from "../utils/consts";

interface IRentalElemProps {
  rent: IRentalList;
  isHistory?: boolean;
}

export const RentalElem = ({
  rent,
  isHistory,
}: IRentalElemProps): ReactElement => {
  const navigate = useNavigate();

  const { token } = useAuthContext()

  const onBad = useCallback(async () => {
    await badRent({ id: rent.rent_id }, token)
    navigate(ADMINFINES_ROUTE);

  }, [rent.rent_id, token])

  const onGood = useCallback(async () => {
    await goodRent({ id: rent.rent_id }, token)
    navigate('/admin');
  }, [rent.rent_id, token])

  return (
    <Row className="d-flex mx-5 justify-content-center align-items-center">
      <div
        style={{ background: "white", width: 800 }}
        className="d-flex mx-5 mt-2 mb-2 justify-content-around align-items-center"
      >
        <h6>{rent.rent_id}</h6>
        <div className="d-flex flex-row">
          <Image width={150} height={150} src={rent.image} />
        </div>

        <div className="d-flex mx-2 flex-column ">
          <h6>Brand: {rent.brand_name}</h6>
          <h6>Model: {rent.model_name}</h6>
          <h6>Gearbox: {rent.gearbox}</h6>
          <h6>Year: {rent.creation_year}</h6>
        </div>

        <div className="d-flex mx-2 flex-column ">
          <h6>Class: {rent.class_name}</h6>
          <h6>Fuel: {rent.fuel_consumption}</h6>
          <h6>Number of seats: {rent.seats_number}</h6>
          <h6>Date: {rent.booking_date.split('T')[0]}</h6>
        </div>

        <div className="d-flex mx-2 flex-column ">
          <h6>Name: {rent.client_name}</h6>
          <h6>E-mail: {rent.email}</h6>
          <h5>Cost: {rent.cost} $</h5>
          <h6>State: {rent.state_name}</h6>
        </div>

        {!isHistory && (
          <div className="d-flex flex-row justify-content-center align-items-center ">
            <Button onClick={onGood} className="mx-2" variant={"outline-secondary"}>
              GOOD
            </Button>
            <Button
              onClick={onBad}
              className="mx-2"
              variant={"outline-secondary"}
            >
              BAD
            </Button>
          </div>
        )}
      </div>
    </Row>
  );
};
