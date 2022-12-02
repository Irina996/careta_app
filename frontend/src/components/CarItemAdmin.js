import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, CAR_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'


const CarItemAdmin = observer (({car}) => {
    const navigate = useNavigate()
    return(
        <Col md={3} >
            <Card style={{width:200}}  border={"dark"} className="d-flex mx-auto mb-5 flex-column align-items-center ">
                <Image width={200} height={200} src={car.img}/>
                <div className="d-flex flex-column align-items-center ">
                    <h6>Toyota</h6>
                    <h6>Corolla</h6>
                    <h6>1200$</h6>
                   <Row classname="d-flex space-between flex-row">
                    <Button
                        className="mx-auto mb-3"
                        variant={"outline-secondary"}> Edit
                    </Button>
                    <Button
                        className="mx-auto mb-3"
                        variant={"outline-secondary"}> Delete
                    </Button>
                    </Row>

                
                </div>

            </Card>

        </Col>
    );
    
});

export default CarItemAdmin;