import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import "./RegCustomer.css";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import axios from "axios";
import ProgressBar from "./ProgressBar.jsx"
import { Margin } from "@mui/icons-material";

const RegCustomer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
    cpwd: '',
    phone: '',
    altPhone: '',
    businessName: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

    // State to toggle password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    switch (name) {
      case 'firstName':
        if (!value || !nameRegex.test(value)) {
          newErrors.firstName = 'First name is required and should only contain letters';
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (!value || !nameRegex.test(value)) {
          newErrors.lastName = 'Last name is required and should only contain letters';
        } else {
          delete newErrors.lastName;
        }
        break;
      case 'phone':
        if (!value || !phoneRegex.test(value)) {
          newErrors.phone = 'Phone number is required and should be in UK format';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'altPhone':
        if (!value || !phoneRegex.test(value)) {
          newErrors.altPhone = 'Landline number is required and should be in UK format';
        } else {
          delete newErrors.altPhone;
        }
        break;
      case 'userEmail':
        if (!value || !emailRegex.test(value)) {
          newErrors.userEmail = 'Valid email is required';
        } else {
          delete newErrors.userEmail;
        }
        break;
      case 'businessName':
        if (!value) {
          newErrors.businessName = 'Business Name is required';
        } else {
          delete newErrors.businessName;
        }
        break;
      case 'password':
        if (!value || !passwordRegex.test(value)) {
          newErrors.password = 'Password is required and should be at least 8 characters long, contain one capital letter, one special character, and one number';
        } else {
          delete newErrors.password;
        }
        // Check password confirmation when password changes
        if (user.cpwd && value !== user.cpwd) {
          newErrors.cpwd = 'Passwords do not match';
        } else {
          delete newErrors.cpwd;
        }
        break;
      case 'cpwd':
        if (value !== user.password) {
          newErrors.cpwd = 'Passwords do not match';
        } else {
          delete newErrors.cpwd;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateForm = () => {
    Object.entries(user).forEach(([name, value]) => validateField(name, value));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const loginUser = async (validateUser) => {
    try {
      const resp = await axios.post('http://localhost:3000/api/v1/auth/login', validateUser);
      const { accessToken, refreshToken } = resp.data;
      const decoded = jwtDecode(accessToken);
      const expiryTime = decoded.exp * 1000;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("expiry_time", expiryTime);

      dispatch({ type: "IsLoggedIn" });
      history.push('/configuration');
    } catch (e) {
      swal({
        title: 'Error',
        text: 'Customer not registered',
        icon: 'error',
        button: 'ok',
      });
    }
  };

  useEffect(() => {
    if (submitted) {
      axios
        .post('http://localhost:3000/api/v1/auth/register', user)
        .then((resp) => {
          swal({
            title: 'Success',
            text: 'Thanks for registering!',
            icon: 'success',
            button: 'ok',
          });

          const validateUser = {
            userEmail: user.userEmail,
            password: user.password
          };

          loginUser(validateUser);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message.includes("Duplicate entry")) {
            swal({
              title: 'Error',
              text: 'User with this email already exists',
              icon: 'error',
              button: 'ok',
            });
          } else {
            swal({
              title: 'Error',
              text: 'Customer not registered',
              icon: 'error',
              button: 'ok',
            });
          }
        });
    }
  }, [submitted]);

  return (
    <div className="container container-form mt-5 d-flex flex-column">
      <ProgressBar currentStep={currentStep} />
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Drive success with seamless communication</h1>
          <p className="signup-subtitle">Please fill the details below to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form px-5">
          <div className="d-flex flex-row">
            <div className="col-md-6">
              <label htmlFor="userEmail" className="form-label">
                <span>First Name</span>
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleInput}
                placeholder="First Name"
                required
              />
              {errors.firstName && <div className="text-danger small mt-1 px-3">{errors.firstName}</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="userEmail" className="form-label">
                <span>Last Name</span>
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleInput}
                placeholder="Last Name"
                required
              />
              {errors.lastName && <div className="text-danger small mt-1 px-3">{errors.lastName}</div>}
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="col-md-6 mb-3">
              <div className="">
                <label htmlFor="userEmail" className="form-label">
                  <span>Mobile Number</span>
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="Mobile Number"
                  required
                />
              </div>
              {errors.phone && <div className="text-danger small mt-1 px-3">{errors.phone}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <div className="">
                <label htmlFor="userEmail" className="form-label">
                  <span>Landline Number</span>
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="altPhone"
                  name="altPhone"
                  value={user.altPhone}
                  onChange={handleInput}
                  placeholder="Landline Number"
                  required
                />
              </div>
              {errors.altPhone && <div className="text-danger small mt-1 px-3">{errors.altPhone}</div>}
            </div>
          </div>
          <div className="form-group px-3">
            <label htmlFor="userEmail" className="form-label">
              <span>Email Address </span>
              <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={user.userEmail}
              onChange={handleInput}
              placeholder={"Email Address"}
              required
            />
            {errors.userEmail && <span className="error-message px-3">{errors.userEmail}</span>}
          </div>
          <div className="form-group px-3">
            <label htmlFor="userEmail" className="form-label">
              <span>Business Name</span>
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={user.businessName}
              onChange={handleInput}
              placeholder="Business Name"
              required
            />
            {errors.businessName && <span className="error-message px-3">{errors.businessName}</span>}
          </div>
          {/* <div className="form-group px-3">
            <label htmlFor="userEmail" className="form-label">
              <span>Password</span>
              <span className="text-danger">*</span>
              <span
                className="info-button ml-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Password should be at least 8 characters long, contain one capital letter, one special character, and one number">
                <i className="fa fa-info-circle"></i>
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Password"
              required
            />
            {errors.password && <span className="error-message px-3">{errors.password}</span>}
          </div> */}
          <div className="form-group px-3">
            <label htmlFor="userEmail" className="form-label">
              <span>Password</span>
              <span className="text-danger">*</span>
              <span
                className="info-button ml-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Password should be at least 8 characters long, contain one capital letter, one special character, and one number"
              >
                <i className="fa fa-info-circle"></i>
              </span>
            </label>

            <div className="input-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Password"
                className="form-control"
                style={{borderLeft: "ridge", borderLeftWidth: "thin", padding: "1.5rem", borderRadius: "6px 6px 0"}}
                required
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{marginTop: "0px"}}
                  onClick={togglePasswordVisibility}
                >
                  <i className={isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                </button>
              </div>
            </div>

            {errors.password && <span className="error-message px-3">{errors.password}</span>}
          </div>
          
          <div className="form-group px-3">
            <label htmlFor="userEmail" className="form-label">
              <span>Confirm Password</span>
              <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="cpwd"
              name="cpwd"
              value={user.cpwd}
              onChange={handleInput}
              placeholder="Confirm Password"
              required
            />
            {errors.cpwd && <span className="error-message px-3">{errors.cpwd}</span>}
          </div>
          <div className="d-flex flex-col justify-content-center">
            <button type="submit" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm w-50" disabled={Object.keys(errors).length > 0}>
              Create Account
            </button>
          </div>

          <p className="terms-text">
            By signing up, you agree to Pinevox's <a href="https://pinevox.com/terms-of-service/">Terms of Service</a> & <a href="https://pinevox.com/privacy-policy/">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegCustomer;