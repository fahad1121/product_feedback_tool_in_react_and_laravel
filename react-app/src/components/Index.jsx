import {Button, Card, Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import api from "../api";
import Layout from "./Layout";
import {Link} from "react-router-dom";

export default function Index() {

    const [page, setPage] = useState(1);
    const [feedbacks, setFeedback] = useState({});

    useEffect(() => {
        try {
            api.get('get-all-feedbacks?page=' + page).then((response) => {
                const feedBackData = response.data;
                setFeedback(feedBackData.data);
            });
        } catch (error) {
            console.log("Error while fetching stats:", error);
        }
    }, [page]);

    const fetchNextPrevTasks = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
    }

    const renderPaginationLinks = () => {
        return <ul className="pagination">
            {
                feedbacks.links?.map((link, index) => (
                    <li key={index} className="page-item">
                        <a style={{cursor: 'pointer'}} className={`page-link ${link.active ? 'active' : ''}`}
                           onClick={() => fetchNextPrevTasks(link.url)}>
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </a>
                    </li>
                ))
            }
        </ul>
    }
    return (
        <Layout>
            <Container className="mt-5 mb-5">
                <Row className="mb-5">
                    <Col md={4}>
                        <h3 className="mb-0">Feedback List</h3>
                    </Col>
                </Row>
                <Row>
                    {feedbacks.data?.map((item, index) => (
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Link className="btn btn-primary float-end" to={`/post-comment/${item.id}`}>Add Comment</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                        ))}
                </Row>
            </Container>
        </Layout>
    );
}