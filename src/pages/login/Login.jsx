import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography, Link } from '@mui/material';

import { loginUserAsync } from "../../redux/authSlice";
import Home from "../home/Home";
//import Register from "../register/Registration";

export default function Login(props) {
  const { setSnackbarProps } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
  };

  const handleRegisterClick = () => {
    navigate("/Register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUserAsync(formValues))
      .unwrap()
      .then(() => {
        setSnackbarProps({
          open: true,
          msg: "Logged In Successfully",
          severity: "success",
        });
        navigate('/home');
      })
      .catch(() => {
        setSnackbarProps({
          open: true,
          msg: "Invalid Credentials",
          severity: "error",
        });
        navigate('/home');
      });
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        sx={{
          width: "25em",
          height: "30em",
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
        }}
        elevation={5}>
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              color: '#333',
              textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'
            }}>
            LOGIN
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "100%",
            px: 2,
            py: 3,
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            placeholder="Enter Username"
            size="medium"
            onChange={handleInputChange}
            name="username"
            value={formValues.username}
            required
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            placeholder="Enter Password"
            size="medium"
            onChange={handleInputChange}
            name="password"
            type="password"
            value={formValues.password}
            required
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Button
              variant="outlined"
              type="submit"
              sx={{ width: '150px', height: '50px', marginRight: '10px' }}
            >
              Login
            </Button>
            <Button
              onClick={handleReset}
              //sx={{ ml:2 }}
              variant="outlined"
              color="secondary"
              sx={{ ml: 2, width: '150px', height: '50px', marginRight: '10px' }}
            >
              Reset
            </Button>
          </Box>
          <Typography variant="body2" sx={{ color: '#333', textAlign: 'center' }}>
            Don't have an account? {' '}
            <Link href="#" onClick={handleRegisterClick}>
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
