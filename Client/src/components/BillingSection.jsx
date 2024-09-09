
import api from "../util/axiosConfig";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import "./Billing.css";

const BillingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const state = useSelector((state) => state);
  const [services, setServices] = useState({

  });
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState({

  });

  const token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const billingInfo = {
    description: "test description",
    amount: totalCost * 100,
    currency: "GBP",
    appFee: 500,
    mandateScheme: "bacs"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(billingInfo);
    api
      .post("/api/v1/mandate/billing", billingInfo, config)
      .then((resp) => {
        console.log(resp.data);
        window.location.href = resp.data.authorisationUrl;
        setSubmitted(false);
      });
  };

  const calculateTotalCost = () => {
    const total =
      services.pstnCost * 40 +
      services.adslCost * 33 +
      services.callRecordingCost * 5 +
      services.annexRental * 35 +
      services.faxToEmailCost * 5;
    setTotalCost(total);
  };

  useEffect(() => {
    api
      .get(`/api/v1/services`, config)
      .then((resp) => {
        console.log(resp.data)
        setServices(resp.data.service);
        calculateTotalCost();
      })
      .catch((error) => {
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
          button: 'ok',
        });
      });
  }, [state.loggedin.UserEmail]);

  useEffect(() => {
    calculateTotalCost();
  }, [services]);

  return (
    <div className="card shadow p-4 vh-100 w-100">
      <h2 className="mb-4">Billing Details</h2>
      <hr />
      <div>
      </div>
    </div>

  );
};

export default BillingSection;