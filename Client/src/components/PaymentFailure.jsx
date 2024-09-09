import React from 'react'

function PaymentFailure() {
    return (
        <div style={styles.container}>
            <div className="card" style={styles.card}>
                <div className="card-body text-center">
                    <div className="d-flex justify-content-center align-items-center" style={styles.iconContainer}>
                        <div className="checkmark" style={styles.checkmark}>
                        😔
                        </div>
                    </div>
                    <p className="card-title" style={styles.title}>Payment Unsuccessful</p>
                    <p className="card-text" style={styles.text}>
                        Your transaction could not be processed. Please try again later or contact support.
                    </p>
                    <a href="/" className="btn btn-primary" style={styles.button}>
                        Go to Profile
                    </a>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7ff',
    },
    card: {
        maxWidth: '400px',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 1s ease-in-out',
    },
    iconContainer: {
        width: '100px',
        height: '100px',
        backgroundColor: '#f8d7da',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 20px',
        animation: 'bounceIn 1s ease-in-out',
    },
    checkmark: {
        fontSize: '48px',
        color: '#155724',
    },
    title: {
        fontSize: '24px',
        color: '#721c24',
        marginBottom: '15px',
    },
    text: {
        fontSize: '16px',
        color: '#721c24',
        marginBottom: '30px',
    },
    button: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    '@keyframes bounceIn': {
        '0%, 20%, 40%, 60%, 80%, 100%': {
            transform: 'translateY(0)',
        },
        '50%': {
            transform: 'translateY(-20px)',
        },
    },
};

export default PaymentFailure
