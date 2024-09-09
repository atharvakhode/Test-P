import React from 'react';

const ProgressBar = ({ currentStep }) => {
    const steps = ['Register', 'Services', 'Address', 'Confirmation'];

    return (
        <div className="container m-2 pb-3">
            <div className="progress" style={{ height: '2px' }}>
                <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${((currentStep-1) / (steps.length-1)) * 100}%` }}
                    aria-valuenow={((currentStep) / (steps.length-1)) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
            <div className="d-flex justify-content-between mt-2">
                {steps.map((step, index) => (
                    <div key={index} className="text-center">
                        <div
                            className={`rounded-circle d-flex align-items-center justify-content-center mb-1 ${index < currentStep ? 'bg-primary' : 'bg-secondary'
                                }`}
                            style={{ width: '30px', height: '30px', margin: '0 auto', color: 'white', fontWeight: "bold"}}
                        >
                            {index + 1}
                        </div>
                        <div className="small">{step}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;