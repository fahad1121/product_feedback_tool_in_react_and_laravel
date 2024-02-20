import React, {useEffect, useState} from 'react';
import {Navbar, Container, Button, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faComment, faCommentAlt, faCommenting, faComments} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo.png';
import {Link, redirect, useLocation, useNavigate} from "react-router-dom";
import '../../../assets/header.css';
import api from "../../../api";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons/faCommentDots";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        setIsLoggedIn(!!accessToken);
    }, [location]);
    const handleLogout = async () => {
        await api.post('/logout');
        localStorage.removeItem('access_token');
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className="justify-content-between">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <FontAwesomeIcon icon={faCommenting} /> <strong>Feedback tool</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <Button variant="outline-dark">
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                    <Nav className="mx-auto">

                    </Nav>
                    <Nav className="ml-auto">

                        {isLoggedIn ? (
                            <NavDropdown title="User" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/home">Dashboard</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user-settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <NavDropdown.Item as={Link} to="/login" style={{ color: 'blue' }}>Login</NavDropdown.Item>
                                <span className="mx-2">|</span>
                                <NavDropdown.Item as={Link} to="/register" style={{ color: 'blue' }}>Register</NavDropdown.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
