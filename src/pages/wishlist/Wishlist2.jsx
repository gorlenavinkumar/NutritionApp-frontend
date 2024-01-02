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

  const [output, setOutput] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if user is logged in and retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8084/wish/getUserWishList`, {
          method: 'GET',
          headers: {
            Authorization: token,
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

  const handleCardClick = async (itemName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8084/wish/getUserWishList`, {
        headers: {
          Authorization: token,
        }
      });
      console.log(response);
      setNewItems(response.data);
      {
        newItems && newItems.length > 0 ? (
          newItems.map((item, index) => {
            if (item.nix_item_name === itemName) {
              console.log("inside if");
              console.log('Matching items:', item);
              return navigate('/item', { state: { item } })

            }
          })
        ) : (
          <Typography variant="body1">No wishlist items found.</Typography>
        )
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleDeleteItemClick = (e, itemName) => {
    const selectedTableData = output.find(item => item.nix_item_name === itemName);
    if (selectedTableData) {
      fetch(`http://localhost:8084/wish/deleteUserProduct/${selectedTableData.nix_item_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token, // Login token
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to remove item from favorites');
          }
          return response.json();
        })
        .then(() => {
          const updatedFavorites = favorites.filter(item => item !== itemName);
          setFavorites(updatedFavorites);
          setIsFavorite(false);
        })
        .catch(error => {
          console.error('Error removing item from favorites:', error);
        });
    }
  }


  return (
    <div>
      <h2 style={{
        position: 'sticky',
        top: '0',
        backgroundColor: 'white',
        textAlign: 'center'
      }}
      >
        Wishlist
      </h2>
      <div>
        <Grid container spacing={2}>
          {wishlistItems && wishlistItems.length > 0 ? (
            wishlistItems.map((item, index) => (
              <Grid item xs={12} sm={10} md={10} lg={4} key={item.nix_item_id}>
                <Card
                  style={{
                    border: '2px solid black',
                    backgroundImage: `url('https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg')`,
                    backgroundSize: 'cover',
                  }}
                  onClick={(e) => handleCardClick(item.nix_item_name)}>
                  <CardContent style={{ position: 'relative' }}>
                    <Typography variant="h6" component="h3">
                      {item.nix_item_name}
                    </Typography>
                    <div style={{ position: 'absolute', bottom: 25, right: 70 }}>
                      <button
                        style={{
                          position: 'absolute',
                          color: 'red',
                          fontWeight: 'bold',
                          cursor: 'pointer',

                        }}
                        onClick={(e) => handleDeleteItemClick(e, item.nix_item_name)}
                      >
                        Delete
                      </button>
                    </div>
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
