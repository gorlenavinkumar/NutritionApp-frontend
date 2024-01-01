import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from '@mui/material';

export default function Wishlist(props) {

    const { setSnackbarProps } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url('https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg')",
          }}
        >
        </Box>
      );
}