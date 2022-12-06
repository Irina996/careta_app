import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import CarList from '../components/CarList';
import TypeBar from '../components/TypeBar';
import { fetchCar, fetchType } from '../http/carAPI';
import { Context } from '../index';

const Home = observer(() => {
    const {car} = useContext(Context)

    useEffect(() => {
        fetchCar().then(data => car.setCars(data.rows))
    }, [])


    return (
        <Container>
            <Row className="mt-2 ml-2">
                <Col md={4}>
                <div className="d-flex align-items-center">
                    <h2 className=" mx-auto mt-5 mb-3">Filter</h2>
                </div>
                    <TypeBar/>
                </Col>
                <Col md={8}>
                {/* <BrandBar/> */}
                <div className="d-flex align-items-center">
                    <h2 className=" mx-auto mt-5 mb-5">Cars for book</h2>
                </div>
                <CarList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Home;