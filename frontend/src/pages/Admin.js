import React from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import CarListAdmin from '../components/CarListAdmin';
import AdminBar from '../components/AdminBar';

const Admin = () => {
    return (
        <Container>
            <Row >
                <Col md={4}>
                <div className="d-flex align-items-center">
                    <h2 className=" mx-auto mt-5 mb-3">Add car</h2>
                </div>
                    <AdminBar/>
                </Col>
                <Col md={8}>
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