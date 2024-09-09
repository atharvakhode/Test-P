import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function ResetPassword() {

    const [data, setData] = useState({
        password: "",
    });

    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // const userData = {
        //   password: password,
        // };

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/forgot-password`, data)
            .then((response) => {
                console.log(response);
                JSON.stringify(response);
                swal({
                    title: "Success",
                    text: "Password has been successfully updated",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    history.push("/clogin");
                });
            })
            .catch((error) => {
                console.log(error.response);
                swal({
                    title: "Error",
                    text: "Error occured",
                    icon: "error",
                    button: "OK",
                }).then(() => {
                    history.push("/forgotPassword");
                });;
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src="https://via.placeholder.com/600x800"
                        alt="login"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="text-center mb-4">Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Enter new Password</label>
                                <input
                                    type="text"
                                    name="password"
                                    onChange={handleChange}
                                    className="form-control mt-1"
                                    placeholder="Please Enter new password"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Confirm new password</label>
                                <input
                                    type="text"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    className="form-control mt-1"
                                    placeholder="Please confirm new password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mt-4">
                                Reset Password
                            </button>
                            <div className="text-center mt-3">
                                <Link to="/clogin">Back to Login</Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword
