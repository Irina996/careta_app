import React, { useState } from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { BOOKING_ROUTE, STRIPE_ROUTE } from '../utils/consts';
import {useLocation, useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { fetchOneCar, fetchType } from '../http/carAPI';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { useParams } from 'react-router-dom';

const Car = () => {
    const [car, setCars] = useState([])
    const {id} = useParams()

    useEffect(() => {
        fetchOneCar(id).then(data => setCars(data.data))
    }, [id])

    const navigate = useNavigate()

    const [cost1, setCost1] = useState();

    // const clickCost = async() =>{
    //     car[0]?.car_cost = car[0]?.car_cost + 5
    // }

    return (
        <Container style={{background: 'lightgray'}}>
        <div className="d-flex mx-auto mt-5 justify-content-center align-items-center ">
            <h2>Car Information</h2>
        </div>

        <div className="d-flex mx-auto mt-5 mb-5 justify-content-center align-items-center ">
            <Col md={4}>
            <div className="d-flex mx-auto mb-5 ml-5 flex-column justify-content-left" >
            <h4>Brand: {car[0]?.brand_name}</h4> 
            <h4>Model: {car[0]?.model_name}</h4> 
            <h4>Class: {car[0]?.class_name}</h4> 
            <h4>Year: {car[0]?.creation_year}</h4> 
            <h4>Fuel consumption: {car[0]?.fuel_consumption}</h4> 
            <h4>Type: {car[0]?.type_name}</h4> 
            <h4>Number of seats: {car[0]?.seats_number}</h4> 
                    
            </div>
            </Col>

            <Col md={4}>
                <Row>
                <div className="d-flex mx-auto mb-5 align-items-center justify-content-center">
                    <Image width={570} height={450} src={car[0]?.image}/>
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

            <h4>Cost: {car[0]?.car_cost} $</h4> 
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center ">
                <Button onClick={() => navigate(STRIPE_ROUTE + '/')}
                        className="mx-2 btn-lg"
                        variant={"outline-secondary"}
                        > Pay
                </Button>
                <Button onClick={() => navigate(BOOKING_ROUTE)}
                        className="mx-2 btn-lg"
                        variant={"outline-secondary"}> Book
                </Button>
            </div>
            </Col>
        </div>
        </Container>
    );
};

export default Car;