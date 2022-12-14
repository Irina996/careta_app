import React from "react";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import CarListAdmin from "../components/CarListAdmin";
import { AdminBar } from "../components/AdminBar";
import { fetchAdminCar, fetchCar, fetchType } from "../http/carAPI";
import { Context } from "../index";
import { useAuthContext } from "../contexts";

const Admin = observer(() => {
  const { car } = useContext(Context);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchAdminCar(token).then((data) => car.setCars(data.data));
    }
  }, [token]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="d-flex align-items-center">
            <h2 className=" mx-auto mt-5 mb-3">Add car</h2>
          </div>
          <AdminBar />
        </Col>
        <Col md={8}>
          <div className="d-flex align-items-center">
            <h2 className=" mx-auto mt-5 mb-5">Available cars</h2>
          </div>
          <CarListAdmin />
        </Col>
      </Row>
    </Container>
  );
});

export default Admin;
