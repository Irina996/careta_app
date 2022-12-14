import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import CarItem from './CarItem';


const CarList = observer (() => {
    const {car} = useContext(Context)
    return(
        <Row className="d-flex">
            {
                car?.cars?.map(car =>
                    <CarItem key={car.group_id} car={car}/>
                    
                )
            }
        </Row>
    );
    
});

export default CarList;