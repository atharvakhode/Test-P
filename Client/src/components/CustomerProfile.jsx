import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import MyOrders from './MyOrders';
import BillingSection from './BillingSection';

function CustomerProfile() {
  const [activeComponent, setActiveComponent] = useState('ProfileSection');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProfileSection':
        return <ProfileSection />;
      case 'MyOrders':
        return <MyOrders />;
      case 'BillingSection':
        return <BillingSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-12 border-end d-flex flex-column justify-content-start align-items-start px-3 py-4">
          {/* <h4 className="mt-3 mb-4 d-none d-md-block">Account Information</h4> */}
          <div className="nav flex-column nav-pills w-100">
            <button
              className={`nav-link text-start ${activeComponent === 'ProfileSection' ? 'active' : ''}`}
              onClick={() => setActiveComponent('ProfileSection')}
            >
              <i className="fw-bold me-2"></i>
              Account Details
              <small className="d-block text-black d-none d-md-block">Manage your account details</small>
            </button>

            <button
              className={`nav-link text-start ${activeComponent === 'MyOrders' ? 'active' : ''}`}
              onClick={() => setActiveComponent('MyOrders')}
            >
              <i className="me-2"></i>
              Handset Order History
              <small className="d-block text-black d-none d-md-block">Track your past purchases</small>
            </button>

            <button
              className={`nav-link text-start ${activeComponent === 'BillingSection' ? 'active' : ''}`}
              onClick={() => setActiveComponent('BillingSection')}
            >
              <i className="me-2"></i>
              Billing Details
              <small className="d-block text-black d-none d-md-block">Manage your bills</small>
            </button>
          </div>
        </div>
        <div className="col-md-10 col-12">
          {renderComponent()}
        </div>
      </div>
    </div>


  );
}

export default CustomerProfile;