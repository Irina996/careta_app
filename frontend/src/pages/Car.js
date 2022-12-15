import React, { useState, useMemo, useCallback } from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { BOOKING_ROUTE, STRIPE_ROUTE } from '../utils/consts';
import {useLocation, useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { fetchOneCar, fetchType, createBook } from '../http/carAPI';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../contexts';

const Car = () => {
    const [car, setCars] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const [date1, setDate1] = useState('')
    const [date2, setDate2] = useState('')
    const [driver, setDriver] = useState('')
    const [baby_seats, setSeats] = useState('')

    const countDays = useCallback(() =>{
        let oneDay = 24 * 60 * 60 * 1000;
        let first = new Date(date1);
        let firstDate = first.getTime()
        let second = new Date(date2);
        let secondDate = second.getTime()
        let diff = Math.round(Math.abs((firstDate - secondDate) / oneDay))

    return diff;
    }, [date1, date2])

    const cost1 = useMemo(() => {
        if (!car[0]?.car_cost) return 0;
        if (date1.length === 0 || date2.length === 0) return car[0]?.car_cost;
        const days = countDays();
        let result = days * car[0]?.car_cost;
        if (driver) result += 15;
        if (baby_seats) result += 10;
        return result;
        
    },[car, date1, date2, driver, baby_seats, countDays])


    const {token} = useAuthContext()

    useEffect(() => {
        fetchOneCar(id).then(data => setCars(data.data))
    }, [id])

    const onCreateBook = useCallback(() => {
        createBook(
          { car_group_id: id, start_date: date1, end_date: date2, baby_seat_amount: baby_seats, is_driver: driver},
          {
            onSuccess: () => {
              navigate("/booking");
            },
            token
          }
        );
      }, [id, date1, date2, baby_seats, driver, token]);




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
            <h4>Type: {car[0]?.gearbox}</h4> 
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
                    <input type="date" value={date1 || ''} onChange={e => setDate1(e.target.value)} className="form-control"/>
                    <div className="input-group-addon">to</div>
                    <input type="date" value={date2 || ''} onChange={e => setDate2(e.target.value)} className="form-control" />
                </div>
                <div className="form-check">
                    <input className="form-check-input" checked={driver || ''} onChange={e => setDriver(e.target.checked)} type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        With driver
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" checked={baby_seats || ''} onChange={e => setSeats(e.target.checked)}type="checkbox" value="" id="flexCheckChecked"/>
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        Baby seats
                    </label>
                </div>

            <h4 >Cost: {cost1.toFixed(2)} $</h4> 
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center ">
                <Button onClick={onCreateBook}
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