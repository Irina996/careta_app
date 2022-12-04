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
    const cargroup1 = {id: 1, car_brand: "subaru", car_model: "outback", car_class: "middle", year: "2017", cost:"125$"}
    const car1 = {id: 1, car_number: "1234AA-7", car_group_id: cargroup1.id, color: "black"}
    
    return(
        <Col md={3} >
            <Card style={{width:200}}  border={"dark"} className="d-flex mx-auto mb-5 flex-column align-items-center ">
                <Image width={200} height={200} src={car.img}/>
                <div className="d-flex flex-column align-items-center ">
                    <h6>{cargroup1.car_brand}</h6> 
                    <h6>{cargroup1.car_model}</h6> 
                    <h6>{car1.car_number}</h6> 
                    <h6>{cargroup1.cost}</h6> 
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