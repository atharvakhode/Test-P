import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import api from "../util/axiosConfig.js";
import ProgressBar from "./ProgressBar.jsx";
import axios from "axios";

const Address = () => {
  const apiKey = "CvmjTpTwWUedB8nNMCKxXQ43497";
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [address, setAddress] = useState({
    company_address: { post_code: "" },
    billing_address: { post_code: "" },
    delivery_address: { post_code: "" }
  });
  const [suggestions, setSuggestions] = useState({
    company_address: [],
    billing_address: [],
    delivery_address: []
  });
  const [expanded, setExpanded] = useState({
    company_address: false,
    billing_address: false,
    delivery_address: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);
  const [isBillingCopied, setIsBillingCopied] = useState(false);
  const [isDeliveryCopied, setIsDeliveryCopied] = useState(false);
  const history = useHistory();

  const handlePostcodeChange = (e, type) => {
    const { value } = e.target;
    setAddress(prev => ({
      ...prev,
      [type]: { ...prev[type], post_code: value }
    }));
    if (value.length > 2) {
      callApi(value, type);
    } else {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
    }
  };

  const handleSuggestionClick = async (suggestion, type) => {
    const { id } = suggestion;
    const getAddressUrl = `https://api.getAddress.io/get/${id}?api-key=${apiKey}`;

    try {
      const resp = await axios.get(getAddressUrl);
      const addressDetails = resp.data;
      setAddress(prev => ({
        ...prev,
        [type]: {
          line_1: addressDetails.line_1,
          line_2: addressDetails.line_2 || "",
          city: addressDetails.town_or_city,
          district: addressDetails.county,
          county: addressDetails.county,
          country: addressDetails.country,
          post_code: addressDetails.postcode,
        }
      }));
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      setExpanded(prev => ({ ...prev, [type]: true }));
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const callApi = (searchText, type) => {
    const url = `https://api.getAddress.io/autocomplete/${searchText}?api-key=${apiKey}`;

    axios.get(url)
      .then(resp => {
        setSuggestions(prev => ({ ...prev, [type]: resp.data.suggestions }));
      })
      .catch(error => console.error("Error:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && address) {
      api.post("api/v1/address", { address })
        .then(() => {
          swal({
            title: "Success",
            text: "Address added successfully",
            icon: "success",
            button: "OK",
          });
          history.push("/billing");
        })
        .catch(error => {
          console.error("API call error:", error);
          swal({
            title: "Error",
            text: error.message,
            icon: "error",
            button: "OK",
          });
        })
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [submitted, address, history]);

  const copyOrClearCompanyAddress = (type, isCopied) => {
    if (isCopied) {
      setAddress(prev => ({
        ...prev,
        [type]: { ...prev.company_address }
      }));
    } else {
      setAddress(prev => ({
        ...prev,
        [type]: { post_code: "", line_1: "", line_2: "", city: "", district: "", county: "", country: "" }
      }));
    }
  };

  const renderAddressSection = (type, title, isCopyable = false, isCopied = false, setIsCopied = () => { }) => (
    <div className="card mb-3" style={{ borderRadius: '1rem' }}>
      <div className="card-header text-white" style={{ backgroundColor: '#3e97f7', borderRadius: '1rem' }} onClick={() => setExpanded(prev => ({ ...prev, [type]: !prev[type] }))}>
        <h5 className="mb-0 d-flex justify-content-between align-items-center">
          {title}
          <span>{expanded[type] ? '▲' : '▼'}</span>
        </h5>
      </div>
      <div className={`card-body ${expanded[type] ? 'show' : 'collapse'}`}>
        {isCopyable && (
          <div className="form-check form-check-inline" style={{paddingBottom: "1rem"}}>
            <input
              className="form-check-input"
              style={{width:"1rem"}}
              type="checkbox"
              name={`copy-${type}`}
              id={`copy-${type}`}
              checked={isCopied}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsCopied(checked);
                copyOrClearCompanyAddress(type, checked);
              }}
            />
            <label className="form-check-label" htmlFor={`copy-${type}`}>
              Same as Company Address
            </label>
          </div>
        )}
        <div className="form-group position-relative">
          <label>Postcode<span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            value={address[type].post_code}
            onChange={(e) => handlePostcodeChange(e, type)}
            required
          />
          {suggestions[type].length > 0 && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 99 }}>
              {suggestions[type].map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  style={{ backgroundColor: '#e6e8eb' }}
                  onClick={() => handleSuggestionClick(suggestion, type)}
                >
                  {suggestion.address}
                </li>
              ))}
            </ul>
          )}
        </div>
        {expanded[type] && (
          <>
            {['line_1', 'line_2', 'city', 'district', 'county', 'country'].map(field => (
              <div className="form-group" key={field}>
                <label>
                  {field === 'line_1' ? 'Address Line 1' :
                    field === 'line_2' ? 'Address Line 2' :
                      field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1)}
                  {field !== 'line_2' && <span className="text-danger">*</span>}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address[type][field] || ''}
                  onChange={(e) => setAddress(prev => ({
                    ...prev,
                    [type]: { ...prev[type], [field]: e.target.value }
                  }))}
                  required={field !== 'line_2'}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <ProgressBar currentStep={currentStep} />
      <div className="card shadow">
        <div className="card-body">
          <div className="mb-4 border-bottom pb-2 d-flex justify-content-between">
            <h4>Please fill the address details below</h4>
            <h4>Selected plan: <span className="">{selectedPlan}</span></h4>
          </div>
          <form onSubmit={handleSubmit}>
            {renderAddressSection('company_address', 'Company Address')}
            {renderAddressSection('billing_address', 'Billing Address', true, isBillingCopied, setIsBillingCopied)}
            {renderAddressSection('delivery_address', 'Delivery Address', true, isDeliveryCopied, setIsDeliveryCopied)}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm me-0 me-md-3 w-100 w-md-auto"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
