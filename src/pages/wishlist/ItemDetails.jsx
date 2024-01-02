// ItemDetails.jsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ItemDetails = () => {
  const location = useLocation();  
  const { item } = location.state || { };
  console.log("item-details: ",item);

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.nix_item_name}</h2>
          <table>
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(item).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{item[key]}</td>
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
