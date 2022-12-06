import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, RENT_ROUTE, BOOKING_ROUTE, FINES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";


const NavBar = observer (() => {
    const {user} = useContext(Context)

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink style={{color: 'white'}} to={HOME_ROUTE}>CAReta</NavLink>
        {user.isAuth ? 
            <Nav>
            <NavLink style={{color: 'white'}}  className=" mx-5" to={BOOKING_ROUTE} >Booking list</NavLink>
            <NavLink style={{color: 'white'}} className=" mx-5" to={RENT_ROUTE} >Rental list</NavLink>
            <NavLink style={{color: 'white'}}  className=" mx-5" to={FINES_ROUTE}>Fines</NavLink>
            <NavLink style={{color: 'white'}}  className=" mx-5" to={LOGIN_ROUTE}>LogOut</NavLink>
            </Nav>
        :
          <Nav className="ml-auto" style={{color: 'white'}}>
            <NavLink style={{color: 'white'}} onClick={() => user.setIsAuth(true)}>Authorization</NavLink>
          </Nav>
        }


        </Container>
      </Navbar>
    );
    
});

export default NavBar;