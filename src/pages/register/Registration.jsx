import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/registerSlice";

export default function Register(props) {
  const { setSnackbarProps } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormValues = {
    username: "",
    password: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerUser(formValues));
      
      if (response.payload && response.payload.ok) {
        setSnackbarProps({
          open: true,
          msg: "Registered Successfully",
          severity: "success",
        });
        navigate("/home");
      } else {
        throw new Error("Registration Failed");
      }
    } catch (error) {
      setSnackbarProps({
        open: true,
        msg: "Registration Failed",
        severity: "error",
      });
    }
  }

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
          }} elevation={5}>
          <Box sx={{ textAlign: "center", pt: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                color: '#333',
                textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'
              }}>
              REGISTER
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
              size="small"
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
              size="small"
              onChange={handleInputChange}
              name="password"
              type="password"
              value={formValues.password}
              required
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Enter Email"
              size="small"
              onChange={handleInputChange}
              name="email"
              type="email"
              value={formValues.email}
              required
              fullWidth
            />
            <Box sx={{ display: "flex", width: "100%" }}>
              <Button variant="outlined" type="submit">
                SignUp
              </Button>
              <Button
                onClick={handleReset}
                sx={{ mx: 2 }}
                variant="outlined"
                color="secondary"
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
