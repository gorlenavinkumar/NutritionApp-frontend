import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Router from "./Router";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Router />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
