import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { deleteCar, fetchAdminOneCar, IAdminFullCar, ICar } from "../http/carAPI";
import { useAuthContext } from "../contexts";
import { Context } from "..";
import CarStore from "../store/CarStore";
import { AdminBar } from "./AdminBar";

export const CarItemAdmin = ({ car }: { car: ICar & { car_id: number } }) => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const { car: cars } = useContext<{ car: CarStore }>(
    Context as unknown as any
  );

  console.log(cars);

  const [current, setCurrent] = useState<number | undefined>(undefined);
  const [currentCar, setCurrentCar] = useState<IAdminFullCar | undefined>();

  const handleClose = () => {
    setCurrent(undefined);
    setCurrentCar(undefined);
  };

  useEffect(() => {
    if (current) {
      fetchAdminOneCar(current, token).then((data) => setCurrentCar(data.data));
    }
  }, [current]);

  const onDeleteCar = useCallback(async () => {
    await deleteCar({ id: car.car_id }, token);

    try {
      cars.setCars(
        cars.cars.filter((current) => current.car_id !== car.car_id)
      );
    } catch (e) {
      console.log(e);
    }
  }, [car.car_id, token]);

  return (
    <Col md={3}>
      <Card
        style={{ width: 200 }}
        border={"dark"}
        className="d-flex mx-auto mb-5 flex-column align-items-center "
      >
        <Image width={190} height={170} src={car.image} />
        <div className="d-flex flex-column align-items-center ">
          <h6>{car.brand_name}</h6>
          <h6>{car.model_name}</h6>
          <h6>{car.car_cost + " $"}</h6>
          <Row className="d-flex space-between flex-row">
            <Button
              className="mx-auto mb-3"
              variant={"outline-secondary"}
              onClick={() => setCurrent(car.car_id)}
            >
              Edit
            </Button>
            <Button
              className="mx-auto mb-3"
              variant={"outline-secondary"}
              onClick={onDeleteCar}
            >
              Delete
            </Button>
          </Row>
        </div>
      </Card>
      <Modal show={!!currentCar} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminBar currentCar={currentCar} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Col>
  );
};
