import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { GET_USER_PARKING_SPACES } from '../utils/queries';
import { UPDATE_PARKING_SPACE } from '../utils/mutations';
// import { useStoreContext } from '../utils/GlobalState';
import '../style/Dashboard.css';

const Dashboard = () => {
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState([]);
    const [activeCard, setActiveCard] = useState(null);
    // const [{ shouldRefetch }, dispatch] = useStoreContext();
    const [parkingSpaces, setParkingSpaces] = useState([]);

    const navigate = useNavigate();
    const userId = AuthService.getProfile()?.data?._id;

    const { loading, error, data, refetch } = useQuery(GET_USER_PARKING_SPACES, {
        variables: { userId },
        skip: !userId
    });

    useEffect(() => {
        if (data && data.parkingSpaces) {
            setParkingSpaces(data.parkingSpaces.map(space => ({ ...space, isOccupied: space.isOccupied })));
        }
    }, [data]);

    const toggleCardActive = (index) => {
        if (activeCard === index) {
            setActiveCard(null); // Close the currently open card
        } else {
            setActiveCard(index); // Open the clicked card
        }
    };

    const [updateParkingSpace] = useMutation(UPDATE_PARKING_SPACE);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [index]: { ...prevFormData[index], [name]: value }
        }));
        setFormErrors([]); // Reset form errors when the user starts typing
    };

    const handleParkCar = async (e, spaceId, index) => {
        e.preventDefault();

        // Check if any of the form fields are empty
        if (!formData[index]?.customerName || !formData[index]?.customerContact || !formData[index]?.carMake || !formData[index]?.carModel) {
            setFormErrors(prevErrors => {
                const updatedErrors = [...prevErrors];
                updatedErrors[index] = 'Please fill out all fields.';
                return updatedErrors;
            });
            return;
        }

        try {
            await updateParkingSpace({
                variables: {
                    id: spaceId,
                    customerName: formData[index].customerName,
                    customerContact: formData[index].customerContact,
                    carMake: formData[index].carMake,
                    carModel: formData[index].carModel,
                    parkedAt: new Date().toISOString()
                }
            });

            const updatedSpaces = parkingSpaces.map((space, idx) => {
                if (idx === index) {
                    return { ...space, isOccupied: true };
                }
                return space;
            });
            setParkingSpaces(updatedSpaces);

            refetch();
        } catch (error) {
            console.error('Error parking the car:', error);
        }
    };

    const handleCheckout = (space) => {
        console.log("Selected space for checkout:", space);
        if (!space._id) {
            console.error("Invalid space ID");
            return;
        }
        navigate(`/checkout/${space._id}`, { state: { space } });
    };

    const handleReset = (index) => {
      // Reset formData for the specific parking space
      setFormData(prevFormData => ({
          ...prevFormData,
          [index]: {
              customerName: '',
              customerContact: '',
              carMake: '',
              carModel: ''
          }
      }));
  
      // Update parkingSpaces to set isOccupied to false
      const updatedSpaces = parkingSpaces.map((space, idx) => {
          if (idx === index) {
              return { ...space, isOccupied: false };
          }
          return space;
      });
      setParkingSpaces(updatedSpaces);
      
  };
  

    const formatDate = (dateString) => {
        const date = isNaN(dateString) ? new Date(dateString) : new Date(parseInt(dateString));
        if (isNaN(date)) {
            return 'Not Set';
        }
        return format(date, 'MM/dd/yyyy \'at\' h:mm a');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading parking spaces.</p>;

    return (
        <div className="dashboard-container container-fluid">
            <div className="row justify-content-center">
                {parkingSpaces.map((space, index) => (
                    <div key={space._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card parking-space-card h-100">
                            <img src="../../images/car1.png" className="card-img-top" alt="Parking Space" />
                            <div className="card-body">
                                <h5 className="card-title" onClick={() => toggleCardActive(index)}>{space.name}</h5>
                                {activeCard === index && (
                                    !space.isOccupied ? (
                                        <>
                                            {formErrors[index] && <div className="alert alert-danger" role="alert">{formErrors[index]}</div>}
                                            <form onSubmit={(e) => handleParkCar(e, space._id, index)}>
                                                {/* Form Fields */}
                                                <div className="form-group">
                                                    <input name="customerName" type="text" className="form-control" placeholder="Customer Name" value={formData[index]?.customerName || ''} onChange={(e) => handleInputChange(e, index)} />
                                                </div>
                                                <div className="form-group">
                                                    <input name="customerContact" type="text" className="form-control" placeholder="Customer Contact" value={formData[index]?.customerContact || ''} onChange={(e) => handleInputChange(e, index)} />
                                                </div>
                                                <div className="form-group">
                                                    <input name="carMake" type="text" className="form-control" placeholder="Vehicle Make" value={formData[index]?.carMake || ''} onChange={(e) => handleInputChange(e, index)} />
                                                </div>
                                                <div className="form-group">
                                                    <input name="carModel" type="text" className="form-control" placeholder="Vehicle Model" value={formData[index]?.carModel || ''} onChange={(e) => handleInputChange(e, index)} />
                                                </div>
                                                <button type="submit" className="btn btn-primary w-100">Park Vehicle</button>
                                            </form>
                                        </>
                                    ) : (
                                        <div>
                                            <p className="card-text">Customer: {space.customerName}</p>
                                            <p className="card-text">Contact: {space.customerContact}</p>
                                            <p className="card-text">Vehicle: {space.carMake} {space.carModel}</p>
                                            <p className="card-text">Parked At: {formatDate(space.parkedAt)}</p>
                                            <div>
                                        {/* Occupied parking space details */}
                                        <button onClick={() => handleCheckout(space)} className="btn btn-danger w-100">Checkout</button>
                                        <button onClick={() => handleReset(index)} className="btn btn-secondary w-100 mt-2">Reset Form</button>
                                    </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;









