import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import api from "../util/axiosConfig.js"
import ProgressBar from "./ProgressBar.jsx";
import axios from "axios";

const Address = () => {
  const apiKey = "CvmjTpTwWUedB8nNMCKxXQ43497";

  const [companyPostcode, setCompanyPostcode] = useState("");
  const [companyPostcodeSuggestions, setCompanyPostcodeSuggestions] = useState(
    []
  );

  const [billingPostcode, setBillingPostcode] = useState("");
  const [billingPostcodeSuggestions, setBillingPostcodeSuggestions] = useState(
    []
  );

  const [deliveryPostcode, setDeliveryPostcode] = useState("");
  const [deliveryPostcodeSuggestions, setDeliveryPostcodeSuggestions] =
    useState([]);

  const [address, setAddress] = useState({
    company_address: {
      line_1: "",
      line_2: "",
      city: "",
      district: "",
      county: "",
      country: "",
      post_code: "",
    },
    billing_address: {
      line_1: "",
      line_2: "",
      city: "",
      district: "",
      county: "",
      country: "",
      post_code: "",
    },
    delivery_address: {
      line_1: "",
      line_2: "",
      city: "",
      district: "",
      county: "",
      country: "",
      post_code: "",
    },
  });

  const state = useSelector((state) => state);
  const [submitted, setSubmitted] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);
  const history = useHistory();

  const handleAddressInput = (e, type) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [type]: {
        ...prevAddress[type],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = () => {
    setSameAsShipping(!sameAsShipping);
    if (!sameAsShipping) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        billing_address: { ...prevAddress.company_address },
      }));
    } else {
      setAddress((prevAddress) => ({
        ...prevAddress,
        billing_address: {
          line_1: "",
          line_2: "",
          city: "",
          district: "",
          county: "",
          country: "",
          post_code: "",
        },
      }));
    }
  };

  const handleSuggestionClick = async (suggestion, type) => {
    const { address, url, id } = suggestion;
    const getAddressUrl = `https://api.getAddress.io/get/${id}?api-key=${apiKey}`;

    axios.get(getAddressUrl).then((resp) => {
      const addressDetails = resp.data;

      setAddress((prevAddress) => ({
        ...prevAddress,
        [type]: {
          ...prevAddress[type],
          line_1: addressDetails.line_1,
          line_2: addressDetails.line_2,
          city: addressDetails.town_or_city,
          district: addressDetails.county,
          county: addressDetails.county,
          country: addressDetails.country,
          post_code: addressDetails.postcode,
        },
      }));

      // Clear the suggestions for the corresponding address
      if (type === "company_address") {
        setCompanyPostcodeSuggestions([]);
      } else if (type === "billing_address") {
        setBillingPostcodeSuggestions([]);
      } else if (type === "delivery_address") {
        setDeliveryPostcodeSuggestions([]);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // set true
  };

  useEffect(() => {
    let isMounted = true;

    if (submitted && address) {
      api
        .post("api/v1/address", { address })
        .then((resp) => {
          if (isMounted) {
            swal({
              title: "Success",
              text: "Services added successfully",
              icon: "success",
              button: "ok",
            });
            history.push("/billing");
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("API call error:", error);
            swal({
              title: "Error",
              text: error.message,
              icon: "error",
              button: "ok",
            });
          }
        })
        .finally(() => {
          if (isMounted) {
            setSubmitted(false); // Reset submission state
          }
        });
    } else {
      console.log("Errors detected, not making API call");
    }

    return () => {
      isMounted = false;
    };
  }, [submitted, address, history]);

  //TEST

  const callApi = (searchText, type) => {
    const url = `https://api.getAddress.io/autocomplete/${searchText}?api-key=${apiKey}`;

    axios
      .get(url)
      .then((resp) => {
        if (type === "company_address") {
          setCompanyPostcodeSuggestions(resp.data.suggestions);
        } else if (type === "billing_address") {
          setBillingPostcodeSuggestions(resp.data.suggestions);
        } else if (type === "delivery_address") {
          setDeliveryPostcodeSuggestions(resp.data.suggestions);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    let delay;

    if (companyPostcode) {
      delay = setTimeout(() => {
        callApi(companyPostcode, "company_address");
      }, 1000);
    }

    return () => clearTimeout(delay);
  }, [companyPostcode]);

  useEffect(() => {
    let delay;

    if (billingPostcode) {
      delay = setTimeout(() => {
        callApi(billingPostcode, "billing_address");
      }, 1000);
    }

    return () => clearTimeout(delay);
  }, [billingPostcode]);

  useEffect(() => {
    let delay;

    if (deliveryPostcode) {
      delay = setTimeout(() => {
        callApi(deliveryPostcode, "delivery_address");
      }, 1000);
    }

    return () => clearTimeout(delay);
  }, [deliveryPostcode]);

  return (
    <div className="container py-5 d-flex flex-column justify-content-center">
      <ProgressBar currentStep={currentStep} />
      <div className="card mt-2">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-subtitle mb-1 text-center">
                Company Address
              </h5>
              <div className="form-group position-relative">
                <label>Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCompanyPostcode(e.target.value)}
                  required
                />
                {companyPostcodeSuggestions.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100"
                    style={{ zIndex: "99" }}
                  >
                    {companyPostcodeSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={() =>
                          handleSuggestionClick(suggestion, "company_address")
                        }
                      >
                        {suggestion.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {[
                "line_1",
                "line_2",
                "city",
                "district",
                "county",
                "country",
                "post_code",
              ].map((field) => (
                <div className="form-group" key={field}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={address.company_address[field]}
                    onChange={(e) => handleAddressInput(e, "company_address")}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <h5 className="card-subtitle mb-1 text-center">
                Billing Address
              </h5>
              <div className="form-group position-relative">
                <label>Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setBillingPostcode(e.target.value)}
                  required
                />
                {billingPostcodeSuggestions.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100"
                    style={{ zIndex: "99" }}
                  >
                    {billingPostcodeSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={() =>
                          handleSuggestionClick(suggestion, "billing_address")
                        }
                      >
                        {suggestion.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {[
                "line_1",
                "line_2",
                "city",
                "district",
                "county",
                "country",
                "post_code",
              ].map((field) => (
                <div className="form-group" key={field}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={address.billing_address[field]}
                    onChange={(e) => handleAddressInput(e, "billing_address")}
                    disabled={sameAsShipping}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="col-md-6">
              <h5 className="card-subtitle mb-1 text-center">
                Delivery Address
              </h5>
              <div className="form-group position-relative">
                <label>Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setDeliveryPostcode(e.target.value)}
                  required
                />
                {deliveryPostcodeSuggestions.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100"
                    style={{ zIndex: "99" }}
                  >
                    {deliveryPostcodeSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={() =>
                          handleSuggestionClick(suggestion, "delivery_address")
                        }
                      >
                        {suggestion.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {[
                "line_1",
                "line_2",
                "city",
                "district",
                "county",
                "country",
                "post_code",
              ].map((field) => (
                <div className="form-group" key={field}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={address.delivery_address[field]}
                    onChange={(e) => handleAddressInput(e, "delivery_address")}
                    disabled={sameAsShipping}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsShipping"
              checked={sameAsShipping}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="sameAsShipping">
              Company address same as shipping address
            </label>
          </div>
          {/* <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Proceed
                    </button> */}
          <button
            type="submit"
            className="btn btn-danger btn-block"
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;