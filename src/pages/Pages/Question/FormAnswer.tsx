import React, { useEffect, useState, FC } from "react";

import {
    CardBody,
    Row,
    Col,
    Card,
    Container,
    Form,
    Input,
    Label,
    Table,
    FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";

interface AnswerProps{
    answers?: any,
    setAnswers?: any
}

const FormAnswer : FC<AnswerProps> = ({
    answers,
    setAnswers
    }) => {
    const dispatch: any = useDispatch();
    const history = useNavigate();


    useEffect(() => {
       
    }, []);



    return (
        <div className="page-content">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xxl={9}>
                        <Card>
                           
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FormAnswer;
