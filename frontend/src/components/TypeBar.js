import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Card, Form, ButtonGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import $ from 'jquery';
import moment from 'moment';

const TypeBar = observer (() => {
    const {car} = useContext(Context)
    return(
        <Container
             className="d-flex  align-items-center "
             >
             <Card style={{width: 700}} className="p-3">
          
             <Form classname="d-flex flex-column p-5">
             <h5 >Brand</h5>
                <Form.Control
                    className="mb-3 mx-auto "
                    placeholder = "Toyota"
                />
                <h5 >Model</h5>
                <Form.Control
                    className="mb-3 mx-auto"
                    placeholder = "Corolla"
                />
                <h5 >Class</h5>
                <ButtonGroup className="mb-3 mx-auto " >
                    <Button  variant={"outline-secondary"}>Premium</Button>
                    <Button  variant={"outline-secondary"}>Middle</Button>
                    <Button  variant={"outline-secondary"}>Economy</Button>
                </ButtonGroup>
                <h5 >Year</h5>
                <div class="input-group input-yearrange" >
                    <input type="number" min="1990" max="2021" class="form-control"/>
                    <div class="input-group-addon">to</div>
                    <input type="number"  min="1990" max="2021" class="form-control" />
                </div>
                <h5 className="mt-3 mx-auto ">Gearbox</h5>
                <ButtonGroup  className="mb-3 mx-auto ">
                    <Button  variant={"outline-secondary"}>Mechanic</Button>
                    <Button  variant={"outline-secondary"}>Authomath</Button>
                </ButtonGroup>
                <h5 >Number of seats</h5>
                <Form.Control
                    className="mb-3 mx-auto "
                    placeholder = "4"
                />
                <h5 >Availability</h5>
                <div class="input-group input-daterange">
                    <input type="date" class="form-control"/>
                    <div class="input-group-addon">to</div>
                    <input type="date" class="form-control" />
                </div>
                <Row className="d-flex justify-content-center align-items-center mx-5">
                <Button
                    className="mx-auto mt-3"
                    variant={"outline-secondary"}> Ok
                </Button>
                </Row>
                




                
 
             </Form>
             </Card>
        </Container>
    );
    
});

export default TypeBar;