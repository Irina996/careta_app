import React, {useContext, useState} from 'react';
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

const AdminBar = observer (() => {
    const {car} = useContext(Context)

    return(
        <Container
             className="d-flex  align-items-center "
             >
             <Card style={{width: 700}} className="p-3" >
             <Form classname="d-flex flex-column ">
                 
             <form >
                <div class="form-group">
                <label for="exampleFormControlFile1"></label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                </div>
            </form>
             <h5 >Brand</h5>
                <Form.Control
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
                <h5 >Model</h5>
                <Form.Control
                    className="mb-1 mx-auto"
                    placeholder = ""
                />
                <h5 >Class</h5>
                <ButtonGroup className="mb-1 mx-auto " >
                    <Button  variant={"outline-secondary"}>Premium</Button>
                    <Button  variant={"outline-secondary"}>Middle</Button>
                    <Button  variant={"outline-secondary"}>Economy</Button>
                </ButtonGroup>
                <h5 >Year</h5>
                <Form.Control
                    className="mb-1 mx-auto"
                    placeholder = ""
                />
                <h5 >Car number</h5>
                <Form.Control
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
                <h5 >Color</h5>
                <Form.Control
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
 
                <h5 className="mt-1 mx-auto ">Gearbox</h5>
                <ButtonGroup  className="mb-1 mx-auto ">
                    <Button  variant={"outline-secondary"}>Mechanic</Button>
                    <Button  variant={"outline-secondary"}>Authomath</Button>
                </ButtonGroup>
                <h5 >Number of seats</h5>
                <Form.Control
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
                <h5 >Cost</h5>
                <Form.Control
                    className="mb-1 mx-auto "
                    placeholder = ""
                />

                

                <Row className="d-flex justify-content-center align-items-center mx-5">
                <Button
                    className="mx-auto mt-1"
                    variant={"outline-secondary"}> Save
                </Button>
                </Row>
             </Form>
             </Card>
        </Container>
    );
    
});

export default AdminBar;