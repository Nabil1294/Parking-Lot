import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, isValid } from 'date-fns';
import '../style/Checkout.css';


const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { space } = location.state;

    const initialLeftAt = space.leftAt ? new Date(parseInt(space.leftAt, 10)) : new Date();
    const [leftAt] = useState(initialLeftAt);
    const [hourlyRate, setHourlyRate] = useState(space.hourlyRate || 10);
    const [taxRate, setTaxRate] = useState(7);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const parkedAtTime = new Date(parseInt(space.parkedAt, 10));
        const leftAtTime = leftAt;

        const differenceInMilliseconds = leftAtTime - parkedAtTime;
        const hoursParked = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60));

        const subtotal = hourlyRate * hoursParked;
        const taxAmount = subtotal * (taxRate / 100);
        setTotal(subtotal + taxAmount);
    }, [leftAt, space.parkedAt, hourlyRate, taxRate]);

    const formatDate = (dateInput) => {
        if (!dateInput) {
            return 'Not Set';
        }

        let date = typeof dateInput === 'string' ? new Date(parseInt(dateInput, 10)) : dateInput;
        if (!isValid(date)) {
            return 'Invalid Date';
        }

        return format(date, 'MM/dd/yyyy \'at\' h:mm a');
    };

    const handleRateChange = (e) => {
        setHourlyRate(parseFloat(e.target.value));
    };

    const handleTaxChange = (e) => {
        setTaxRate(parseFloat(e.target.value));
    };

    const handleReturnToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="d-flex justify-content-center align-items-center checkout-page">
        <div className="card shadow checkout-card">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Checkout</h2>
                <p className="text-muted text-center">Parking Lot Manager</p>
                <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">Parking Spot: <strong>{space.name}</strong></li>
                <li className="list-group-item">Customer: <strong>{space.customerName}</strong></li>
                <li className="list-group-item">Contact: <strong>{space.customerContact}</strong></li>
                <li className="list-group-item">Vehicle: <strong>{space.carMake} {space.carModel}</strong></li>
                <li className="list-group-item">Parked At: <strong>{formatDate(space.parkedAt)}</strong></li>
                <li className="list-group-item">Left At: <strong>{formatDate(leftAt)}</strong></li>
              </ul>
              <div className="mb-3">
                <label htmlFor="hourlyRate" className="form-label">Hourly Rate</label>
                <input type="number" id="hourlyRate" className="form-control" value={hourlyRate} onChange={handleRateChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="taxRate" className="form-label">Tax Rate (%)</label>
                <input type="number" id="taxRate" className="form-control" value={taxRate} onChange={handleTaxChange} />
              </div>
              <h4 className="text-dark text-center mb-4">Total Amount Due: <span className="text-body">${total.toFixed(2)}</span></h4>
              <div className="text-center">
                <button onClick={handleReturnToDashboard} className="btn btn-primary">Return to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Checkout;




