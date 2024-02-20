import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import api from "../api";
import Layout from "./Layout";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function UserFeedBackWithComment() {
    const { id } = useParams();
    const [comments, setComment] = useState({});
    const history = useNavigate();
    const [formData, setFormData] = useState({
        content: '',
        feedback_id:id,
    });

    useEffect(() => {
        try {
            api.get('get-all-comments').then((response) => {
                const commentData = response.data;
                setComment(commentData.data);
            });
        } catch (error) {
            console.log("Error while fetching data:", error);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/post-comment', formData);
            if(response.data.success){
                history('/');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <Layout>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h2 className="mb-4">Post comment against ths feedback</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formComment" className="mb-3">
                                <Form.Label>Comment</Form.Label>
                                <textarea
                                    placeholder="Enter your comment"
                                    name="content"
                                    className="form-control"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                />
                            </Form.Group>
                            <input type="hidden" name="feedback_id" value={formData.feedback_id} />
                            <Button variant="primary" type="submit" className="mt-3 w-100" disabled={!localStorage.getItem('access_token')}>
                                {localStorage.getItem('access_token') ? 'Post' : 'Please log in to post a comment'}
                            </Button>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <h2>All Comments on this feedback</h2>
                        {comments.data?.map((item, index) => (
                            item.feedback_id == id ? (
                                <Card className="mb-2">
                                    <Card.Body>
                                        <Card.Title>User:{item.user.name}</Card.Title>
                                        <Card.Subtitle>Comment:{item.content}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                                ) : ''
                        ))}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}