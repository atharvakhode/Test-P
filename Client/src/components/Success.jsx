import React, { useEffect, useState } from "react";
import axios from "axios";

const Success = () => {
    const [status, setStatus] = useState("Checking payment status...");

    useEffect(() => {
        // You can poll the server for the payment status
        axios.get("/api/orders/payment-status")
            .then(response => {
                setStatus(response.data.status);
            })
            .catch(error => {
                setStatus("Error fetching payment status");
            });
    }, []);

    return (
        <div>
            <h1>Payment Status</h1>
            <p>{status}</p>
        </div>
    );
};

export default Success;
