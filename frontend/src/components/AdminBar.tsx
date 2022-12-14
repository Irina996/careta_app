import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import {
  Button,
  Card,
  Form,
  Dropdown,
  ButtonGroup,
  Row,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";

import {
  createCar,
  ECarFields,
  editCar,
  IAdminFullCar,
  ICarQueryParams,
  ICreateCar,
} from "../http/carAPI";
import { useAuthContext } from "../contexts";
import CarStore from "../store/CarStore";
import { Context } from "..";

type ICreateCarState = Partial<ICreateCar>;

interface IAdminBarProps {
  currentCar?: IAdminFullCar;
}

export const AdminBar = ({ currentCar }: IAdminBarProps): ReactElement => {
  // @ts-ignore
  const [carQueryTemp, setCarQueryTemp] = useState<ICreateCarState>({
    ...(currentCar || {}),
  });
  const { car: cars } = useContext<{ car: CarStore }>(
    Context as unknown as any
  );

  const onChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    if (
      e.target.name === ECarFields.COST ||
      e.target.name === ECarFields.SEATS ||
      e.target.name === ECarFields.YEAR ||
      e.target.name === ECarFields.CONSUMPTION
    ) {
      return setCarQueryTemp((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    }
    setCarQueryTemp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { token } = useAuthContext();

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      // console.log(
      //   carQueryTemp,
      //   Object.values(carQueryTemp).every((val) => val !== undefined)
      // );
      if (!Object.values(carQueryTemp).every((val) => val !== undefined))
        return;
      if (!!currentCar) {
        // @ts-ignore
        await editCar({...carQueryTemp, id: currentCar.car_id }, token)

        try {
          cars.cars[cars.cars.findIndex(val => val.cart_id === currentCar.car_id)] = {...carQueryTemp, id: currentCar.car_id }
          cars.setCars(
            cars.cars
          );
        } catch (e) {
          console.log(e);
        }
        // TODO
      } else {
        // @ts-ignore
        createCar(carQueryTemp, token);
      }
    },
    [carQueryTemp, token, currentCar]
  );

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    setCarQueryTemp((prev) => ({
      ...prev,
      image: e.target.files && e.target.files[0],
    }));
  };

  const [fileDataUrl, setFileDataURL] = useState<string | undefined>();

  useEffect(() => {
    // @ts-ignore
    let fileReader,
      isCancel = false;
    if (carQueryTemp.image && typeof carQueryTemp.image !== "string") {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        // @ts-ignore
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(carQueryTemp.image);
    } else {
      setFileDataURL(currentCar?.image);
    }
    return () => {
      isCancel = true;
      // @ts-ignore
      if (fileReader && fileReader.readyState === 1) {
        // @ts-ignore
        fileReader.abort();
      }
    };
  }, [carQueryTemp.image]);

  return (
    <Container className="d-flex  align-items-center ">
      <Card style={{ width: 700 }} className="p-3">
        <img src={fileDataUrl || (carQueryTemp.image as unknown as string)} />
        <Form onSubmit={onSubmit} className="d-flex flex-column ">
          <Form.Control
            className="mb-1 mx-auto "
            type="file"
            onChange={selectFile}
          />
          <h5>Brand</h5>
          <Form.Control
            value={carQueryTemp.brand}
            name={ECarFields.BRAND}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder=""
          />
          <h5>Model</h5>
          <Form.Control
            value={carQueryTemp.model}
            name={ECarFields.MODEL}
            onChange={onChange}
            className="mb-1 mx-auto"
            placeholder=""
          />
          <h5>Class</h5>
          <Form.Select
            onChange={onChange}
            name={ECarFields.CLASS}
            value={carQueryTemp.car_class}
          >
            <option>Choose class</option>
            <option value={"premium"}>Premium</option>
            <option value={"average"}>Average</option>
            <option value={"economy"}>Economy</option>
          </Form.Select>

          <h5>Year</h5>
          <Form.Control
            value={carQueryTemp.creation_year}
            name={ECarFields.YEAR}
            onChange={onChange}
            className="mb-1 mx-auto"
            placeholder=""
          />
          <h5>Car number</h5>
          <Form.Control
            name={ECarFields.NUMBER}
            onChange={onChange}
            value={carQueryTemp.car_number}
            className="mb-1 mx-auto "
            placeholder=""
          />
          <h5>Color</h5>
          <Form.Control
            name={ECarFields.COLOR}
            value={carQueryTemp.color}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder=""
          />

          <h5>Gearbox</h5>
          <Form.Select
            onChange={onChange}
            name={ECarFields.GEARBOX}
            value={carQueryTemp.gearbox}
          >
            <option>Choose gearbox</option>
            <option value={"manual"}>Manual</option>
            <option value={"automatic"}>Automatic</option>
            <option value={"variable"}>Variable</option>
          </Form.Select>
          <h5>Number of seats</h5>
          <Form.Control
            name={ECarFields.SEATS}
            value={carQueryTemp.seats_number}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder=""
          />
          <h5>Fuel Consumption</h5>
          <Form.Control
            type={"number"}
            name={ECarFields.CONSUMPTION}
            value={carQueryTemp.fuel_consumption}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder=""
          />
          <h5>Cost</h5>
          <Form.Control
            type={"number"}
            name={ECarFields.COST}
            value={carQueryTemp.cost}
            onChange={onChange}
            className="mb-1 mx-auto "
            placeholder=""
          />

          <Row className="d-flex justify-content-center align-items-center mx-5">
            <Button
              type={"submit"}
              className="mx-auto mt-1"
              variant={"outline-secondary"}
            >
              {!currentCar ? "Save" : "Save changes"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};
