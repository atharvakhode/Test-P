import React from 'react';
import api from "../util/axiosConfig";
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from 'react-redux';
import "./ProfileSection.css"

function ProfileSection() {
  const state = useSelector((state) => state);

  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    businessName: '',
    userEmail: '',
    companyAddress: '',
    billingAddress: ''
  });


  const token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    api.get(`/api/v1/user`, config)
      .then(resp => {
        console.log(resp)
        setUserData({
          name: [
            resp.data.firstName,
            resp.data.lastName
          ].join(" "),
          phone: resp.data.phone,
          altPhone: resp.data.altPhone,
          businessName: resp.data.businessName,
          userEmail: resp.data.userEmail
        });
      }).then(
        api.get(`/api/v1/address`, config)
          .then(
            resp => {
              console.log(resp)
              setUserData({
                companyAddress: [
                  resp.data.company_address?.line_1,
                  resp.data.company_address?.line_2,
                  resp.data.company_address?.city,
                  resp.data.company_address?.district,
                  resp.data.company_address?.county,
                  resp.data.company_address?.country,
                  resp.data.company_address?.post_code
                ]
                  .filter(Boolean)
                  .join(", ") || "",

                billingAddress: [
                  resp.data.billing_address?.line_1,
                  resp.data.billing_address?.line_2,
                  resp.data.billing_address?.city,
                  resp.data.billing_address?.district,
                  resp.data.billing_address?.county,
                  resp.data.billing_address?.country,
                  resp.data.billing_address?.post_code
                ]
                  .filter(Boolean)
                  .join(", ") || ""
              })
            }
          )
      )
      .catch(error => {
        console.log("Error", error);
      })
  }, [state.loggedin.UserEmail])

  // const handleSubmitProfile = {

  // }

  return (
    <div className="d-flex flex-column row card shadow p-4 vh-100 w-100">
      <div id="Profile" className="overflow-auto">
        <h2 className="mb-4">Account Information</h2>
        <hr />
        <form>
          <div className="form-group mb-3">
            <label htmlFor="customerName" className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              value={userData.name}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="businessName" className="form-label">Business Name</label>
            <input
              type="text"
              className="form-control"
              id="businessName"
              value={userData.businessName}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email Id</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={userData.userEmail}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={userData.phone}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="altPhone" className="form-label">Alternate Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="altPhone"
              value={userData.altPhone}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="companyAddress" className="form-label">Company Address</label>
            <textarea
              className="form-control"
              id="companyAddress"
              rows="3"
              value={userData.companyAddress}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="billingAddress" className="form-label">Billing Address</label>
            <textarea
              className="form-control"
              id="billingAddress"
              rows="3"
              value={userData.billingAddress}
              readOnly
            />
          </div>
          {/* <button type="submit" onClick={handleSubmitProfile} className="btn btn-primary btn-block">Update Profile</button> */}
        </form>
      </div>
    </div>


  );
};

export default ProfileSection;
