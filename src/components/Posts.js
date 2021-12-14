import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react'
import Axios from 'axios'
// import { useForm } from 'react-hook-form'

function Posts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState('')
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [titleErr, setTitleErr] = useState({})
    const [bodyErr, setBodyErr] = useState({})

    useEffect(() => {
        getData();

    }, [])
    const getData = () => {
        fetch("http://localhost:3001/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const isValid = formValidation();
        if (isValid) {
            if (isEdit) {
                Axios.put(`http://localhost:3001/posts/${editId}`, {
                    title: title,
                    body: body
                })
                    .then((res) => {
                        setIsEdit(false)
                        setEditId('')
                        setTitle('');
                        setBody('');
                        getData();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                console.log(title,body)
                Axios.post("http://localhost:3001/posts", {
                    title: title,
                    body: body
                })
                    .then((res) => {
                        getData();
                        setTitle('');
                        setBody('');
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

        }
    }

    const formValidation = () => {
        const titleErr = {}
        const bodyErr = {}
        let isValid = true
        if (title.trim().length === 0) {
            titleErr.emptyTitle = "empty title"
            isValid = false
        }
        if (body.trim().length === 0) {
            bodyErr.emptyBody = "empty description"
            isValid = false
        }
        setTitleErr(titleErr)
        setBodyErr(bodyErr)
        return isValid

    }

    //delete
    const deleteHandler = (item) => {
        console.log(item, "item")
        Axios.delete(`http://localhost:3001/posts/${item}`)
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err)
            })
    };
    //edit//update
    const editHandler = (item) => {
        setTitle(item.title);
        setBody(item.body);
        setEditId(item.id)
        setIsEdit(true)
    }

    //error and loading state
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Header />
                <div style={{ textAlign: 'center' }}>
                    <form onSubmit={submitHandler}>
                        <label for="title">Enter Title:</label><br />
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id="title" name="title" /><br />
                        {Object.keys(titleErr).map((key) => {
                            return <div style={{ color: "red" }}>{titleErr[key]}</div>
                        })}
                        <label for="body">Enter Description:</label><br />
                        <input type="text" onChange={(e) => setBody(e.target.value)} value={body} id="body" name="body" /><br />
                        {Object.keys(bodyErr).map((key) => {
                            return <div style={{ color: "red" }}>{bodyErr[key]}</div>
                        })}
                        {
                            isEdit ?
                                <button type="submit" >Update</button>
                                :
                                <button type="submit" >Submit</button>
                        }
                    </form>
                </div>
                <ul>
                    {items.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <ul>
                                    <li>ID :- {index + 1}</li>
                                    <li>TITLE :- {item.title}</li>
                                    <li>DESCRIPTION :- {item.body}</li>
                                    <button onClick={() => { deleteHandler(item.id) }} ><i className="material-icons">delete</i></button>
                                    <button onClick={() => { editHandler(item) }}><i className="material-icons">EDIT</i></button>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </>
        );
    }
}
export default Posts
