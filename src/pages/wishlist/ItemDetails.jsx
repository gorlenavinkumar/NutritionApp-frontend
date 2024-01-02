// ItemDetails.jsx
import { yellow } from '@mui/material/colors';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ItemDetails = () => {
  const location = useLocation();  
  const { item } = location.state || { };
  console.log("item-details: ",item);

  return (
    <div >
      {item ? (
        <div style={{ maxHeight: '500px', overflowY: 'auto', paddingBottom: '10px', position: 'relative', textAlign: 'center' }}>
          <h2 style={{
                        position: 'sticky',
                        top: '0',
                        backgroundColor: 'white',
                        textAlign: 'center'
                    }}>
            {item.nix_item_name}
            </h2>
          <table border="1" cellSpacing="0" style={{ marginTop: '30px', margin: 'auto' }}>
            <thead>
              <tr>
                <th style={{ width: '300px', height: '40px'}}>Nutrient</th>
                <th style={{ width: '300px', height: '40px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(item).map((key) => (
                <tr key={key}>
                  <td style={{ width: '200px', height: '40px' }}>{key}</td>
                  <td style={{ width: '200px', height: '40px' }}>{item[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No item data available.</p>
      )}
    </div>
  );
};

export default ItemDetails;
