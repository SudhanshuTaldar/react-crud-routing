import React from 'react';
import Header from './Header';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router';


function Users() {
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup.object().shape({
        Name: yup.string().required(),
        Username: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).required(),
        Website: yup.string().required(),
        street: yup.string().required(),
        Suite: yup.string().required(),
        City: yup.string().required(),
        Zipcode: yup.number().min(10).required(),
        Lat: yup.number().min(-180).max(+180).required(),
        Lng: yup.number().min(-180).max(+180).required(),
        companyName: yup.string().required(),
        catchPhrase: yup.string().required(),
        bs: yup.string().required(),
    })
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema), mode: "onBlur"
    })
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState('')

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');

    // address
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    //address//geo
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    //company
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [bs, setBs] = useState('');

    useEffect(() => {
        getData();

    }, [])

   
    const getData = () => {
        fetch("http://localhost:3001/users")
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
        // e.preventDefault();
        if (isEdit) {
            Axios.put(`http://localhost:3001/users/${editId}`, {
                name: name,
                username: username,
                email: email,
                address: {
                    street: street,
                    suite: suite,
                    city: city,
                    zipcode: zipcode,
                    geo: {
                        lat: lat,
                        lng: lng,
                    }
                },
                phone: phone,
                website: website,
                company: {
                    name: companyName,
                    catchPhrase: catchPhrase,
                    bs: bs
                }
            })
                .then((res) => {
                    setIsEdit(false)
                    setEditId('')
                    setName('');
                    setUsername('');
                    setEmail('');
                    setPhone('');
                    setWebsite('');
                    setStreet('');
                    setSuite('');
                    setCity('');
                    setZipcode('');
                    setLat('');
                    setLng('');
                    setCompanyName('');
                    setCatchPhrase('');
                    setBs('');
                    getData();
                })
                .catch((err) => {
                    console.log(err)
                })


        } else {
            Axios.post("http://localhost:3001/users", {
                name: name,
                username: username,
                email: email,
                address: {
                    street: street,
                    suite: suite,
                    city: city,
                    zipcode: zipcode,
                    geo: {
                        lat: lat,
                        lng: lng,
                    }
                },
                phone: phone,
                website: website,
                company: {
                    name: companyName,
                    catchPhrase: catchPhrase,
                    bs: bs
                }
            })
                .then((res) => {
                    getData();
                    setName('');
                    setUsername('');
                    setEmail('');
                    setPhone('');
                    setWebsite('');
                    setStreet('');
                    setSuite('');
                    setCity('');
                    setZipcode('');
                    setLat('');
                    setLng('');
                    setCompanyName('');
                    setCatchPhrase('');
                    setBs('');
                    navigate('/file_upload', {
                        state: {
                            name: name,
                            username: username,
                            email: email,
                            address: {
                                street: street,
                                suite: suite,
                                city: city,
                                zipcode: zipcode,
                                geo: {
                                    lat: lat,
                                    lng: lng,
                                }
                            },
                            phone: phone,
                            website: website,
                            company: {
                                name: companyName,
                                catchPhrase: catchPhrase,
                                bs: bs
                            }
                        }
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    //delete
    const deleteHandler = (item) => {
        Axios.delete(`http://localhost:3001/users/${item}`)
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err)
            })
    };

    //edit//update
    const editHandler = (item) => {
        setName(item.name);
        setUsername(item.username);
        setEmail(item.email);
        setStreet(item.address.street);
        setSuite(item.address.suite);
        setCity(item.address.city);
        setZipcode(item.address.zipcode);
        setLat(item.address.geo.lat);
        setLng(item.address.geo.lng);
        setPhone(item.phone);
        setWebsite(item.website);
        setCompanyName(item.company.name);
        setCatchPhrase(item.company.catchPhrase);
        setBs(item.company.bs);
        setEditId(item.id)
        setIsEdit(true)
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Header />
                <div style={{ textAlign: 'center' }}>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="row">
                            <div className="col-md-4">
                                <label for="Name">Enter Name:</label><br />
                                <input type="text" onChange={(e) => setName(e.target.value)} id="Name" value={name} name="Name" ref={register} /><br />
                                <p>{errors.Name?.message}</p>
                                <label for="Username">Enter Username:</label><br />
                                <input type="text" onChange={(e) => setUsername(e.target.value)} id="Username" value={username} name="Username" ref={register} /><br />
                                <p>{errors.Username?.message}</p>
                                <label for="Email">Enter Email:</label><br />
                                <input type="email" onChange={(e) => setEmail(e.target.value)} id="Email" value={email} name="Email" ref={register} /><br />
                                <p>{errors.Email?.message}</p>
                                <label for="phone">Enter Phone:</label><br />
                                <input type="text" onChange={(e) => setPhone(e.target.value)} maxLength="10" id="Phone" value={phone} name="Phone" ref={register} /><br />
                                <p>{errors.Phone?.message}</p>
                                <label for="Website">Enter Website:</label><br />
                                <input type="text" onChange={(e) => setWebsite(e.target.value)} id="Website" value={website} name="Website" ref={register} /><br />
                                <p>{errors.Website?.message}</p>
                            </div>

                            <div className="col-md-4">
                                <h5>Enter Address</h5>
                                <label for="street">Enter Street:</label><br />
                                <input type="text" onChange={(e) => setStreet(e.target.value)} id="street" value={street} name="street" ref={register} /><br />
                                <p>{errors.street?.message}</p>
                                <label for="Suite">Enter Suite:</label><br />
                                <input type="text" onChange={(e) => setSuite(e.target.value)} id="Suite" value={suite} name="Suite" ref={register} /><br />
                                <p>{errors.Suite?.message}</p>
                                <label for="City">Enter City:</label><br />
                                <input type="text" onChange={(e) => setCity(e.target.value)} id="City" value={city} name="City" ref={register} /><br />
                                <p>{errors.City?.message}</p>
                                <label for="Zipcode">Enter Zipcode:</label><br />
                                <input type="text" onChange={(e) => setZipcode(e.target.value)} id="Zipcode" value={zipcode} name="Zipcode" ref={register} /><br />
                                <p>{errors.Zipcode?.message}</p>
                                <div>
                                    <h5>Enter Geo</h5>
                                    <label for="Lat">Enter Lat:</label><br />
                                    <input type="text" onChange={(e) => setLat(e.target.value)} id="Lat" value={lat} name="Lat" ref={register} /><br />
                                    <p>{errors.Lat?.message}</p>
                                    <label for="Lng">Enter Lng:</label><br />
                                    <input type="text" onChange={(e) => setLng(e.target.value)} id="Lng" value={lng} name="Lng" ref={register} /><br />
                                    <p>{errors.Lng?.message}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h5>Enter Company Name</h5>
                                <label for="companyName">Enter companyName:</label><br />
                                <input type="text" onChange={(e) => setCompanyName(e.target.value)} id="companyName" value={companyName} name="companyName" ref={register} /><br />
                                <p>{errors.companyName?.message}</p>
                                <label for="catchPhrase">Enter CatchPhrase:</label><br />
                                <input type="text" onChange={(e) => setCatchPhrase(e.target.value)} id="catchPhrase" value={catchPhrase} name="catchPhrase" ref={register} /><br />
                                <p>{errors.catchPhrase?.message}</p>
                                <label for="bs">Enter Bs:</label><br />
                                <input type="text" onChange={(e) => setBs(e.target.value)} id="bs" value={bs} name="bs" ref={register} /><br />
                                <p>{errors.bs?.message}</p>
                            </div>
                        </div>
                        {
                            isEdit ?
                                <button type="submit">Update</button>
                                :
                                <button type="submit">Submit</button>
                        }
                        {/* <button onClick={nextPage}>next</button> */}
                    </form>
                </div>

                <ul>
                    {items.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <ul>
                                    <li>ID: {index + 1}</li>
                                    <li>Name: {item.name}</li>
                                    <li>Email: {item.email}</li>
                                    <li>Username: {item.username}</li>
                                    <button onClick={() => { deleteHandler(item.id) }}><i class="material-icons">delete</i></button>
                                    <button onClick={() => { editHandler(item) }}><i class="material-icons">EDIT</i></button>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </>
        );
    }
}
export default Users
