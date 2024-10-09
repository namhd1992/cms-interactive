import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    CardBody,
    Row,
    Col,
    Card,
    Container,
    CardHeader,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    Button,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Label,
    Input,
    Dropdown,
    // SimpleBar
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { quizModel } from "./quizmodel";

//Import Icons
import FeatherIcon from "feather-icons-react";
// import { invoiceWidgets } from "../../../common/data/invoiceList";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CountUp from "react-countup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

//Import actions
import {
    getQuizs as onGetQuizs,
    //addQuizs as onAddQuizs,
    //updateQuizs as onUpdateQuizs,
    deleteQuizs as onDeleteQuizs,
    addQuizs
} from "../../../slices/quizs/thunk";

import { timestampToDatetime } from "../../../utils/convertUtils";

interface ModulePlay{
    key:number
    value:string
}

const QuizsList = () => {
    const dispatch: any = useDispatch();

    //const selectLayoutState = (state: any) => state.Quiz;
    const selectQuizProperties = createSelector(
        (state: any) => state.Quiz,
        (items) => ({
            quizList: items.quizData,
            isQuizSuccess: items.isQuizSuccess,
            error: items.error,
        })
    );
    // Inside your component
    const { quizList, isQuizSuccess,error} = useSelector(selectQuizProperties);

    //delete invoice
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [isShowPopupCreateQuiz, showPopupCreateQuiz] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [titleQuiz, setTitleQuiz] = useState<string>("");
    const [showAnswer, setShowAnswer] = useState<ModulePlay>({key:0, value:''});
    const [showListTagetAnswer, setListTagetAnswer] = useState<boolean>(false);
    const [ quizData, setQuizData] = useState<any>([]);

    useEffect(() => {
        var data={page:page};
        dispatch(onGetQuizs(data));
    }, [dispatch]);

    useEffect(() => {
        setQuizData(quizList);
    }, [quizList]);

    // Delete Data
    const onClickDelete = (quizData: any) => {
        setQuizData(quizData);
        setDeleteModal(true);
    };

    const handleDeleteInvoice = () => {
        if (quizData) {
            dispatch(onDeleteQuizs(quizData.id));
            setDeleteModal(false);
        }
    };

    // validation
    const handleValidDate = (date: any) => {
        var datetime = timestampToDatetime(date);
        const date1 = moment(new Date(datetime)).format("DD MMM Y");
        return date1;
    };

    const handleValidTime = (time: any) => {
        const time1 = new Date(time);
        const getHour = time1.getUTCHours();
        const getMin = time1.getUTCMinutes();
        const getTime = `${getHour}:${getMin}`;
        var meridiem = "";
        if (getHour >= 12) {
            meridiem = "PM";
        } else {
            meridiem = "AM";
        }
        const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
        return updateTime;
    };       

    // Checked All
    const checkedAll = useCallback(() => {
        const checkall: any = document.getElementById("checkBoxAll");
        const ele = document.querySelectorAll(".invoiceCheckBox");

        if (checkall.checked) {
            ele.forEach((ele: any) => {
                ele.checked = true;
            });
        } else {
            ele.forEach((ele: any) => {
                ele.checked = false;
            });
        }
        deleteCheckbox();
    }, []);

    // Delete Multiple
    const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

    const deleteMultiple = () => {
        const checkall: any = document.getElementById("checkBoxAll");
        selectedCheckBoxDelete.forEach((element: any) => {
            dispatch(onDeleteQuizs(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

    const deleteCheckbox = () => {
        const ele: any = document.querySelectorAll(".invoiceCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };


    const openPopupCreateQuiz = ()=>{
        showPopupCreateQuiz(!isShowPopupCreateQuiz)
    }

    const changeStartTime=(v:any)=>{
        const date = new Date(v);
        setStartTime(date.getTime())
        
    }

    const changeEndTime=(v:any)=>{
        const date = new Date(v);
        setEndTime(date.getTime())
    }

    const changeTitleQuiz=(v:any)=>{
        setTitleQuiz(v.target.value)
    }

    const changeShowAnswer=(key:number, value:string)=>{
        setShowAnswer({key, value})
    }

    const createQuiz=()=>{
        let quiz=quizModel;
        quiz.name=titleQuiz;
        quiz.startTime=startTime;
        quiz.endTime=endTime;
        quiz.isShowCheck=showAnswer.key;
        quiz.code='abc';
        dispatch(addQuizs(quiz));
    }

    //Column
    const columnActions = useMemo(
        () => [
            {
                header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                cell: (cell: any) => {
                    return <input type="checkbox" className="invoiceCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
                accessorKey: "_id",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    return <Link to="/apps-invoices-details" className="fw-medium link-primary">{cell.getValue()}</Link>;
                },
            },
            {
                header: "Tiêu đề",
                accessorKey: "name",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        <div className="d-flex align-items-center">
                            {cell.row.original.img ? <img
                                src={process.env.REACT_APP_API_URL + "/images/users/" + cell.row.original.img}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                            /> :
                                <div className="flex-shrink-0 avatar-xs me-2">
                                    <div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">
                                        {cell.row.original.name.charAt(0) + cell.row.original.name.split(" ").slice(-1).toString().charAt(0)}
                                    </div>
                                </div>}
                            {cell.getValue()}
                        </div>
                    </>
                ),
            },
            {
                header: "ChannelID",
                accessorKey: "channelId",
                enableColumnFilter: false,
            },
            {
                header: "userName",
                accessorKey: "userName",
                enableColumnFilter: false,
            },
            {
                header: "DATE",
                accessorKey: "createdTime",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        {handleValidDate(cell.getValue())},{" "}
                        <small className="text-muted">{handleValidTime(cell.getValue())}</small>
                    </>
                ),
            },            
            {
                header: "START TIME",
                accessorKey: "startTime",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        {handleValidDate(cell.getValue())},{" "}
                        <small className="text-muted">{handleValidTime(cell.getValue())}</small>
                    </>
                ),
            },
            {
                header: "END TIME",
                accessorKey: "endTime",
                enableColumnFilter: false,
                cell: (cell: any) => (
                    <>
                        {handleValidDate(cell.getValue())},{" "}
                        <small className="text-muted">{handleValidTime(cell.getValue())}</small>
                    </>
                ),
            },
            {
                header: "STATUS",
                accessorKey: "status",
                enableColumnFilter: false,
                cell: (cell: any) => {
                    switch (cell.getValue()) {
                        case "Paid":
                            return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
                        case "Unpaid":
                            return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.getValue()} </span>;
                        case "Cancel":
                            return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
                        default:
                            return <span className="badge text-uppercase bg-primary-subtle text-primary"> {cell.getValue()} </span>;
                    }
                }
            },
            {
                header: "Action",
                cell: (cellProps: any) => {
                    return (
                        <UncontrolledDropdown >
                            <DropdownToggle
                                href="#"
                                className="btn btn-soft-secondary btn-sm dropdown"
                                tag="button"
                            >
                                <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="/apps-invoices-details">
                                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                    View
                                </DropdownItem>

                                <DropdownItem href="/apps-invoices-create">
                                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                    Edit
                                </DropdownItem>

                                {/* <DropdownItem href="/#">
                                    <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                                    Download
                                </DropdownItem> */}

                                <DropdownItem divider />

                                <DropdownItem
                                    href="#"
                                    onClick={() => { const quizData = cellProps.row.original; onClickDelete(quizData); }}
                                >
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            },
        ],
        [checkedAll]
    );

    document.title = "Danh sách Quizs | "+ import.meta.env.VITE_META_PAGE_TITLE;

    return (
        <React.Fragment>
            <div className="page-content">
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={() => handleDeleteInvoice()}
                    onCloseClick={() => setDeleteModal(false)}
                />
                <DeleteModal
                    show={deleteModalMulti}
                    onDeleteClick={() => {
                        deleteMultiple();
                        setDeleteModalMulti(false);
                    }}
                    onCloseClick={() => setDeleteModalMulti(false)}
                />

                <Container fluid>
                    <BreadCrumb title="Quizs" pageTitle="Interactive" />
                    
                     <Row>
                        { (quizData.data || []).map((item: any, key: any) => (                                                
                            <React.Fragment key={key}>
                                <Col xl={3} md={6}>
                                <Card className="card-animate">
                                    <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                        <p className="text-uppercase fw-medium text-muted mb-0">
                                            {item.name}
                                        </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                        <h5
                                            className={
                                            "fs-14 mb-0 text-" + item.order
                                            }
                                        >
                                            <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                                            {item.order}
                                        </h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                            <CountUp
                                            start={0}
                                            prefix={item.order}
                                            suffix={item.order}

                                            end={item.order}
                                            duration={4}
                                            className="counter-value"
                                            />
                                        </h4>
                                        <span className="badge bg-warning me-1">
                                            {item.name}
                                        </span>{" "}
                                        <span className="text-muted">
                                            {" "}
                                            {item.name}
                                        </span>
                                        </div>
                                        <div className="avatar-sm flex-shrink-0">
                                        <span className="avatar-title bg-light rounded fs-3">
                                            <FeatherIcon
                                            icon={item.name}
                                            className="text-success icon-dual-success"
                                            />
                                        </span>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row> 
                    
                    <Row>
                        <Col lg={12}>
                            <Card id="quizsList">
                                <CardHeader className="border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Danh sách Quizs</h5>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-2 flex-wrap">
                                            {isMultiDeleteButton && <button className="btn btn-primary me-1"
                                                onClick={() => setDeleteModalMulti(true)}
                                                ><i className="ri-delete-bin-2-line"></i></button>}
                                                <a className="btn btn-danger" onClick={openPopupCreateQuiz}>
                                                    <i className="ri-add-line align-bottom me-1"></i> Create Invoice
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <div>
                                        {isQuizSuccess ? (
                                        <TableContainer
                                            columns={columnActions}
                                            data={(quizData.data || [])}
                                            isGlobalFilter={true}
                                            customPageSize={10}
                                            isQuizListFilter={true}
                                            theadClass="text-muted text-uppercase"
                                            SearchPlaceholder='Tìm theo: ID, tiêu đề, username...'
                                        />
                                        ) : (<Loader error={error} />)
                                        }
                                        <ToastContainer closeButton={false} limit={1} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal id="myModal" isOpen={isShowPopupCreateQuiz}>
                <ModalHeader>
                    <h5 className="modal-title" id="myModalLabel">
                        Nhập thông tin Quiz
                    </h5>
                    <Button type="button" className="btn-close" onClick={() => {showPopupCreateQuiz(false)}} aria-label="Close"></Button>
                </ModalHeader>
                <ModalBody>
                    <Col md={6} lg={12} >
                        <div className="mb-3">
                            <Label htmlFor="labelInput" className="form-label  mb-0">Tiêu đề Quiz</Label>
                            <Input type="text" value={titleQuiz} className="form-control" id="labelInput" onChange={changeTitleQuiz} />
                        </div>
                    </Col>
                    <Col md={6} lg={12}>
                        <div className="mb-3">
                          <Label className="form-label mb-0">Thời gian bắt đầu</Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              dateFormat: "Y-m-d H:i",
                            }}
                            onChange={v=>changeStartTime(v)}
                          />
                        </div>
                    </Col>
                    <Col md={6} lg={12}>
                        <div className="mb-3">
                          <Label className="form-label mb-0">Thời gian kết thúc</Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              dateFormat: "Y-m-d H:i",
                            }}
                            onChange={v=>changeEndTime(v)}
                          />
                        </div>
                    </Col>
                  <Col>
                        <div className="mt-3">
                            <Label>Chọn chế độ có hiển thị đáp án không?</Label>
                            <Dropdown isOpen={showListTagetAnswer} toggle={()=>setListTagetAnswer((prevState) => !prevState)}>
                                <DropdownToggle
                                    tag="div"
                                    className="form-control rounded-end flag-input form-select"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showAnswer.value || 'Chọn chế độ'}
                                </DropdownToggle>
                                <DropdownMenu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                        <DropdownItem as='li' onClick={() => changeShowAnswer(1, 'Không hiển thị ngay đán án.')} className="dropdown-item d-flex">
                                            <div className="flex-grow-1">
                                                <span className="countrylist-codeno text-muted">Không hiển thị ngay đán án.</span>
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem as='li' onClick={() => changeShowAnswer(2, 'Hiển thị đáp án ngay khi trả lời.')} className="dropdown-item d-flex">
                                            <div className="flex-grow-1">
                                                <span className="countrylist-codeno text-muted">Hiển thị đáp án ngay khi trả lời.</span>
                                            </div>
                                        </DropdownItem>
                                    </SimpleBar>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                  </Col>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createQuiz}>
                        Tạo Quiz
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default QuizsList;