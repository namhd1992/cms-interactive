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
    Button
} from "reactstrap";
import Dropzone from "react-dropzone";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { FilePond,  registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//redux
import { useDispatch } from "react-redux";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


interface QuestionProps{
    question?: any,
    setQuestion?: any
}

interface SizeImgQuestion{
    width?: number,
    height?: number
}


const FormQuestion : FC<QuestionProps> = ({
    question,
    setQuestion
    }) => {
  
    const [selectedFiles, setselectedFiles] = useState([]);
    const [files, setFiles] = useState<any>([]);
    const [size, setSize] = useState<SizeImgQuestion>({width:150,height:60});

    useEffect(() => {
      
    }, []);

   
  
    const handleAcceptedFile=(files : any)=> {
      files.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      console.log(files)
      setselectedFiles(files);
    }
    /**
     * Formats the size
     */
    const formatBytes=(bytes : any, decimals = 2)=> {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    const handleAcceptedFiles=(v:any)=>{
        console.log(v)
        setFiles
        setSize({width:300, height:250})
    }

    const showPopupUploadImg=()=>{
        console.log(files)
    }
    const handleChangeTitleQuestion=(e:any)=>{
        setQuestion((item:any) => ({ ...item, value: e.target.innerHTML }));
    }




    return (
        <div className="page-content">
            <Row>
                <Button color="success" onClick={showPopupUploadImg} size="30"><i className="mdi mdi-camera align-bottom"></i></Button>
            </Row>
            <Row>
                <div contentEditable="true" data-text="Nhập câu hỏi vào đây." style={{textAlign:'center'}}  onInput={handleChangeTitleQuestion}> 
                </div>
            </Row>
            {/* {(question.img.length>0)?(<>
                <div>

                </div>
            </>):(<>
                <div style={{width:size.width, height:size.height}}>
                     <FilePond
                        files={files}
                        onupdatefiles={v=>handleAcceptedFiles(v)}
                        onactivatefile={handleAcceptedFile}
                        onremovefile={handleSave}
                        allowMultiple={false}
                        maxFiles={1}
                        name="files"
                        labelIdle='<span class="filepond--label-action">Upload Image</span>'

                      />
                    <Button color="success" onClick={handleSave} ><i className="mdi mdi-camera align-bottom"></i></Button>
                    <Row xxl={9}>
                        <div contentEditable="true" onInput={handleChangeTitleQuestion}>
                            
                        </div>
                    </Row>

                </div>
            </>)} */}
            
            
            {/* <Container fluid>
                <Row className="justify-content-center">
                    <Col xxl={9}>
                        <Button color="success" onClick={() => handleOpenPopupImg()}><i className="mdi mdi-camera align-bottom"></i></Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xxl={9}>
                        <span>{question}</span>
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
};

export default FormQuestion;
