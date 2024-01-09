import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../style/Forms.css';

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState }
      });

      AuthService.login(data.login.token);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
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
      <form onSubmit={handleFormSubmit} className="form-box">
      <h2 className="form-title">Login </h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <div className="error-message">Login failed</div>}
    </div>
  );
};


export default Login;
