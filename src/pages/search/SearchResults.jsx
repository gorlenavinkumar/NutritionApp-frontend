import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/* const output = [
    { "nix_brand_name": "Milo's Hamburgers", "nix_brand_id": "58c05bd9fc977da756c7a4fc", "nix_item_name": "Hamburger", "nix_item_id": "c6405291f1393db78caf5a7e", "serving_qty": 1, "serving_unit": "sandwich", "serving_weight_grams": 0, "nf_metric_qty": 0, "nf_metric_uom": "null", "nf_calories": 340, "nf_total_fat": 12, "nf_saturated_fat": 3, "nf_cholesterol": 55, "nf_sodium": 690, "nf_total_carbohydrate": 35, "nf_dietary_fiber": 8, "nf_sugars": 4, "nf_protein": 24, "nf_potassium": 0 },
    { "nix_brand_name": "Original Tommy's Hamburgers", "nix_brand_id": "513fbc1283aa2dc80c000273", "nix_item_name": "Double Hamburger", "nix_item_id": "513fc9ca673c4fbc260046ed", "serving_qty": 333, "serving_unit": "grams", "serving_weight_grams": 0, "nf_metric_qty": 0, "nf_metric_uom": "null", "nf_calories": 650, "nf_total_fat": 34, "nf_saturated_fat": 12, "nf_cholesterol": 0, "nf_sodium": 1040, "nf_total_carbohydrate": 46, "nf_dietary_fiber": 0, "nf_sugars": 0, "nf_protein": 42, "nf_potassium": 0 },
] */

const TableComponent = () => {
    const { query } = useParams();
    const [selectedTable, setSelectedTable] = useState(null);
    const [output, setOutput] = useState([]);

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return (
                <ul>
                    {value.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
        }
        return value.toString();
    };

    const handleSelectTable = (event) => {
        const selectedTableName = event.target.value;
        setSelectedTable(selectedTableName);
    };

    useEffect(() => {
        fetch(`http://localhost:8083/nutrition/search?query=${query}`)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok: ${response.status}`');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setOutput(data);
                } else {
                    throw new Error('Data is not an array');
                }
            })
            .catch((error) => console.error('Error fetching or processing data:', error));
    }, [query]);


    const renderSelectedTable = () => {
        if (!selectedTable) {
            return null;
        }

        const selectedTableData = output.filter(
            (object) => object.nix_item_name === selectedTable
        )[0];

        return (
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingBottom: '10px', position: 'relative', textAlign: 'center' }}>
                <h3 style={{
                    position: 'sticky',
                    top: '0',
                    backgroundColor: 'white',
                    textAlign: 'center'
                }}>
                    Selected Item: {selectedTable}
                </h3>
                <table border="1" cellSpacing="0" style={{ marginTop: '30px', margin: 'auto' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '300px', height: '40px' }}>Nutrients</th>
                            <th style={{ width: '300px', height: '40px' }}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(selectedTableData).map(([key, value], index) => (
                            <tr key={index}>
                                <td style={{ width: '200px', height: '40px' }}>{key}</td>
                                <td style={{ width: '200px', height: '40px' }}>{renderValue(value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div style={{

            textAlign: 'center'
        }}>
            <h2>Select your Food Item</h2>
            {/* <label htmlFor="tablesDropdown">Select your Food Item</label> */}
            <select id="tablesDropdown" onChange={handleSelectTable} style={{ margin: '5px' }}>
                <option value="">Select your Food Item</option>
                {Array.isArray(output) && output.map((object, index) => (
                    <option key={index} value={object.nix_item_name}>
                        {object.nix_item_name}
                    </option>
                ))}
            </select>
            {renderSelectedTable()}
        </div>
    );
};


export default TableComponent;
