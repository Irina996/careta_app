import React, {useContext, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Card, Form, Dropdown, ButtonGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import $ from 'jquery';
import moment from 'moment';

const AdminBar = observer (({show, onHide}) => {
    const {car} = useContext(Context)

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [classs, setClass] = useState('')
    const [year, setYear] = useState('')
    const [carnumber, setCarnumber] = useState('')
    const [color, setColor] = useState('')
    const [gearbox, setGearbox] = useState('')
    const [seats, setSeats] = useState(0)
    const [cost, setCost] = useState(0)
    const [file, setFile] = useState(null)

    const selectFile = e =>{
        setFile(e.target.files[0])
    }

    return(
        <Container
             className="d-flex  align-items-center "
             >
             <Card style={{width: 700}} className="p-3" >
             <Form className="d-flex flex-column ">
                 
             <Form.Control
                    className="mb-1 mx-auto "
                    type = "file"
                    onChange={selectFile}
            />
             <h5 >Brand</h5>
                <Form.Control
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
                <h5 >Model</h5>
                <Form.Control
                    onChange={e => setModel(e.target.value)}
                    className="mb-1 mx-auto"
                    placeholder = ""
                />
                <h5 >Class</h5>
                <Dropdown>
                    <Dropdown.Toggle variant={"outline-secondary"}>{car.selectedclass.name || "Choose class"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {car.carclass.map(carclass =>
                            <Dropdown.Item onClick={() => car.SetSelectedClass(carclass)} key={carclass.id}>{carclass.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>




                {/* <ButtonGroup className="mb-1 mx-auto " >
                    <Button  value={"premium"} variant={"outline-secondary"}>Premium</Button>
                    <Button  variant={"outline-secondary"}>Middle</Button>
                    <Button  variant={"outline-secondary"}>Economy</Button>
                </ButtonGroup> */}
                <h5 >Year</h5>
                <Form.Control
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="mb-1 mx-auto"
                    placeholder = ""
                />
                <h5 >Car number</h5>
                <Form.Control
                    onChange={e => setCarnumber(e.target.value)}
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
                <h5 >Color</h5>
                <Form.Control
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
 
                <h5 >Gearbox</h5>

                <Dropdown>
                    <Dropdown.Toggle variant={"outline-secondary"}>{car.selectedgearbox.name || "Choose gearbox"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {car.gearbox.map(gearbox =>
                            <Dropdown.Item onClick={() => car.SetSelectedGearbox(gearbox)} key={gearbox.id}>{gearbox.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                {/* <ButtonGroup  className="mb-1 mx-auto ">
                    <Button  variant={"outline-secondary"}>Mechanic</Button>
                    <Button  variant={"outline-secondary"}>Authomath</Button>
                </ButtonGroup> */}
                <h5 >Number of seats</h5>
                <Form.Control
                    value={seats}
                    onChange={e => setSeats(Number(e.target.value))}
                    className="mb-1 mx-auto "
                    placeholder = ""
                />
                <h5 >Cost</h5>
                <Form.Control
                    value={cost}
                    onChange={e => setCost(Number(e.target.value))}
                    className="mb-1 mx-auto "
                    placeholder = ""
                />

                

                <Row className="d-flex justify-content-center align-items-center mx-5">
                <Button
                    className="mx-auto mt-1"
                    variant={"outline-secondary"}> Save
                </Button>
                </Row>
             </Form>
             </Card>
        </Container>
    );
    
});

export default AdminBar;