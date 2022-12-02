import React from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import CarList from '../components/CarList';
import TypeBar from '../components/TypeBar';

const Home = () => {
    return (
        <Container>
            <Row className="mt-2 ml-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                {/* <BrandBar/> */}
                <div className="d-flex align-items-center">
                    <h2 className=" mx-auto mt-5 mb-5">Cars for book</h2>
                </div>
                <CarList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;