import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REGISTER_URL = "http://localhost:8081/userProfile/register"; // Replace with your actual registration endpoint

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Data to be sent to the server
    });
    console.log("Inside registerSlice", response);

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json(); // Return the response data if needed
  } catch (error) {
    throw new Error(error.message);
  }
});


