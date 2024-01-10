import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../style/Forms.css';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [addUser, { error, loading }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      AuthService.login(data.addUser.token);
      navigate('/dashboard');
    } catch (e) {
      console.error('Signup Error:', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="form-container">
      {error && <div className="error-message">Signup failed</div>}
      <form onSubmit={handleFormSubmit} className="form-box">
        <h2 className="form-title">Signup</h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          className="form-control"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

