import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { STRIPE_ROUTE, HOME_ROUTE, RENT_ROUTE, PAYMENT_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { fetchOneCar } from '../http/carAPI';

const Booking = () => {
    const [car, setCars] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchOneCar(id).then(data => setCars(data.data))
    }, [id])


    return (
        <Container style={{background: 'lightgray', width: 1100, height: 750}}>
        <div className="d-flex mx-auto mt-5 justify-content-center align-items-center ">
            <h2>Booking list</h2>
        </div>

        <Row className="d-flex mx-5 justify-content-center align-items-center">
            <div style={{background: 'white', width: 800}} className="d-flex mx-5 justify-content-around align-items-center">
            {/* <h5>{car_1.brand_id}</h5> */}
            <div className="d-flex flex-row">
                <Image width={170} height={170} src={car[0]?.image}/>
            </div>

            <div className="d-flex flex-column " >
                {/* <h5>{car_1.brand_id}</h5>
                <h5>{car_1.model_id}</h5>
                <h5>{car_1.gearbox_id}</h5>
                <h5>{car_1.year}</h5> */}
            </div>

            <div className="d-flex flex-column " >
                {/* <h5>{car_1.class_id}</h5>
                <h5>{car_1.consumption}</h5>
                <h5>{car_1.seats}</h5>
                <h5>{booking_1.booking_date}</h5> */}
            </div>

            <div className="d-flex flex-column " >
                {/* <h5>{booking_1.isDriver}</h5>
                <h5>{booking_1.baby_seat_amount}</h5>
                <h5>{car_1.cost}</h5> */}
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