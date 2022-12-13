import {
  ReactElement,
  useState,
  ChangeEvent,
  useCallback,
  FormEvent,
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from "../utils/consts";
import {
  Button,
  Card,
  Form,
  Dropdown,
  ButtonGroup,
  Row,
  Container,
} from "react-bootstrap";
import { EUrlKeys, ICarQueryParams } from "../http/carAPI";

interface ITypeBarProps {
  queryValues: ICarQueryParams;
}

export const TypeBar = ({ queryValues }: ITypeBarProps): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const [carQueryTemp, setCarQueryTemp] =
    useState<ICarQueryParams>(queryValues);

  const onChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    setCarQueryTemp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const urlSearchParams = new URLSearchParams(location.search);

      Object.values(EUrlKeys).forEach((key) => {
        if (
          carQueryTemp &&
          carQueryTemp[key] &&
          carQueryTemp[key]!.length !== 0
        ) {
          urlSearchParams.set(key, carQueryTemp[key]!);
        } else {
          urlSearchParams.delete(key);
        }
      });
      navigate({ search: urlSearchParams.toString() });
    },
    [queryValues, carQueryTemp]
  );

  return (
    <Container className="d-flex  align-items-center ">
      <Card style={{ width: 700 }} className="p-3">
        <Form className="d-flex flex-column" onSubmit={onSubmit}>
          <h5>Brand</h5>
          <Form.Control
            name={EUrlKeys.BRAND}
            value={carQueryTemp.brand}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder="Toyota"
          />
          <h5>Model</h5>
          <Form.Control
            name={EUrlKeys.MODEL}
            value={carQueryTemp.model}
            onChange={onChange}
            className="mb-1 mx-auto"
            placeholder="Corolla"
          />
          <h5>Class</h5>
          <Form.Select
            onChange={onChange}
            name={EUrlKeys.CLASS}
            value={carQueryTemp.class_name}
          >
            <option>Choose class</option>
            <option value={"premium"}>Premium</option>
            <option value={"average"}>Average</option>
            <option value={"economy"}>Economy</option>
          </Form.Select>
          <h5>Year</h5>
          <div className="input-group input-yearrange">
            <input
              // type="number"
              name={EUrlKeys.START_YEAR}
              value={carQueryTemp.year_start}
              onChange={onChange}
              min="1990"
              max="2021"
              className="form-control"
            />
            <div className="input-group-addon">to</div>
            <input
              name={EUrlKeys.END_YEAR}
              value={carQueryTemp.year_finish}
              onChange={onChange}
              // type="number"
              min="1990"
              max="2021"
              className="form-control"
            />
          </div>
          <h5>Gearbox</h5>
          <Form.Select
            onChange={onChange}
            name={EUrlKeys.GEARBOX}
            value={carQueryTemp.gearbox_type}
          >
            <option>Choose gearbox</option>
            <option value={"manual"}>Manual</option>
            <option value={"automatic"}>Automatic</option>
            <option value={"variable"}>Variable</option>
          </Form.Select>
          <h5>Number of seats</h5>
          <Form.Control
            name={EUrlKeys.SEATS}
            value={carQueryTemp.seats_number}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder="4"
          />
          <h5>Availability</h5>
          <div className="input-group input-daterange">
            <input
              name={EUrlKeys.START_DATE}
              value={carQueryTemp.start_date}
              onChange={onChange}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              className="form-control"
            />
            <div className="input-group-addon">to</div>
            <input
              name={EUrlKeys.END_DATE}
              value={carQueryTemp.end_date}
              onChange={onChange}
              min={carQueryTemp.start_date}
              type="date"
              className="form-control"
            />
          </div>
          <Row className="d-flex justify-content-center align-items-center mx-5">
            <Button
              type={"submit"}
              className="mx-auto mt-3"
              variant={"outline-secondary"}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};
