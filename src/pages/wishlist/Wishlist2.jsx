import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Modal } from '@mui/material';
import { useNavigate } from "react-router-dom";
import isLoggedIn from '../../auth/Auth';
import { useSelector } from 'react-redux';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [newItems, setNewItems] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to access the wishlist.'); // Show an alert if not logged in
      navigate('/login'); // Redirect to login page
      return;
    }

    const token = localStorage.getItem('token');
    console.log(token);

    // Fetch wishlist items for the logged-in user from the backend
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:8084/wish/getUserWishList`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch wishlist: ${response.status}`);
        }
  
        const wishlistData = await response.json();
        console.log(wishlistData);
        setWishlistItems(wishlistData); // Assuming the response has a wishlist array
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleCardClick = async(itemName) => {
    try {
      const response = await axios.get(`http://localhost:8084/wish/getUserWishList`);
      setNewItems(response);
      {newItems && newItems.length > 0 ? (
        newItems.map((item, index) => {
          if(item.nix_item_name === itemName){
            console.log("inside if");
            console.log('Matching items:', item);
            return navigate('/item', {state: {item}})
            
          }
      })
      ) : (
        <Typography variant="body1">No wishlist items found.</Typography>
      )}
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };


return (
  <div>
    <h2>Wishlist</h2>
    <div>
      <Grid container spacing={2}>
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.nix_item_id}>
              <Card onClick={(e) => handleCardClick(item.nix_item_name)}>
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {item.nix_item_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No wishlist items found.</Typography>
        )}
      </Grid>
    </div>
  </div>
);
};

export default Wishlist;
