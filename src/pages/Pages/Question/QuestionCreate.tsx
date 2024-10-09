import React, { useEffect, useState } from "react";

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
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select from "react-select";

import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

//redux
import { useDispatch } from "react-redux";
import { addQuizs as onAddNewQuizs } from "../../../slices/thunks";
import FormQuestion from "./FormQuestion";
import FormAnswer from "./FormAnswer";

interface Question{
    value:string
    img?:string
}

interface Answer{
    value:string
    img?:string
    isCorrectAnswer:boolean
}

interface Point{
    value:string
    label:string
}

const QuestionCreate = () => {
    const dispatch: any = useDispatch();


    const pointForQuestion=[
        { label: "1 điểm", value: "1" },
        { label: "2 điểm", value: "2" },
        { label: "3 điểm", value: "3" },
        { label: "4 điểm", value: "4" },
        { label: "5 điểm", value: "5" },
        { label: "6 điểm", value: "6" },
        { label: "7 điểm", value: "7" },
        { label: "8 điểm", value: "8" },
        { label: "9 điểm", value: "9" },
        { label: "10 điểm", value: "10"},
    ]




    const [question, setQuestion] = useState<Question>({value:'', img:''});
    const [answers, setAnswers] = useState<Answer[]>([{value:'', img:'', isCorrectAnswer:false}, {value:'', img:'', isCorrectAnswer:false}]);
    const [point, setPoint] = useState<Point>({value:'1', label:'1 điểm'});
    const [multiAnswer, setMultiAnswer] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const toggledropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };



    useEffect(() => {
    
    }, []);

    const handleTeamClicks=()=>{

    }

    const handleChangePoint=(v:Point)=>{
        setPoint(v);
        toggledropDown();
    }
    




    document.title = "Create Question";



    return (
        <div className="page-content">
            <Container fluid>
                {/* <BreadCrumb title="Create Question" pageTitle="Question" /> */}
                <Row className="g-2">
                    <Col sm={4}>
                    </Col>
                    <Col className="col-sm-auto ms-auto">
                        <div className="list-grid-nav hstack gap-1">
                            <Dropdown
                                isOpen={dropdownOpen}
                                toggle={toggledropDown}>
                                <DropdownToggle
                                    tag="div"
                                    className="form-control rounded-end flag-input form-select"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {point.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {pointForQuestion.map((v, i)=>{
                                        return <li key={i} onClick={() => handleChangePoint(v)}><span className="dropdown-item">{v.label}</span></li>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            <Button color="success" onClick={() => handleTeamClicks()}><i className="mdi mdi-content-save align-bottom"></i> Save question</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <FormQuestion question={question} setQuestion={setQuestion}/>
                </Row>
                <Row>
                    <FormAnswer answers={answers} setAnswers={setAnswers}/>
                </Row>
            </Container>
        </div>
    );
};

export default QuestionCreate;
