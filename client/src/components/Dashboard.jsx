import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { GET_USER_PARKING_SPACES } from '../utils/queries';
import { UPDATE_PARKING_SPACE } from '../utils/mutations';
import '../style/Dashboard.css';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerContact: '',
        carMake: '',
        carModel: ''
    });
    const [formError, setFormError] = useState('');

    const navigate = useNavigate();
    const userId = AuthService.getProfile()?.data?._id;

    const { loading, error, data, refetch } = useQuery(GET_USER_PARKING_SPACES, {
        variables: { userId },
        skip: !userId
    });

    const [updateParkingSpace] = useMutation(UPDATE_PARKING_SPACE);

    useEffect(() => {
        if (userId) {
            refetch().then(response => {
                console.log("Parking spaces data:", response.data);
            });
        }
    }, [userId, refetch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError(''); // Reset form error when user starts typing
    };

    const handleParkCar = async (e, spaceId) => {
        e.preventDefault();

        if (!formData.customerName || !formData.customerContact || !formData.carMake || !formData.carModel) {
            setFormError('Please fill out all fields.');
            return;
        }

        try {
            await updateParkingSpace({
                variables: {
                    id: spaceId,
                    customerName: formData.customerName,
                    customerContact: formData.customerContact,
                    carMake: formData.carMake,
                    carModel: formData.carModel,
                    parkedAt: new Date().toISOString()
                }
            });

            setFormData({ customerName: '', customerContact: '', carMake: '', carModel: '' });
            refetch();
        } catch (error) {
            console.error('Error parking the car:', error);
        }
    };

    const handleCheckout = (spaceId) => {
        const checkoutTime = new Date().toISOString();
        navigate(`/checkout/${spaceId}`, { state: { checkoutTime } });
    };

    const formatDate = (dateString) => {
        const date = isNaN(dateString) ? new Date(dateString) : new Date(parseInt(dateString));
        if (isNaN(date)) {
            return 'Not Set';
        }
        return format(date, 'MM/dd/yyyy \'at\' h:mm a');
    };

    const displayError = (message) => {
        return (
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        );
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading parking spaces.</p>;

    return (
        <div className="dashboard-container">
            {data?.parkingSpaces.map(space => (
                <div key={space._id} className="parking-space-card">
                    <img src="../../images/car.jpg" alt="Parking Space" />
                    <div>
                        <p>{space.name}</p>
                        {!space.isOccupied ? (
                            <>
                                {formError && displayError(formError)}
                                <form onSubmit={(e) => handleParkCar(e, space._id)}>
                                    <input name="customerName" type="text" placeholder="Customer Name" value={formData.customerName} onChange={handleInputChange} />
                                    <input name="customerContact" type="text" placeholder="Customer Contact" value={formData.customerContact} onChange={handleInputChange} />
                                    <input name="carMake" type="text" placeholder="Vehicle Make" value={formData.carMake} onChange={handleInputChange} />
                                    <input name="carModel" type="text" placeholder="Vehicle Model" value={formData.carModel} onChange={handleInputChange} />
                                    <button type="submit">Park Vehicle</button>
                                </form>
                            </>
                        ) : (
                            <div>
                                <p>Customer: {space.customerName}</p>
                                <p>Contact: {space.customerContact}</p>
                                <p>Vehicle: {space.carMake} {space.carModel}</p>
                                <p>Parked At: {formatDate(space.parkedAt)}</p>
                                <button onClick={() => handleCheckout(space._id)}>Checkout</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;




