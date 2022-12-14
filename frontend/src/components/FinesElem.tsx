import { ReactElement, useCallback, useState } from "react";
import { Button, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts";
import { addAdminFine, IFinesList } from "../http/finesApi";

import { badRent, goodRent } from "../http/rentalApi";
import { ADMINFINES_ROUTE } from "../utils/consts";

interface IFinesElemProps {
  fines: IFinesList;
  onDelete: () => void;
}

export const FinesElem = ({
  fines,
  onDelete,
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
        className="d-flex mx-5 justify-content-around align-items-center"
      >
        <h5>{fines.fine_id}</h5>
        <div className="d-flex flex-row">
          <Image width={150} height={150} src={fines.image} />
        </div>

        <div className="d-flex flex-column ">
          <h5>{fines.brand_name}</h5>
          <h5>{fines.model_name}</h5>
          <h5>{fines.gearbox}</h5>
          <h5>{fines.creation_year}</h5>
        </div>

        <div className="d-flex flex-column ">
          <h5>{fines.class_name}</h5>
          <h5>{fines.fuel_consumption}</h5>
          <h5>{fines.seats_number}</h5>
          {/* <h5>{fines.booking_date.split("T")[0]}</h5> */}
        </div>

        <div className="d-flex flex-column ">
          <h5>{fines.is_driver}</h5>
          <h5>{fines.baby_seat_amount}</h5>
          <h5>{fines.rent_cost}</h5>
          {/* <h5>{fines.state_name}</h5> */}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center ">
          <div className="d-flex flex-column">
            {/* <h5>{fines.time}</h5> */}
            <h5>{fines.rent_cost}</h5>
          </div>
        </div>
        <div className="d-flex flex-column ">
          <h5>{fines.client_name}</h5>
          <h5>{fines.email}</h5>
          {/* <h5>{fines.state_name}</h5> */}
        </div>

        <div className="d-flex flex-column ">
          <h6>Add fine's cost:</h6>
          <Form.Control
            onChange={(e) => setCost(e.target.value)}
            className="mt-3"
            placeholder=""
            type="number"
          />
          <div className="d-flex mt-3 flex-row justify-content-center align-items-center ">
            <Button
              onClick={onDelete}
              className="mx-2"
              variant={"outline-secondary"}
            >
              DELETE
            </Button>
            <Button
              onClick={onAddFine}
              className="mx-2"
              variant={"outline-secondary"}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </Row>
  );
};
