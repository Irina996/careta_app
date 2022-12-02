import React from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import CarListAdmin from '../components/CarListAdmin';
import AdminBar from '../components/AdminBar';

const Admin = () => {
    return (
        <Container>
            <Row className="mt-2 ml-2">
                <Col md={3}>
                    <AdminBar/>
                </Col>
                <Col md={9}>
                {/* <BrandBar/> */}
                <div className="d-flex align-items-center">
                    <h2 className=" mx-auto mt-5 mb-5">Available cars</h2>
                </div>
                <CarListAdmin/>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;