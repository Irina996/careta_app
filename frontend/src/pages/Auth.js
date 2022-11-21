import React from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Login' : 'Registration'}</h2>

                
                <Form classname="d-flex flex-column ">
                {isLogin ?
                    <div>
                    <Form.Control
                        className="mt-3"
                        placeholder = "Email"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Password"
                    />
                    </div>
                :
                    <div>
                    <Form.Control
                        className="mt-3"
                        placeholder = "First name"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Last name"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Address"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Phone"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Email"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Password"
                    />
                    </div>
                }
                

                    <Row className="d-flex justify-content-center align-items-center pl-3 pr-3">
                        {isLogin ?
                        <Button
                            className="mt-4"
                            variant={"outline-secondary"}> Login
                        </Button>
                        :
                        <Button
                            className="mt-4"
                            variant={"outline-secondary"}> Register
                        </Button>

                        }

                        {isLogin ?
                        <div>
                            Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register now!</NavLink>
                        </div>
                        :
                        <div>
                            Are you have an account? <NavLink to={LOGIN_ROUTE}>Login now!</NavLink>
                        </div>

                        }
                        

                    </Row>          
                </Form>
            
            </Card>
        </Container>
    );
};

export default Auth;