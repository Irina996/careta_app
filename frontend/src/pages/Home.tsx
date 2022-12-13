import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect, useMemo } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import BrandBar from "../components/BrandBar";
import CarList from "../components/CarList";
import { TypeBar } from "../components/TypeBar";
import { EUrlKeys, fetchCar, ICarQueryParams } from "../http/carAPI";
import { Context } from "../index";
import { checkAddition } from "../utils/checkAddition";

export const Home = (): ReactElement => {
  const location = useLocation();
  const { car } = useContext<{ car: any }>(Context as unknown as any);

  

  const queryParams = useMemo<ICarQueryParams>(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const result: ICarQueryParams = {};

    Object.values(EUrlKeys).forEach((key) => {
      checkAddition(key, { result, urlSearchParams })

    })

    // checkAddition(EUrlKeys.MODEL, { result, urlSearchParams })
    // checkAddition(EUrlKeys.SEATS, { result, urlSearchParams })
    // checkAddition(EUrlKeys.START_YEAR, { result, urlSearchParams })
    // checkAddition(EUrlKeys.END_YEAR, { result, urlSearchParams })

    return result;
  }, [location.search]);

  useEffect(() => {
    fetchCar({ params: queryParams }).then((data) => car.setCars(data.data));
  }, [queryParams]);

  return (
    <Container>
      <Row className="mt-2 ml-2">
        <Col md={4}>
          <div className="d-flex align-items-center">
            <h2 className=" mx-auto mt-5 mb-3">Filter</h2>
          </div>
          <TypeBar queryValues={queryParams} />
        </Col>
        <Col md={8}>
          <div className="d-flex align-items-center">
            <h2 className=" mx-auto mt-5 mb-5">Cars for book</h2>
          </div>
          <CarList />
        </Col>
      </Row>
    </Container>
  );
};
