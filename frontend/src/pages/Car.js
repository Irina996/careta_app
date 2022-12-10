import React, { useState } from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { BOOKING_ROUTE, STRIPE_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { fetchOneCar, fetchType } from '../http/carAPI';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { useParams } from 'react-router-dom';

const Car = () => {
    const [car, setCars] = useState({info: []})
    const {car_id} = useParams()

    useEffect(() => {
        fetchOneCar(car_id).then(data => car.setCars(data.data))
    }, [])
    const navigate = useNavigate()

    return (
        <Container style={{background: 'lightgray'}}>
        <div className="d-flex mx-auto mt-5 justify-content-center align-items-center ">
            <h2>Car Information</h2>
        </div>

        <div className="d-flex mx-auto mt-5 mb-5 justify-content-center align-items-center ">
            <Col md={4}>
            <div className="d-flex mx-auto mb-5 flex-column justify-content-center align-items-center " >
            <h6>{car.brand_name}</h6> 
            <h6>{car.model_name}</h6> 
                    
            </div>
            </Col>

            <Col md={4}>
                <Row>
                <div className="d-flex mx-auto mb-5 align-items-center justify-content-center">
                    <Image width={450} height={450} src={car.image}/>
                </div>
                </Row>
            </Col>

            <Col md={4}>
            <div className="d-flex mx-auto mb-5 flex-column justify-content-center align-items-center " >
            <h5 >Availability</h5>
                <div className="input-group input-daterange" className="d-flex mx-auto mb-5 flex-column justify-content-center align-items-center ">
                    <input type="date" className="form-control"/>
                    <div className="input-group-addon">to</div>
                    <input type="date" className="form-control" />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        With driver
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        Baby seats
                    </label>
                </div>

                <h2>{car.car_cost}</h2>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center ">
                <Button onClick={() => navigate(STRIPE_ROUTE + '/')}
                        className="mx-2"
                        variant={"outline-secondary"}> Pay
                </Button>
                <Button onClick={() => navigate(BOOKING_ROUTE)}
                        className="mx-2"
                        variant={"outline-secondary"}> Book
                </Button>
            </div>
            </Col>
        </div>
        </Container>
    );
};

export default Car;