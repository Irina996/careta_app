import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { CarItemAdmin } from "./CarItemAdmin";

const CarListAdmin = observer(() => {
  const { car } = useContext(Context);
  return (
    <Row className="d-flex">
      {car.cars.map((car) => (
        <CarItemAdmin key={car.id} car={car} />
      ))}
    </Row>
  );
});

export default CarListAdmin;
