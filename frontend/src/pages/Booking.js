import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { STRIPE_ROUTE, HOME_ROUTE, RENT_ROUTE, PAYMENT_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const Booking = () => {
    const booking_1 = {id:1, user:"Tatat", car: 2, start_date: "12.12.2022", start_date: "18.12.2022", baby_seat_amount: 1, isDriver: "without", booking_date:"12.12.2022", state:"Good"}
    const car_1 = {id:1, brand_id:1, class_id:1, model_id:1, gearbox_id:1, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'}
    const navigate = useNavigate()

    return (
        <Container style={{background: 'lightgray', width: 1100, height: 750}}>
        <div className="d-flex mx-auto mt-5 justify-content-center align-items-center ">
            <h2>Booking list</h2>
        </div>

        <Row className="d-flex mx-5 justify-content-center align-items-center">
            <div style={{background: 'white', width: 800}} className="d-flex mx-5 justify-content-around align-items-center">
            <h5>{car_1.brand_id}</h5>
            <div className="d-flex flex-row">
                    <Image width={150} height={150} src={car_1.image}/>
            </div>

            <div className="d-flex flex-column " >
                <h5>{car_1.brand_id}</h5>
                <h5>{car_1.model_id}</h5>
                <h5>{car_1.gearbox_id}</h5>
                <h5>{car_1.year}</h5>
            </div>

            <div className="d-flex flex-column " >
                <h5>{car_1.class_id}</h5>
                <h5>{car_1.consumption}</h5>
                <h5>{car_1.seats}</h5>
                <h5>{booking_1.booking_date}</h5>
            </div>

            <div className="d-flex flex-column " >
                <h5>{booking_1.isDriver}</h5>
                <h5>{booking_1.baby_seat_amount}</h5>
                <h5>{car_1.cost}</h5>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center ">
                <Button onClick={() => navigate(STRIPE_ROUTE + '/')}
                        className="mx-2"
                        variant={"outline-secondary"}> Rent
                </Button>
                <Button onClick={() => navigate(HOME_ROUTE)}
                        className="mx-2"
                        variant={"outline-secondary"}> Cancel booking
                </Button>
            </div>


            </div>

        </Row>



        </Container>
    );
};

export default Booking;