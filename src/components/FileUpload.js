import React, { useState } from "react";
import { useLocation } from "react-router";
import "../styles.css"
import { useFileUpload } from "use-file-upload";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


const FileUpload = () => {

    const defaultSrc =
        "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

    const [files, selectFiles] = useFileUpload();
    const [source, setSource] = useState("");
    // const location = useLocation();

    const uploadFile = () => {
        selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
            // console.log("Files Selected", { name, size, source, file });
        })
        setSource(source)
        setShow(false)
    }
    const { state } = useLocation();
    const navigate = useNavigate();
    const next = () => {
        navigate('/result', {
            state: {
                data:state,
                avr:files
            }
        })
    }
    const [show, setShow] = useState(true)
    return (
        <>
            <Header />
            <div id="app">
                <img src={files?.source || defaultSrc} alt="preview" />
                {
                    show ?
                        <button onClick={uploadFile}> Upload Avatar</button> :
                        <button onClick={next}> Next</button>
                }
            </div>
        </>
    );
};
export default FileUpload;
