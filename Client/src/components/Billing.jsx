import api from "../util/axiosConfig";
import React, { Fragment, useEffect, useState } from "react";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import "./Billing.css";
import ProgressBar from "./ProgressBar.jsx";
import axios from "axios";

const Billing = () => {
  const [submitted, setSubmitted] = useState(false);
  const state = useSelector((state) => state);
  const [services, setServices] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState({});
  const [currentStep, setCurrentStep] = useState(4);
  const [selectedPlan, setSelectedPlan] = useState({});

  const activationCharge = 25;
  const [totalActivationCharge, setTotalActivationCharge] =
    useState(activationCharge);
  const [monthlyCost, setMonthlyCost] = useState(0);
  // Coupon
  // const [coupons, setCoupons] = useState([]);
  // const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // useEffect(() => {
  //   console.log("Updated coupons state:", coupons);
  // }, [coupons]);

  // Recalculate total cost when services, selectedPlan, or selectedCoupon changes
  useEffect(() => {
    calculateTotalCost();
  }, [services, selectedCoupon, selectedPlan]);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    api
      .get(`/api/v1/coupon/${couponCode}`, config)
      .then((resp) => {
        if (resp.data) {
          setSelectedCoupon(resp.data);
          // swal({
          //   title: "Success",
          //   text: "Coupon applied successfully!",
          //   icon: "success",
          //   button: "Ok",
          // });
        } else {
          swal({
            title: "Error",
            text: "Invalid coupon code",
            icon: "error",
            button: "Ok",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching coupon:", error);
        swal({
          title: "Error",
          text: "Failed to apply coupon",
          icon: "error",
          button: "Ok",
        });
      });
  };

  const token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };


  const calculateTotalCost = () => {
    console.log('Calculating total cost...');
    console.log('Services:', services);
    console.log('Selected Plan:', selectedPlan);
    console.log('Selected Coupon:', selectedCoupon);

    let monthlyServices = 0; // Placeholder, calculate based on services if needed

    let planCost = services.userCount && selectedPlan.cost
      ? (selectedPlan.cost * services.userCount)
      : 0;
    planCost = Number(planCost.toFixed(2));

    let temp = services.userCount
      ? (activationCharge * services.userCount)
      : 0;
    temp = Number(temp.toFixed(2));

    console.log('Initial calculations:', { planCost, temp });

    // Apply coupon discount if any
    if (selectedCoupon) {
      if (selectedCoupon.activationDiscount) {
        temp = Number((temp - (temp * selectedCoupon.activationDiscount) / 100).toFixed(2));
      }
      if (selectedCoupon.monthlyDiscount) {
        planCost = Number((planCost - (planCost * selectedCoupon.monthlyDiscount) / 100).toFixed(2));
      }
    }

    console.log('After coupon application:', { planCost, temp });

    let total = ((monthlyServices + planCost + temp) * 1.2).toFixed(2);
    total = Number(total);

    console.log('Final calculations:', { monthlyServices, planCost, temp, total });

    // Set state with calculated values
    setMonthlyCost(planCost);
    setTotalActivationCharge(temp);
    setTotalCost(total);
  };

  // const fetchPackage = () => {
  //   const packageName = localStorage.getItem("packageName");
  //   axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/products/get-package?packageName=${packageName}`)
  //   .then((resp) => {
  //     console.log(resp.data)
  //     setSelectedPlan({
  //       name: resp.data.packageName,
  //       cost: (resp.data.cost).toFixed(2)
  //     })
  //   })
  //   .catch((error) => {
  //     swal({
  //       title: "Error",
  //       text:  `Error fetching package details: ${+ error.message}`,
  //       icon: "error",
  //       button: "ok",
  //     });
  //   })
  // }

  const fetchPackage = () => {
    const packageName = localStorage.getItem("packageName") || "basic"; // Default value if packageName is null

    if (!packageName) {
      swal({
        title: "Error",
        text: "Please select the package first",
        icon: "error",
        button: "ok",
      });
      return;
    }

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/products/get-package?packageName=${packageName}`)
      .then((resp) => {
        setSelectedPlan({
          name: resp.data.packageName,
          cost: resp.data.cost.toFixed(2), // Ensure cost is always a number
        });
        console.log(resp.data); // Logging response data
      })
      .catch((error) => {
        swal({
          title: "Error",
          text: `Error fetching package details: ${error.message}`, // Correctly formatted error message
          icon: "error",
          button: "ok",
        });
      });
  };

  const fetchAddress = () => {
    api
      .get("/api/v1/address", config)
      .then((resp) => {
        console.log(resp.data);
        setAddress(resp.data);
        fetchPackage();
        // fetchCoupons();
      })
      .catch((error) => {
        swal({
          title: "Error",
          text: `Error fetching address: ${+ error.message}`,
          icon: "error",
          button: "ok",
        });
      });
  };

  useEffect(() => {
    api
      .get("/api/v1/services", config)
      .then((resp) => {
        console.log(resp.data);
        setServices(resp.data.service);
        fetchAddress();
      })
      .catch((error) => {
        swal({
          title: "Error",
          text: `Error fetching services: ${+ error.message}`,
          icon: "error",
          button: "ok",
        });
      });
  }, [state.loggedin.UserEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const billingInfo = {
      description: "test description",
      amount: totalCost * 100,
      monthlyCost: monthlyCost * 100,
      currency: "GBP",
      appFee: 500,
      mandateScheme: "bacs",
    };

    api.post("/api/v1/mandate/billing", billingInfo, config).then((resp) => {
      console.log(resp.data);
      window.location.href = resp.data.authorisationUrl;
      setSubmitted(false);
    });
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="container py-5 d-flex flex-column">
      <ProgressBar currentStep={currentStep} />
      <div className="card shadow">
        {/* <div className="card-header bg-primary text-white py-3">
          <h3 className="mb-0">Subscription Confirmation</h3>
        </div> */}
        <div className="card-body">
          <div className="row">
            <div className="col-lg-8">
              <h4 className="mb-4 border-bottom pb-2">Service Details</h4>
              <div className="table-responsive mb-4">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Service</th>
                      <th>Number of users</th>
                      <th>Price per user</th>
                      <th>
                        Total<span className="text-danger">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-primary">
                      <td>
                        <strong>{selectedPlan.name} Plan</strong>
                      </td>
                      <td>{services.userCount}</td>
                      <td>£{selectedPlan.cost}</td>
                      <td>
                        <strong>
                          £{(selectedPlan.cost * services.userCount).toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>PSTN Users</td>
                      <td>{services.pstnCost}</td>
                      <td>£40</td>
                      <td>£{services.pstnCost * 40}</td>
                    </tr>
                    <tr>
                      <td>ADSL 2+ Broadband Rental</td>
                      <td>{services.adslCost}</td>
                      <td>£33</td>
                      <td>£{services.adslCost * 33}</td>
                    </tr>
                    <tr>
                      <td>Call Recording Extensions</td>
                      <td>{services.callRecordingCost}</td>
                      <td>£5</td>
                      <td>£{services.callRecordingCost * 5}</td>
                    </tr>
                    <tr>
                      <td>Annex M Broadband Rental</td>
                      <td>{services.annexRental}</td>
                      <td>£35</td>
                      <td>£{services.annexRental * 35}</td>
                    </tr>
                    <tr>
                      <td>Fax to Email</td>
                      <td>{services.faxToEmailCost}</td>
                      <td>£5</td>
                      <td>£{services.faxToEmailCost * 5}</td>
                    </tr> */}
                    <tr className="table-info">
                      <td>
                        <strong>Activation Charge</strong>
                      </td>
                      <td>{services.userCount}</td>
                      <td>£{activationCharge}/user</td>
                      <td>
                        <strong>
                          £{activationCharge * services.userCount}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="discount mt-4">
                  <form onSubmit={handleCouponSubmit}>
                    <div className="input-group mb-3">
                      <div className="mr-2">
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginBottom: "0px" }}
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                      </div>

                      <button className="btn btn-primary" type="submit" style={{ marginTop: "0px" }}>
                        Apply Coupon
                      </button>
                    </div>
                  </form>
                  {selectedCoupon && (
                    <div className="alert alert-success">
                      <strong>Applied Coupon:</strong> {selectedCoupon.name} -{" "}
                      {selectedCoupon.description}
                    </div>
                  )}
                </div>
                <span>
                  <span className="text-danger">*</span>The total payable amount
                  will include a 20% VAT.
                </span>
              </div>
            </div>

            <div className="col-lg-4">
              <h4 className="mb-4 border-bottom pb-2">Address Information</h4>
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <h6 className="mb-0">Company Address</h6>
                </div>
                <div className="card-body">
                  <address className="mb-0">
                    {address.company_address && (
                      <Fragment>
                        {[
                          address.company_address.line_1,
                          address.company_address.line_2,
                          address.company_address.city,
                          address.company_address.district,
                          address.company_address.county,
                          address.company_address.post_code,
                          address.company_address.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </Fragment>
                    )}
                  </address>
                </div>
              </div>
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h6 className="mb-0">Billing Address</h6>
                </div>
                <div className="card-body">
                  <address className="mb-0">
                    {address.billing_address && (
                      <Fragment>
                        {[
                          address.billing_address.line_1,
                          address.billing_address.line_2,
                          address.billing_address.city,
                          address.billing_address.district,
                          address.billing_address.county,
                          address.billing_address.post_code,
                          address.billing_address.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </Fragment>
                    )}
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="card bg-light border-0 shadow-sm">
                <div className="card-body">
                  {/* <h4 className="card-title mb-4 text-primary">Cost Summary</h4> */}
                  <div className="row g-4 d-flex justify-content-center">
                    <div className="col-md-3">
                      <div className="p-3 bg-white rounded shadow-sm">
                        <h6 className="text-muted mb-2">Monthly Cost</h6>
                        <p className="h3 mb-0 text-primary">£{monthlyCost}</p>
                      </div>
                    </div>
                    {/* <div className="col-md-3">
                      <div className="p-3 bg-white rounded shadow-sm">
                        <h6 className="text-muted mb-2">Plan Cost</h6>
                        <p className="h3 mb-0 text-primary">£{selectedPlan.price * services.userCount}</p>
                      </div>
                    </div> */}
                    <div className="col-md-3">
                      <div className="p-3 bg-white rounded shadow-sm">
                        <h6 className="text-muted mb-2">Activation Charge</h6>
                        <p className="h3 mb-0 text-primary">
                          £{totalActivationCharge}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3 bg-primary text-white rounded shadow">
                        <h6 className="mb-2">Total Amount</h6>
                        <p className="h2 mb-0 font-weight-bold">£{totalCost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer bg-light text-center py-4">
          <button
            className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm"
            onClick={handleSubmit}
          >
            <i className="bi bi-credit-card me-2"></i>Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;