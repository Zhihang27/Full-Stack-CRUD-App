import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    //Moved loadUser within the Effect instead of seprate, fix error issues
    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/user/${id}`);
                setUser(result.data);
            } catch (error) {
                console.error("There was an error fetching the user!", error);
            }
        };

        loadUser();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/user/${id}`, user);
            navigate("/");
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Update Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Update Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Update E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
