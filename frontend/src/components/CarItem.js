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


const CarItem = observer (({car}) => {
    const navigate = useNavigate()
    
    return(
        <Col md={3} >
            <Card style={{width:200}}  border={"dark"} className="d-flex mx-auto mb-5 flex-column align-items-center ">
                <Image width={190} height={170} src={car.image}/>
                <div className="d-flex flex-column align-items-center ">
                    <h6>{car.brand_name}</h6> 
                    <h6>{car.model_name}</h6> 
                    <h6>{car.car_cost + " $"}</h6>  


                    <Button onClick={() => navigate(CAR_ROUTE + '/' + car.id)}
                        className="mx-auto mb-3"
                        variant={"outline-secondary"}> Show
                    </Button>

                
                </div>

            </Card>

        </Col>
    );
    
});

export default CarItem;