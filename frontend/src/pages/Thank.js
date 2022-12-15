import React from "react";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Container, Image,  Col, Form, Button, Row } from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import CarListAdmin from "../components/CarListAdmin";
import { AdminBar } from "../components/AdminBar";
import { fetchAdminCar, fetchCar, fetchType } from "../http/carAPI";
import { Context } from "../index";
import { useAuthContext } from "../contexts";
import logo from '../images/affection.png'

const Thank = observer(() => {

  return (
    <Container className="d-flex mx-auto mt-5 justify-content-center align-items-center">
      <div >
          <h1>Thank you for payment!!!</h1>
          <Image width={570} height={570} src={logo}/>
      </div>
    </Container>
  );
});

export default Thank;