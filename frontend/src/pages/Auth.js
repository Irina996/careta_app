import React from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import {useState} from 'react'

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () =>{
        if(isLogin){
            const response = await login()
        }else{
            const response = await registration(email, password)
            console.log(response)
        }

        
    }

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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder = "Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
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
                        <Button onClick={click}
                            className="mt-4"
                            variant={"outline-secondary"}> Login
                        </Button>
                        :
                        <Button onClick={click}
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