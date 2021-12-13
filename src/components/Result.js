import React from 'react'
import { useLocation } from "react-router";
import { useState } from 'react';
import Header from './Header';
import Axios from 'axios';


function Result() {
    const { state } = useLocation();
    // console.log(state)

    const [data, setData] = useState()
    const [show, setShow] = useState(true);

    const uploadAll = () => {
        setData({ state })
        setShow(false)
        Axios.post('http://localhost:3001/users',{
            data:data
        }).then(res=>{
            console.log(res,"res")
        })
    }
    return (

        <>
            <Header />
            <div>

                <button onClick={uploadAll}>upload</button>
            </div>
            <div>
                {show ? "" : console.log("dsad", data)}
            </div>
        </>
    )
}

export default Result
