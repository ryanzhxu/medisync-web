import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Button, TextField } from '@mui/material';
// @ts-ignore
import logo from '../startNow/images/logo.svg';
// @ts-ignore
import dots from '../startNow/images/dots-two.png';
import SERVER_URL from '../../config';
import '../startNow/style/style.css';

const Register = ({ isPhysician }) => {
  // console.log('SERVER_URL: ', SERVER_URL);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(`http://localhost:3000/physicians`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        const { refresh_token, access_token } = data;

        // Store tokens for session management
        localStorage.setItem('access_token', access_token.token);
        localStorage.setItem('refresh_token', refresh_token.token);
        // Redirect to a protected route or update UI to reflect sign-in success
        window.location.href = '/'; // Redirect to dashboard or home page
      } else {
        console.error('Failed to add physician:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding physician:', error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="left-section">
        <div className="left-section-content">
          <img src={logo} className="logo" alt="logo" />
          <div className="header">Better healthcare starts here</div>
          <div className="subtext">
            Securely transfer health data and medical records between physicians and patients.
          </div>
          <div className="dots-container">
            <img src={dots} className="logo" alt="logo" />
          </div>
        </div>
      </div>
      <div className="right-section">
        <div style={{ textAlign: 'left', marginTop: '160px', marginLeft: '10%', marginRight: '12%' }}>
          <h2 style={{ marginBottom: '25px', color: '#111827' }}>Register as a physician</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormControl sx={{ marginBottom: '12px' }}>
                <div className="label">First Name</div>
                <TextField
                  required
                  id="firstname"
                  placeholder="Enter your first name"
                  onChange={handleInputChange}
                  className="text-input"
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    '& fieldset': { border: 'none' },
                    input: { color: '#ABAFB1', fontSize: '11pt' },
                  }}
                  margin="normal"
                />
              </FormControl>

              <FormControl sx={{ marginBottom: '12px' }}>
                <div className="label">Last Name</div>
                <TextField
                  required
                  id="lastname"
                  placeholder="Enter your last name"
                  onChange={handleInputChange}
                  className="text-input"
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    '& fieldset': { border: 'none' },
                    input: { color: '#ABAFB1', fontSize: '11pt' },
                  }}
                  margin="normal"
                />
              </FormControl>

              <FormControl sx={{ marginBottom: '12px' }}>
                <div className="label">Email Address</div>
                <TextField
                  required
                  id="email"
                  placeholder="Enter your work email"
                  autoComplete="off"
                  onChange={handleInputChange}
                  className="text-input"
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    '& fieldset': { border: 'none' },
                    input: { color: '#ABAFB1', fontSize: '11pt' },
                  }}
                  margin="normal"
                />
              </FormControl>

              <FormControl>
                <div className="label">Phone Number</div>
                <TextField
                  required
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={handleInputChange}
                  className="text-input"
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    '& fieldset': { border: 'none' },
                    input: { color: '#ABAFB1', fontSize: '11pt' },
                  }}
                  margin="normal"
                />
              </FormControl>

              <FormControl sx={{ marginBottom: '12px' }}>
                <div className="label">Password</div>
                <TextField
                  required
                  id="password"
                  placeholder="Set your password"
                  onChange={handleInputChange}
                  className="text-input"
                  type="password"
                  autoComplete="off"
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    '& fieldset': { border: 'none' },
                    input: { color: '#ABAFB1', fontSize: '11pt' },
                  }}
                  margin="normal"
                />
              </FormControl>
            </FormGroup>
            <div style={{ textAlign: 'right', marginTop: '25px' }}>
              <Button className="button primary" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  isPhysician: PropTypes.bool.isRequired,
};

export default Register;

