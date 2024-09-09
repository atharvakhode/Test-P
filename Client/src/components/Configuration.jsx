import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import api from "../util/axiosConfig";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar.jsx"

const Configuration = () => {
    const history = useHistory();
    const state = useSelector((state) => state);
    const [numUsers, setNumUsers] = useState(0);
    const [existingNumber, setExistingNumber] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('Basic')
    const [currentStep, setCurrentStep] = useState(2);
    const [additionalServices, setAdditionalServices] = useState({
        userCount: 0,
        pstnCost: 0,
        adslCost: 0,
        callRecordingCost: 0,
        annexRental: 0,
        faxToEmailCost: 0,
        newNumber: existingNumber
    });

    // useEffect(() => {
    //     setAdditionalServices((prev) => ({
    //         ...prev,
    //         userEmail: state.loggedin.UserEmail
    //     }));
    // }, [state.loggedin.userEmail]);

    const handleServiceChange = (service, value) => {
        setAdditionalServices((prev) => ({
            ...prev,
            [service]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setAdditionalServices((prev) => ({
            ...prev,
            userCount: numUsers
        }));
        setSubmitted(true);
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     handleServiceChange();
    // if (numUsers === 0) {
    //     swal({
    //         title: 'Error',
    //         text: 'Number of Users is required and must be greater than 0',
    //         icon: 'error',
    //         button: 'OK',
    //     });
    //     return;
    // }
    // setAdditionalServices((prev) => ({
    //     ...prev,
    //     userCount: numUsers
    // }));
    // if (currentStep < 4) {
    //     setCurrentStep(currentStep + 1);
    // }
    //     setSubmitted(true);
    // };

    //Page skip functionality
    // const handleSkip = () => {
    //     if (numUsers === 0) {
    //         swal({
    //             title: 'Error',
    //             text: 'Number of Users is required and must be greater than 0',
    //             icon: 'error',
    //             button: 'OK',
    //         });
    //         return;
    //     }
    //     setAdditionalServices({
    //         userCount: numUsers,
    //         pstnCost: 0,
    //         adslCost: 0,
    //         callRecordingCost: 0,
    //         annexRental: 0,
    //         faxToEmailCost: 0,
    //         newNumber: existingNumber
    //     });
    //     setSubmitted(true);
    // };

    useEffect(() => {
        if (submitted) {
            console.log('Making API call with user data:', additionalServices);
            api
                .post('api/v1/services', additionalServices)
                .then((resp) => {
                    history.push('/address');
                })
                .catch((error) => {
                    console.error('API call error:', error);
                    swal({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                        button: 'ok',
                    });
                })
                .finally(() => {
                    setSubmitted(false);
                });
        } else {
            console.log('Errors detected, not making API call');
        }
    }, [additionalServices, history]);

    return (
        <div className="container py-5">
            <ProgressBar currentStep={currentStep} />
            <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 border-bottom pb-2 d-flex flex-column flex-md-row justify-content-between">
                            <h4 className="mb-2 mb-md-0">Please fill the following details</h4>
                            <h4 className="mb-2 mb-md-0">
                                Selected plan: <span>{selectedPlan}</span>
                            </h4>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="form-group">
                                    <label htmlFor="userCount" className="form-label">
                                        Number of Users: <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        id="userCount"
                                        className="form-control form-control-sm"
                                        value={numUsers}
                                        onChange={(e) => setNumUsers(parseInt(e.target.value))}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Existing Number:</label>
                                <div className="d-flex flex-column">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="existingYes"
                                            className="form-check-input"
                                            name="existingNumber"
                                            checked={existingNumber}
                                            onChange={() => setExistingNumber(true)}
                                        />
                                        <label className="form-check-label" htmlFor="existingYes">
                                            Keep Existing Number
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="existingNo"
                                            className="form-check-input"
                                            name="existingNumber"
                                            checked={!existingNumber}
                                            onChange={() => setExistingNumber(false)}
                                        />
                                        <label className="form-check-label" htmlFor="existingNo">
                                            Need New Number
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <h4 className="mb-4 border-bottom pb-2">Additional Services</h4>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Service</th>
                <th>Number of Users</th>
                <th>Price per User<span className="text-danger">*</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "PSTN", key: "pstnCost", price: 40 },
                { name: "ADSL 2+ Broadband Rental", key: "adslCost", price: 33 },
                { name: "Call Recording per Extension", key: "callRecordingCost", price: 5 },
                { name: "Annex M Broadband Rental", key: "annexRental", price: 35 },
                { name: "Fax to Email", key: "faxToEmailCost", price: 5 }
              ].map((service) => (
                <tr key={service.key}>
                  <td>{service.name}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-sm w-75"
                      value={additionalServices[service.key]}
                      onChange={(e) => handleServiceChange(service.key, parseInt(e.target.value))}
                    />
                  </td>
                  <td>£{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
                        {/* <span><span className="text-danger">*</span>Prices shown are exclusive of VAT.</span> */}

                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm me-0 me-md-3 w-100 w-md-auto"
                            >
                                Proceed to Address Details
                            </button>
                            {/* <button type="button" onClick={handleSkip} className="btn btn-secondary btn-lg px-5 rounded-pill shadow-sm mx-2">
            Skip Additional Services
          </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Configuration;
