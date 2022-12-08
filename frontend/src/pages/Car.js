import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { BOOKING_ROUTE, PAYMENT_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const Car = () => {
    const car_1 = {id:1, brand_id:1, class_id:1, model_id:1, gearbox_id:1, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'}
    const navigate = useNavigate()

    return (
        <Container style={{background: 'lightgray'}}>
        <div className="d-flex mx-auto mt-5 justify-content-center align-items-center ">
            <h2>Car Information</h2>
        </div>

        <div className="d-flex mx-auto mt-5 mb-5 justify-content-center align-items-center ">
            <Col md={4}>
            <div className="d-flex mx-auto mb-5 flex-column justify-content-center align-items-center " >
                <h5>{car_1.brand_id}</h5>
                <h5>{car_1.class_id}</h5>
                <h5>{car_1.model_id}</h5>
                <h5>{car_1.gearbox_id}</h5>
                <h5>{car_1.year}</h5>
                <h5>{car_1.consumption}</h5>
                <h5>{car_1.seats}</h5>
            </div>
            </Col>

            <Col md={4}>
                <Row>
                <div className="d-flex mx-auto mb-5 align-items-center justify-content-center">
                    <Image width={450} height={450} src={car_1.img}/>
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

                <h2>{car_1.cost}</h2>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center ">
                <Button onClick={() => navigate(PAYMENT_ROUTE + '/')}
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