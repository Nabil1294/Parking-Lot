import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useStoreContext } from '../utils/GlobalState';
import '../style/Checkout.css';

const PaymentForm = ({ amount, onSuccessfulPayment, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [, dispatch] = useStoreContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet
            return;
        }

        setLoading(true);
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            onSuccessfulPayment();
            dispatch({ type: 'TRIGGER_REFETCH' });
            setLoading(false);
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered custom-modal-width" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">Payment Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
        </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="card-element" className="form-label">Credit or Debit Card</label>
                                <CardElement id="card-element" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>Total Amount: <strong>${amount.toFixed(2)}</strong></label>
                            </div>
                            <button disabled={!stripe || loading} className="btn btn-primary w-100" type="submit">
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
