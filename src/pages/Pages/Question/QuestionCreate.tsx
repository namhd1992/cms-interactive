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
    DropdownMenu,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
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

import { FilePond,  registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


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



    const [selectedFiles, setselectedFiles] = useState([]);
    const [files, setFiles] = useState<any>([]);
    const [question, setQuestion] = useState<Question>({value:'', img:''});
    const [answers, setAnswers] = useState<Answer[]>([{value:'', img:'', isCorrectAnswer:true}, {value:'', img:'', isCorrectAnswer:false}, {value:'', img:'', isCorrectAnswer:true}]);
    const [point, setPoint] = useState<Point>({value:'1', label:'1 điểm'});
    const [multiAnswer, setMultiAnswer] = useState<boolean>(false);
    const [isDeleteAnswer, setDeleteAnswer] = useState<boolean>(false);
    const [isAddAnswer, setAddAnswer] = useState<boolean>(true);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [showPopupUploadImg, setShowPopupUploadImg] = useState<boolean>(false);

    const toggledropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };



    useEffect(() => {
        if(answers.length<5){
            setAddAnswer(true)
        }else{
            setAddAnswer(false)
        }

        if(answers.length>2 && answers.length<5){
            setDeleteAnswer(true)
        }else{
            setDeleteAnswer(false)
        }

    }, [answers]);

    const handleTeamClicks=()=>{

    }

    const handleChangePoint=(v:Point)=>{
        setPoint(v);
        toggledropDown();
    }

    const handleSaveImg=()=>{
    }

    const handleActionMultiAnswer=(v:boolean)=>{
        setMultiAnswer(v);

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
                    <FormQuestion question={question} setQuestion={setQuestion} setShowPopupUploadImg={setShowPopupUploadImg}/>
                </Row>
                <Row>
                    {answers.map((v,i)=>{
                        return <FormAnswer answer={v} index={i} answers={answers} setAnswers={setAnswers} multiAnswer={multiAnswer} isDeleteAnswer={isDeleteAnswer} setDeleteAnswer={setDeleteAnswer} setShowPopupUploadImg={setShowPopupUploadImg}/>
                    })}
                    
                </Row>
                <Col>
                    <Button className={multiAnswer ? "qustion-btn-inactive":"qustion-btn-active"} onClick={()=>handleActionMultiAnswer(false)}>
                        Câu trả lời đúng duy nhất
                    </Button>
                    <Button className={multiAnswer ? "qustion-btn-active":"qustion-btn-inactive"} onClick={()=>handleActionMultiAnswer(true)}>
                        Nhiều câu trả lời đúng
                    </Button>
                </Col>
            </Container>
            <Modal id="myModal" isOpen={showPopupUploadImg}>
                <ModalHeader>
                    <h5 className="modal-title" id="myModalLabel">
                        Thêm hình ảnh
                    </h5>
                    <Button type="button" className="btn-close" onClick={() => {setShowPopupUploadImg(false)}} aria-label="Close"></Button>
                </ModalHeader>
                <ModalBody>
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        // onactivatefile={handleAcceptedFile}
                        // onremovefile={handleSave}
                        allowMultiple={false}
                        maxFiles={1}
                        name="files"
                        labelIdle='<span class="filepond--label-action">Upload Image</span>'

                      />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveImg}>
                        Lưu
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default QuestionCreate;
