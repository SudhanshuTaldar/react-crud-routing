import React, { useState, useEffect, useReducer } from "react";
import Axios from 'axios'
import Header from "./Header";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UserReducer() {

    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({ id: "", name: "", username: "", email: "", street: "", suite: "", city: "", zipcode: "", lat: "", lng: "", phone: "", website: "", companyName: "", catchPhrase: "", bs: "" })

    const reducer = (state, action) => {
        if (action.type === 'SET') {
            state.user = action.payload
            return state
        }
        else if (action.type === "ADD_DATA") {
            return {
                ...state,
                user: state.user.concat(action.payload)
            }
        } else if (action.type === "DELETE") {
            Axios.delete(`http://localhost:3001/users/${action.payload}`).then(res => console.log(res))
            return {
                ...state,
                user: state.user.filter(users => users.id !== action.payload)
            }
        }
        else if (action.type === "EDIT") {
            setIsEdit(true)
            Axios.get(`http://localhost:3001/users?id=${action.payload}`).then(res => {
                setData(e => ({ ...e, id: action.payload }))
                setData(e => ({ ...e, name: res.data[0].name }))
                setData(e => ({ ...e, username: res.data[0].username }))
                setData(e => ({ ...e, email: res.data[0].email }))
                setData(e => ({ ...e, street: res.data[0].address.street }))
                setData(e => ({ ...e, suite: res.data[0].address.suite }))
                setData(e => ({ ...e, city: res.data[0].address.city }))
                setData(e => ({ ...e, zipcode: res.data[0].address.zipcode }))
                setData(e => ({ ...e, lat: res.data[0].address.geo.lat }))
                setData(e => ({ ...e, lng: res.data[0].address.geo.lng }))
                setData(e => ({ ...e, phone: res.data[0].phone }))
                setData(e => ({ ...e, website: res.data[0].website }))
                setData(e => ({ ...e, companyName: res.data[0].company.name }))
                setData(e => ({ ...e, catchPhrase: res.data[0].company.catchPhrase }))
                setData(e => ({ ...e, bs: res.data[0].company.bs }))
                console.log(res.data, "ll")
            })
            return state


        }
        else return state
    }

    const initialState = {
        user: []
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).required(),
        website: yup.string().required(),
        street: yup.string().required(),
        suite: yup.string().required(),
        city: yup.string().required(),
        zipcode: yup.number().min(10).required(),
        lat: yup.number().min(-180).max(+180).required(),
        lng: yup.number().min(-180).max(+180).required(),
        companyName: yup.string().required(),
        catchPhrase: yup.string().required(),
        bs: yup.string().required(),
    })
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema), mode: "onBlur"
    })

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchData = async () => {
        const response = await fetch("http://localhost:3001/users")
        const postdata = await response.json()
        dispatch({ type: 'ADD_DATA', payload: postdata })
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleChange(e) {
        const { name, value } = e.target;
        setData(e => ({
            ...e,
            [name]: value,
        }))
        dispatch({ [name]: value })
    }

    const submitHandler = async () => {

        if (isEdit) {
            Axios.put(`http://localhost:3001/users/${data.id}`, {
                name: data.name,
                username: data.username,
                email: data.email,
                address: {
                    street: data.street,
                    suite: data.suite,
                    city: data.city,
                    zipcode: data.zipcode,
                    geo: {
                        lat: data.lat,
                        lng: data.lng,
                    }
                },
                phone: data.phone,
                website: data.website,
                company: {
                    name: data.companyName,
                    catchPhrase: data.catchPhrase,
                    bs: data.bs
                }
            })
            const response = await fetch("http://localhost:3001/users")
            const postdata = await response.json()
            dispatch({ type: 'SET', payload: postdata })
            setData({ id: "", name: "", username: "", email: "", street: "", suite: "", city: "", zipcode: "", lat: "", lng: "", phone: "", website: "", companyName: "", catchPhrase: "", bs: "" })
            setIsEdit(false)
        } else {
            Axios.post("http://localhost:3001/users", {
                name: data.name,
                username: data.username,
                email: data.email,
                address: {
                    street: data.street,
                    suite: data.suite,
                    city: data.city,
                    zipcode: data.zipcode,
                    geo: {
                        lat: data.lat,
                        lng: data.lng,
                    }
                },
                phone: data.phone,
                website: data.website,
                company: {
                    name: data.companyName,
                    catchPhrase: data.catchPhrase,
                    bs: data.bs
                }
            })
            dispatch({ type: "ADD_DATA", payload: data })
        }
        reset(initialState)
    };


    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="row">
                        <div className="col-md-4">
                            <label for="Name">Enter Name:</label><br />
                            <input type="text" onChange={handleChange} id="Name" name="name" value={data.name} ref={register} /><br />
                            <p>{errors.Name?.message}</p>
                            <label for="Username">Enter Username:</label><br />
                            <input type="text" onChange={handleChange} id="Username" name="username" value={data.username} ref={register} /><br />
                            <p>{errors.Username?.message}</p>
                            <label for="Email">Enter Email:</label><br />
                            <input type="email" onChange={handleChange} id="Email" name="email" value={data.email} ref={register} /><br />
                            <p>{errors.Email?.message}</p>
                            <label for="phone">Enter Phone:</label><br />
                            <input type="text" onChange={handleChange} maxLength="10" id="Phone" value={data.phone} name="phone" ref={register} /><br />
                            <p>{errors.Phone?.message}</p>
                            <label for="Website">Enter Website:</label><br />
                            <input type="text" onChange={handleChange} id="Website" name="website" value={data.website} ref={register} /><br />
                            <p>{errors.Website?.message}</p>
                        </div>

                        <div className="col-md-4">
                            <h5>Enter Address</h5>
                            <label for="street">Enter Street:</label><br />
                            <input type="text" onChange={handleChange} id="street" name="street" value={data.street} ref={register} /><br />
                            <p>{errors.street?.message}</p>
                            <label for="Suite">Enter Suite:</label><br />
                            <input type="text" onChange={handleChange} id="Suite" name="suite" value={data.suite} ref={register} /><br />
                            <p>{errors.Suite?.message}</p>
                            <label for="City">Enter City:</label><br />
                            <input type="text" onChange={handleChange} id="City" name="city" value={data.city} ref={register} /><br />
                            <p>{errors.City?.message}</p>
                            <label for="Zipcode">Enter Zipcode:</label><br />
                            <input type="text" onChange={handleChange} id="Zipcode" name="zipcode" value={data.zipcode} ref={register} /><br />
                            <p>{errors.Zipcode?.message}</p>
                            <div>
                                <h5>Enter Geo</h5>
                                <label for="Lat">Enter Lat:</label><br />
                                <input type="text" onChange={handleChange} id="Lat" name="lat" value={data.lat} ref={register} /><br />
                                <p>{errors.Lat?.message}</p>
                                <label for="Lng">Enter Lng:</label><br />
                                <input type="text" onChange={handleChange} id="Lng" name="lng" value={data.lng} ref={register} /><br />
                                <p>{errors.Lng?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5>Enter Company Name</h5>
                            <label for="companyName">Enter companyName:</label><br />
                            <input type="text" onChange={handleChange} id="companyName" name="companyName" value={data.companyName} ref={register} /><br />
                            <p>{errors.companyName?.message}</p>
                            <label for="catchPhrase">Enter CatchPhrase:</label><br />
                            <input type="text" onChange={handleChange} id="catchPhrase" name="catchPhrase" value={data.catchPhrase} ref={register} /><br />
                            <p>{errors.catchPhrase?.message}</p>
                            <label for="bs">Enter Bs:</label><br />
                            <input type="text" onChange={handleChange} id="bs" name="bs" value={data.bs} ref={register} /><br />
                            <p>{errors.bs?.message}</p>
                        </div>
                    </div>
                    {
                        isEdit ?
                            <button type="submit" >Update</button>
                            :
                            <button type="submit" >Submit</button>
                    }
                </form>
            </div>
            <ul>
                {state.user.map((item, index) => {
                    return (
                        <li key={index}>
                            <ul>
                                <li>ID: {index + 1}</li>
                                <li>Name: {item.name}</li>
                                <li>Email: {item.email}</li>
                                <li>Username: {item.username}</li>
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


export default UserReducer;