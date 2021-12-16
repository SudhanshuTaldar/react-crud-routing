import React, { useState, useEffect, useReducer } from "react";
import Axios from 'axios'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Header from "./Header";

function PostReducer() {
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({ id: '', title: '', body: '' })

    const reducer = (state, action) => {
        // console.log(action)
        if (action.type === 'SET') {
            state.post = action.payload
            return state
        }
        else if (action.type === "ADD_DATA") {

            return {
                ...state,
                post: state.post.concat(action.payload)
            }
        } else if (action.type === "DELETE") {
            Axios.delete(`http://localhost:3001/posts/${action.payload}`).then(res => console.log(res))

            return {
                ...state,
                post: state.post.filter(posts => posts.id !== action.payload)
            }
        } else if (action.type === "EDIT") {
            setIsEdit(true)
            Axios.get(`http://localhost:3001/posts?id=${action.payload}`).then(res => {
                setData(ev => ({
                    ...ev,
                    id: res.data[0].id,
                }))
                setData(ev => ({
                    ...ev,
                    title: res.data[0].title,
                }))
                setData(ev => ({
                    ...ev,
                    body: res.data[0].body,
                }))

            })
            return state


        }
        else return state
    }

    const initialState = {
        post: []
    }
    const schema = Yup.object().shape({
        title: Yup.string()
            .required('title is required'),
        body: Yup.string()
            .required("body is required"),
    });

    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchData = async () => {
        const response = await fetch("http://localhost:3001/posts")
        const postdata = await response.json()
        dispatch({ type: 'ADD_DATA', payload: postdata })
    }

    useEffect(() => {
        fetchData()
    }, [])
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData(ev => ({
            ...ev,
            [name]: value,
        }))
        dispatch({ [name]: value })
    }
    const submitHandler = async () => {
        if (isEdit) {

            
            Axios.put(`http://localhost:3001/posts/${data.id}`, {
                title: data.title,
                body: data.body
            })
            const response = await fetch("http://localhost:3001/posts")
            const postdata = await response.json()
            dispatch({ type: 'SET', payload: postdata })
            setData({ id: '', title: '', body: '' })
            setIsEdit(false)
        }
        else {
            Axios.post("http://localhost:3001/posts", {
                title: data.title,
                body: data.body
            })


            dispatch({ type: "ADD_DATA", payload: data })
        }
        reset(initialState)
    }


    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <label for="title">Enter Title:</label><br />
                    <input type="text" id="title" onChange={changeHandler} value={data.title} name="title" ref={register} /><br />
                    <p>{errors.title?.message}</p>

                    <label for="body">Enter Description:</label><br />
                    <input type="text" id="body" onChange={changeHandler} value={data.body} name="body" ref={register} /><br />
                    <p>{errors.body?.message}</p>

                    {
                        isEdit ?
                            <button type="submit" >Update</button>
                            :
                            <button type="submit" >Submit</button>
                    }
                </form>
            </div>
            <ul>
                {state.post.map((item, index) => {
                    return (
                        <li key={index}>
                            <ul>
                                <li>ID :- {index + 1}</li>
                                <li>TITLE :- {item.title}</li>
                                <li>DESCRIPTION :- {item.body}</li>
                                <button onClick={() => dispatch({ type: "DELETE", payload: item.id })} >delete</button>
                                <button onClick={() => dispatch({ type: "EDIT", payload: item.id })} >edit</button>
                            </ul>
                        </li>
                    )
                })}
            </ul>

        </>

    );
}


export default PostReducer;