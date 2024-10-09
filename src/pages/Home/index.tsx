import React from "react";
import { Col, Container, Row } from "reactstrap";

const Home = () => {
    document.title = "Home | GM";        

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <div className="h-100">
                        HOME
                        </div>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Home;