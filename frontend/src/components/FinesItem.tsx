import { ReactElement, useCallback, useState } from "react";
import { Button, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts";
import { addAdminFine, IFinesList } from "../http/finesApi";

import { badRent, goodRent } from "../http/rentalApi";
import { ADMINFINES_ROUTE } from "../utils/consts";

interface IFinesElemProps {
  fines: IFinesList;

}

export const FinesItem = ({
  fines,

}: IFinesElemProps): ReactElement => {
  const navigate = useNavigate();

  const { token } = useAuthContext();

  const [fine_cost, setCost] = useState<string>();

  const onAddFine = useCallback(() => {
    if (fine_cost !== undefined) {
      addAdminFine(
        { fine_cost: Number(fine_cost), car_id: fines.car_id },
        token
      );
    }
  }, [token, fine_cost, fines.car_id]);

  return (
    <Row className="d-flex mx-5 justify-content-center align-items-center">
      <div
        style={{ background: "white", width: 800 }}
        className="d-flex mx-5 mt-2 mb-2 justify-content-around align-items-center"
      >
        <h6>{fines.fine_id}</h6>
        <div className="d-flex flex-row">
          <Image width={150} height={150} src={fines.image} />
        </div>

        <div className="d-flex mx-2 flex-column ">
          <h6>Brand: {fines.brand_name}</h6>
          <h6>Model: {fines.model_name}</h6>
          <h6>Gearbox: {fines.gearbox}</h6>
          <h6>Year: {fines.creation_year}</h6>
        </div>

        <div className="d-flex mx-2 flex-column ">
          <h6>Class: {fines.class_name}</h6>
          <h6>Fuel: {fines.fuel_consumption}</h6>
          <h6>Number of seats: {fines.seats_number}</h6>
          {/* <h6>{fines.booking_date.split("T")[0]}</h6> */}
        </div>

        <div className="d-flex mx-2 flex-column ">
          <h6>Name: {fines.client_name}</h6>
          <h6>E-mail: {fines.email}</h6>
          <h5>Cost: {fines.rent_cost} $</h5>
          {/* <h6>{fines.state_name}</h6> */}
        </div>


        <div className="d-flex flex-column ">
          <div className="d-flex mt-3 flex-row justify-content-center align-items-center ">
            <Button
              onClick={onAddFine}
              className="mx-2"
              variant={"outline-secondary"}
            >
              PAY
            </Button>
          </div>
        </div>
      </div>
    </Row>
  );
};