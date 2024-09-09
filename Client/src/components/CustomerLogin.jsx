import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import swal from "sweetalert";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./CustomerLogin.css";
import axios from "axios";
import LoginPageImage from "../assets/LoginPageImg.png"

function CustomerLogin() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInput = (e) => {
    console.log("Input");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    // Fetch the packageName from the query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const packageName = queryParams.get("packageName") || "basic";

    // Store the packageName in localStorage
    localStorage.setItem("packageName", packageName);
  }, []);


  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, user)
        .then((resp) => {
          const { accessToken, refreshToken, user } = resp.data;
          const decoded = jwtDecode(accessToken);
          const expiryTime = decoded.exp * 1000;
          console.log(user);

          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          localStorage.setItem("expiry_time", expiryTime);

          dispatch({ type: "IsLoggedIn" });

          const status = user.status;

          switch (status) {
            case "remService": history.push("/configuration"); break;
            case "remAddress": history.push("/address"); break;
            case "remMandate": history.push("/billing"); break;
            case "active": history.push("/cprofile"); break;
            default: history.push("/register"); break;
          }
        })
        .catch((error) => {
          console.log("Error", error);
          swal({
            title: "Error",
            text: "Invalid username or password",
            icon: "error",
            button: "ok",
          });
        });
    }
  }, [errors, submitted, dispatch, history]);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/google-authenticate`, { token: credential })
      // .post("https://d2hd3ezig1ozy6.cloudfront.net/api/v1/auth/google-authenticate", { token: credential })
      .then((resp) => {
        const { access_token, refresh_token } = resp.data;
        const decoded = jwtDecode(access_token);
        const expiryTime = decoded.exp * 1000;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expiry_time", expiryTime);

        dispatch({ type: "IsLoggedIn" });
        history.push("/cprofile");
      })
      .catch((error) => {
        console.log("Error", error);
        swal({
          title: "Error",
          text: "Google login failed",
          icon: "error",
          button: "ok",
        });
      });
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    swal({
      title: "Error",
      text: "Google login failed",
      icon: "error",
      button: "ok",
    });
  };

  return (
    <div className="container login-container">
      <div className="row align-items-center">
        <div className="col-md-6 d-none d-md-block">
          <img
            src={LoginPageImage}
            alt="login"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 login-form">
          <h2 className="text-center">Login to continue</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <span className="text-danger">*</span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="userEmail"
                placeholder="Enter email"
                style={{borderLeft: "ridge", borderLeftWidth: "thin"}}
                value={user.userEmail}
                onChange={handleInput}
                required
              />
              {errors.userEmail && (
                <small className="text-danger float-right">
                  {errors.userEmail}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="userEmail" className="form-label">
                <span>Password</span>
                <span className="text-danger">*</span>
              </label>

              <div className="input-group" style={{borderLeft: "ridge", borderLeftWidth: "thin"}}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Password"
                  required
                  className="form-control"
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{ marginTop: "0px" }}
                    onClick={togglePasswordVisibility}
                  >
                    <i className={isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                  </button>
                </div>
              </div>

              {errors.password && <span className="error-message px-3">{errors.password}</span>}
            </div>

            <div className="links">
              <a href="/forgotPassword" className="btn btn-link p-0">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              LOGIN
            </button>
          </form>
          <p className="text-center mt-3">or sign up using</p>
          <div className="d-flex justify-content-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />

          </div>
          <div className="d-flex justify-content-center">
            <a href="/register" className="btn btn-link p-0">
              Don't have an account? Sign up
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
