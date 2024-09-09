import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import api from "../util/axiosConfig";
import './ViewCart.css'; // Import the new CSS file
import './RegCustomer.css';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ViewCart() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const [payment, setPayment] = useState({
    amount: state.cart.reduce((a, b) => a + parseInt(b.retail_price) * parseInt(b.qty), 0)
  });

  const [userData, setUserData] = useState({
    companyAddress: '',
    billingAddress: '',
    deliveryAddress: ''
  });




  const [selectedAddress, setSelectedAddress] = useState('company');

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);

  };

  // const handleSubmitAddress = (event) => {
  //   event.preventDefault();
  //   handleClose(); 
  // };

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

                deliveryAddress: [
                  resp.data.delivery_address?.line_1,
                  resp.data.delivery_address?.line_2,
                  resp.data.delivery_address?.city,
                  resp.data.delivery_address?.district,
                  resp.data.delivery_address?.county,
                  resp.data.delivery_address?.country,
                  resp.data.delivery_address?.post_code
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


  const deleteItem = (item) => {
    swal({
      title: "Delete item",
      text: "Are you sure to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch({ type: "RemoveItem", payload: item });
        let amount = state.cart.reduce(
          (a, b) => a + parseInt(b.retail_price) * parseInt(b.qty),
          0
        );
        setPayment({ ...payment, amount });
        swal("Item has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Item is not deleted!");
      }
    });
  };

  useEffect(() => {
    let amount = state.cart.reduce((a, b) => a + parseInt(b.retail_price) * parseInt(b.qty), 0);
    setPayment({ amount });
  }, [state.cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = state.cart.reduce((a, b) => a + parseInt(b.retail_price) * parseInt(b.qty), 0);
    setPayment({ amount });
    const chosenAddress = selectedAddress === 'company'
      ? userData.companyAddress
      : selectedAddress === 'billing'
        ? userData.billingAddress
        : selectedAddress === 'delivery'
          ? userData.deliveryAddress
          : newAddress; // Use newAddress if 'new' is selected

    console.log('Selected delivery address:', chosenAddress);

    let data = {
      cart: state.cart,
      address: chosenAddress
    };

    // Get JWT token from localStorage
    const token = localStorage.getItem("access_token");

    // Axios POST request configuration
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Adding JWT token to Authorization header
        "Content-Type": "application/json",
      },
    };

    console.log(data);
    console.log(state.cart)
    // Make POST request with Axios
    api
      .post("api/v1/order", data, config)
      .then((resp) => {
        window.location.href = resp.data.sessionUrl;
        console.log("redirected");
        // Redirect to the payment page
      })
      .catch((error) => {
        // Handle error
        console.error("Error placing order:", error);
        // Optionally show an error message to the user
        swal({
          title: "Error",
          text: "Failed to place order. Please try again later.",
          icon: "error",
          button: "Ok",
        });
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="container-fluid bg-light py-5">
      <div className="card shadow-lg border-0 rounded-lg ">
        <div className="card-header text-black">
          <h3 className="mb-0 text-center">Your Shopping Cart</h3>
        </div>
        <div className="card-body">
          {state.cart.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Product Id</th>
                      <th>Product Photo</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.cart.map((item) => (
                      <tr key={item.item}>
                        <td>{item.item}</td>
                        <td>
                          <img
                            className="img-fluid product-image"
                            src={item.image_url || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                            alt="product"
                          />
                        </td>
                        <td>{item.item}</td>
                        <td>&pound; {parseInt(item.retail_price)}</td>
                        <td>{item.qty}</td>
                        <td>&pound; {item.qty * parseInt(item.retail_price)}</td>
                        <td>
                          <button
                            onClick={() => deleteItem(item)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light">
                      <td colSpan="5" className="text-end"><strong>Total Amount</strong></td>
                      <td colSpan="2">
                        <strong>&pound; {state.cart.reduce((a, b) => a + parseInt(b.retail_price) * parseInt(b.qty), 0)}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <span>
                  <span className="text-danger">*</span>The total payable amount will include a 20% VAT.
                </span>
              </div>
              <div className="text-center mt-4">
                <button onClick={handleOpen} className="btn btn-primary btn-lg">
                  Enter Address and Place Order
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">Your Cart is Empty</h4>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={modalStyle}
          className="bg-white p-4 rounded-lg shadow-lg"
          style={{
            width: '100%',
            maxWidth: '500px',
            margin: '20px auto', // Center the modal on small screens
            overflowY: 'auto', // Add scroll for overflow content
            maxHeight: '90vh', // Ensure modal doesn't go beyond screen height
          }}
        >
          <h3 className="text-center mb-4 font-weight-bold">Choose Address for Delivery</h3>
          <form onSubmit={handleSubmit}>
            {['company', 'billing', 'delivery'].map((type) => (
              <div key={type} className="mb-4">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id={`${type}Address`}
                    name="deliveryAddress"
                    className="custom-control-input"
                    checked={selectedAddress === type}
                    onChange={handleAddressChange}
                    value={type}
                  />
                  <label className="custom-control-label font-weight-bold" htmlFor={`${type}Address`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} Address
                  </label>
                </div>
                <div className="mt-2 p-3 bg-light rounded shadow-sm">
                  <small>{userData[`${type}Address`]}</small>
                </div>
              </div>
            ))}

            {/* New Address Option */}
            <div className="mb-4">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="newAddress"
                  name="deliveryAddress"
                  className="custom-control-input"
                  checked={selectedAddress === 'new'}
                  onChange={handleAddressChange}
                  value="new"
                />
                <label className="custom-control-label font-weight-bold" htmlFor="newAddress">
                  Use a different address
                </label>
              </div>
              {selectedAddress === 'new' && (
                <textarea
                  className="form-control mt-2"
                  rows="3"
                  placeholder="Enter your new delivery address here"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              )}
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary btn-block py-2">
                Proceed to Checkout
              </button>
            </div>
          </form>
        </Box>
      </Modal>

    </div>
  );
}

export default ViewCart;
