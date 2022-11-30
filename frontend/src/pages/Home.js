import React from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import TypeBar from '../components/TypeBar';

const Home = () => {
    return (
        <Container>
            <Row className="mt-2 ml-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                <BrandBar/>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;