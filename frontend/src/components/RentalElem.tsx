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
        className="d-flex mx-5 justify-content-around align-items-center"
      >
        <h5>{rent.rent_id}</h5>
        <div className="d-flex flex-row">
          <Image width={150} height={150} src={rent.image} />
        </div>

        <div className="d-flex flex-column ">
          <h5>{rent.brand_name}</h5>
          <h5>{rent.model_name}</h5>
          <h5>{rent.gearbox}</h5>
          <h5>{rent.creation_year}</h5>
        </div>

        <div className="d-flex flex-column ">
          <h5>{rent.class_name}</h5>
          <h5>{rent.fuel_consumption}</h5>
          <h5>{rent.seats_number}</h5>
          <h5>{rent.booking_date.split('T')[0]}</h5>
        </div>

        <div className="d-flex flex-column ">
          <h5>{rent.is_driver}</h5>
          <h5>{rent.baby_seat_amount}</h5>
          <h5>{rent.cost} $</h5>
          <h5>{rent.state_name}</h5>
        </div>
        <div className="d-flex flex-column ">
          <h5>{rent.client_name}</h5>
          <h5>{rent.email}</h5>
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
