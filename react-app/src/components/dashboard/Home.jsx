import Layout from "./Layout";
import {Col, Container, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import api from "../../api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons/faAdd";

export default function Home() {

    const [feedbacks, setFeedback] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            api.get('get-feedbacks?page=' + page).then((response) => {
                const feedBackData = response.data;
                setFeedback(feedBackData.data);
            });
        } catch (error) {
            console.log("Error while fetching:", error);
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
                        <h3 className="mb-0">All Feedbacks</h3>
                    </Col>
                    <Col md={8} className="text-md-right">
                        <Link to="/add-feedback" className="btn btn-primary float-end"><FontAwesomeIcon icon={faAdd}/> Feedback</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mb-4">
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Submitted By</th>
                            </tr>
                            </thead>
                            <tbody>
                            {feedbacks.data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.user.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                    <div className="my-4 d-flex justify-content-between">
                        <div>
                            Showing {feedbacks.from} to {feedbacks.to} from {feedbacks.total} results.
                        </div>
                        <div>
                            {renderPaginationLinks()}
                        </div>
                    </div>
                </Row>
            </Container>
        </Layout>
    );
}