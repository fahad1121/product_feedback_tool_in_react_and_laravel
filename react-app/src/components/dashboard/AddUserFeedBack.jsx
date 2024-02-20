import Layout from "./Layout";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import api from "../../api";
import {Link, useNavigate} from "react-router-dom";

export default function AddUserFeedBack() {
    const history = useNavigate();
    const [errors, setError] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/save-feedback', formData);
            if(response.data.success){
                history('/home');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors);
            } else {
                console.error("Error:", error);
            }
        }
    };
    return (
        <Layout>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h2 className="mb-4">Add a feedback</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && <Form.Text className="text-danger">{errors.title[0]}</Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="formDescription" className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <textarea
                                    className="form-control"
                                    placeholder="Enter description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                />
                                {errors.description && <Form.Text className="text-danger">{errors.description[0]}</Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="formCategory" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}>
                                    <option value="">Select category</option>
                                    <option value="1">Bug report</option>
                                    <option value="2">Feature request</option>
                                    <option value="3">Improvement</option>
                                </Form.Control>
                                {errors.category && <Form.Text className="text-danger">{errors.category[0]}</Form.Text>}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3 w-100">Save</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}