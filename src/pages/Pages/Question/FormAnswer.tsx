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
    multiAnswer?:boolean
    setShowPopupUploadImg?:any
    isDeleteAnswer?:boolean
    setDeleteAnswer?:any
}

const FormAnswer : FC<AnswerProps> = ({
    answers,
    setAnswers,
    multiAnswer,
    setShowPopupUploadImg,
    setDeleteAnswer,
    isDeleteAnswer
    }) => {
    const dispatch: any = useDispatch();
    const history = useNavigate();


    useEffect(() => {
        setAnswers
    }, []);

    const handleChangeTitleQuestion=(e:any)=>{
        setAnswers((item:any) => ({ ...item, value: e.target.innerHTML }));
    }

    const showPopupUploadImg=()=>{
        setShowPopupUploadImg(true)
    }

    const checkisCorrectAnswer=(e:any)=>{
        // setAnswers((item:any) => ({ ...item, value: e.target.innerHTML }));
    }

    const checkMiltiisCorrectAnswer=(e:any)=>{
        setAnswers((item:any) => ({ ...item, value: e.target.innerHTML }));
    }


    return (
        <div className="page-content">
            <div className="question-content-answer">
                <Col className="justify-content-center">
                    {(isDeleteAnswer)?(<i className="mdi mdi-delete mdi-24px question-icon" onClick={setDeleteAnswer}></i>):(<div></div>)}
                    <i className="mdi mdi-image mdi-24px question-icon" onClick={showPopupUploadImg}></i>
                    {(multiAnswer)?(<i className="mdi mdi-checkbox-marked mdi-24px question-icon" onClick={checkisCorrectAnswer}></i>):(<i className="mdi mdi-checkbox-marked-circle mdi-24px question-icon" onClick={checkisCorrectAnswer}></i>)}
                </Col>
                <Row className="justify-content-center">
                    <div className="txt-answer">
                        <div contentEditable="true" data-text="Nhập tùy chọn trả lời ở đây" style={{textAlign:'center'}}  onInput={handleChangeTitleQuestion}> 
                        </div>
                    </div>
                   
                </Row>
            </div>
        </div>
    );
};

export default FormAnswer;
