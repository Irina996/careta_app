import React from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, RENT_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const Payment = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Payment</h2>
                <Form>
                    <h5>Card number</h5>
                    <Form.Control
                        className="mt-3"
                        placeholder = "000132758320"
                    />
                    <h5>Card holder</h5>
                    <Form.Control
                        className="mt-3"
                        placeholder = "GOTH MINERVA"
                    />
                    <h5>EXP MM/YY</h5>
                    <div class="input-group input-yearrange" >
                        <input type="month" class="form-control"/>
                    </div>
                    <h5>CVV</h5>
                    <Form.Control
                        className="mt-3"
                        placeholder = "111"
                    />

                
                    <Row className="d-flex justify-content-center align-items-center pl-3 pr-3">
                        <Button onClick={() => navigate(RENT_ROUTE)}
                            className="mt-4"
                            variant={"outline-secondary"}> Pay
                        </Button>
                    </Row>          
                </Form>
            
            </Card>
        </Container>
    );
};

export default Payment;