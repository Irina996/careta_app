import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Booking from "../pages/Booking";
import Rent from "../pages/Rent";
import Admin from "../pages/Admin";
import { Button, Card, Form, ButtonGroup, Row } from "react-bootstrap";
import Car from "../pages/Car";
import Auth from "../pages/Auth";
import { HOME_ROUTE } from "../utils/consts";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const BrandBar = observer(() => {
  const { car } = useContext(Context);

  return (
    <Row className="d-flex">
      {car.brand.map((brand) => (
        <Card
          key={brand.id}
          className="p-3"
          onClick={() => car.setSelectedBrand(brand)}
          border={brand.id === car.selectedBrand.id ? "info" : "light"}
          style={{ cursor: "pointer" }}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
