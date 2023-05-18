import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const DishForm = () => {
  const [name, setName] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [type, setType] = useState('');
  const [noOfSlices, setNoOfSlices] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [spicinessScale, setSpicinessScale] = useState(1);
  const [slicesOfBread, setSlicesOfBread] = useState(0);
  const [errors, setErrors] = useState(null);
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'preparationTime') setPreparationTime(value);
    if (name === 'type') setType(value);
    if (name === 'noOfSlices') setNoOfSlices(Number(value));
    if (name === 'diameter') setDiameter(Number(value));
    if (name === 'spicinessScale') setSpicinessScale(Number(value));
    if (name === 'slicesOfBread') setSlicesOfBread(Number(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishData = {
      name,
      preparation_time: preparationTime,
      type,
      ...(type === 'pizza' && { no_of_slices: noOfSlices, diameter }),
      ...(type === 'soup' && { spiciness_scale: spicinessScale }),
      ...(type === 'sandwich' && { slices_of_bread: slicesOfBread }),
    };
    axios
      .post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', dishData)
      .then((response) => {
        setResponse(response.data);
        setErrors(null);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      });
  };

return (
  <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="label">
          Dish Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="preparationTime" className="label">
          Preparation Time (HH:MM:SS):
        </label>
        <input
          type="text"
          id="preparationTime"
          name="preparationTime"
          value={preparationTime}
          onChange={handleInputChange}
          className="input"
          required
          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
        />
      </div>
      <div className="form-group">
        <label htmlFor="type" className="label">
          Dish Type:
        </label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={handleInputChange}
          className="select"
          required
        >
          <option value="">Select type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
      </div>

      {type === 'pizza' && (
        <>
          <div className="form-group">
            <label htmlFor="noOfSlices" className="label">
              Number of Slices:
            </label>
            <input
              type="number"
              id="noOfSlices"
              name="noOfSlices"
              value={noOfSlices}
              onChange={handleInputChange}
              className="input"
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="diameter" className="label">
              Diameter:
            </label>
            <input
              type="number"
              step="0.01"
              id="diameter"
              name="diameter"
              value={diameter}
              onChange={handleInputChange}
              className="input"
              required
              min="0.01"
            />
          </div>
        </>
      )}

      {type === 'soup' && (
        <div className="form-group">
          <label htmlFor="spicinessScale" className="label">
            Spiciness Scale (1-10):
          </label>
          <input
            type="number"
            id="spicinessScale"
            name="spicinessScale"
            value={spicinessScale}
            onChange={handleInputChange}
            className="input"
            required
            min="1"
            max="10"
          />
        </div>
      )}

      {type === 'sandwich' && (
        <div className="form-group">
          <label htmlFor="slicesOfBread" className="label">
            Number of Slices of Bread:
          </label>
          <input
            type="number"
            id="slicesOfBread"
            name="slicesOfBread"
            value={slicesOfBread}
            onChange={handleInputChange}
            className="input"
            required
            min="0"
          />
        </div>
      )}

      <button type="submit" className="button">
        Submit
      </button>

      {errors && (
        <div className="error">
          <p>Validation errors:</p>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {response && (
        <div className="response">
          <p>Response:</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </form>
  </div>
);
};

export default DishForm;

