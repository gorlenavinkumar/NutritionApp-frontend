import React, { useEffect, useState } from "react";
import { Box, Button, Container, Paper, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "../search/SearchResults";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search/${searchQuery}`); 
    }
  };

  const cardContent = [
    {
      title: "Macronutrients",
      description: "Carbohydrates, proteins, and fats are the primary macronutrients providing energy and structural components vital for bodily functions.",
    },
    {
      title: "Micronutrients",
      description: "Vitamins and minerals, found in smaller quantities, play critical roles in supporting various bodily functions, from immune health to bone strength.",
    },
    {
      title: "Hydration",
      description: "Water, essential for life, regulates body temperature, aids in nutrient transportation, and facilitates waste removal.",
    },
    {
      title: "Time and Balance",
      description: "Balancing and timing meals with a diverse range of nutrients optimizes energy levels, metabolism, and overall health.",
    },
  ];
  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0000000f",
        backgroundImage: "url('https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg')",
        //https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg
        //https://img.freepik.com/free-photo/vintage-old-rustic-cutlery-dark_1220-4886.jpg 
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: "1rem",
            width: "70%",
            textAlign: { xs: "center", md: "left" }
          }}
        >
          ""Discover the Power of Nourishment: Elevate Your Health with Expert Guidance and Nutritional Insights!""
        </Typography>

        <TextField
          placeholder="Search your Food Item"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ width: "70%" }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => handleSearch(searchQuery)}>
                <SearchIcon />
              </IconButton>
            ),
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputLabelProps={{
            style: { fontWeight: "bold" }, // Bold label text
          }}
          sx={{
            width: "100%",
            mb: 2,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000", // Outline color
              borderWidth: "4px",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000", // Outline color on hover
              borderWidth: "6px",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Grid container spacing={2} justifyContent="space-evenly">
          {cardContent.map((content, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={3}>
              <Paper elevation={5} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
              <Typography variant="h6" sx={{ color: "primary.dark" }}>
                {content.title}
              </Typography>
              <Typography sx={{ my: 1, textAlign: "center" }}>
                {content.description}
              </Typography>
            </Box>
          </Paper>
          </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
