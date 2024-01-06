import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "7vh", // Adjusted height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)", // Added box shadow
        paddingTop:"20px",
      }}
    >
      <Typography variant="body2">
        &copy; {`Copyright ${currentYear}`}
      </Typography>
    </Box>
  );
};

export default Footer;
