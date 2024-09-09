import React, { useState, useEffect } from 'react';
import api from "../util/axiosConfig";
import { Button } from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import './MyOrders.css'

function MyOrders() {

    const [orders, setOrders] = useState([])
    const [details, setDetails] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const token = localStorage.getItem("access_token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {

        api.get(`/api/v1/order`, config).then(resp => {
            console.log(resp.data);
            setOrders(resp.data.orders)
            // if (resp.data && resp.data.data && resp.data.data.details) {
            //     setDetails(resp.data.data.details);
            // } else {
            //     console.error('Details not found in response:', resp);
            //     setDetails(null);
            // }
        }).catch(error => {
            console.error('Error fetching order details:', error);
        });
    }, [])


    // const handleShowDetails = (order) => {
    //     setSelectedOrder(order);
    //     setModalOpen(true);
    // };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };
    // const handleShowReceipt = (order) => {
    //     window.open(order.receipt, '_blank');
    // };

    return (
        <div className="card shadow p-4 vh-100 w-100">
            <h2 className="mb-4">Order History</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                            <th>Payment Status</th>
                            <th>Receipt</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{order.createdAt.split("T")[0]}</td>
                                <td>{order.totalAmount.toFixed(2)}</td>
                                <td>{order.paymentStatus}</td>
                                <td>
                                    {/* <Button color="primary" onClick={() => handleShowReceipt(order)}>
                                Show Receipt
                            </Button> */}
                                    {order.receipt ? <a href={order.receipt} target='_blank' rel='noopener noreferrer'>Show Receipt</a> : "No receipt available yet..."}
                                </td>
                                {/* <td>
                            <Button color="primary" onClick={() => handleShowDetails(order)}>
                                Show Order Details
                            </Button>
                        </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
            {selectedOrder && (
                <div>
                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                    <p><strong>Order Date:</strong> {selectedOrder.createdAt.split("T")[0]}</p>
                    <p><strong>Amount:</strong> {selectedOrder.totalAmount.toFixed(2)}</p>
                    <p><strong>Details:</strong> {selectedOrder.order}</p>
                </div>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog> */}
        </div>

    )
}
export default MyOrders;