import React, { useState } from 'react';

const CarbonForm: React.FC = () => {
  const [formData, setFormData] = useState({
    location: '',
    electricity: 0,
    transportation: 'car',
    carType: 'electric',
    diet: 'meat_every_meal',
    waterUsage: 50,
  });

  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    // API call to Climatiq would go here
    setShowForm(false); // Close the form after submission
  };

  const handleButtonClick = () => {
    setShowForm(true); // Open the form when "Log Entry" button is clicked
  };

  const handleCancel = () => {
    setShowForm(false); // Close the form when "Cancel" is clicked
  };

  return (
    <div>
      {/* Log Entry Button */}
      {!showForm && (
        <button
          onClick={handleButtonClick}
          id="log-entry"
          className="btn btn-success w-100"
        >
          Log Entry
        </button>
      )}

      {/* Form that pops up when the button is clicked */}
      {showForm && (
        <form onSubmit={handleSubmit} id="carbon-form" className="p-4 bg-light rounded shadow-sm max-w-md mx-auto">
          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Location (Zip Code):</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Electricity */}
          <div className="mb-3">
            <label className="form-label">Monthly Electricity Bill ($):</label>
            <input
              type="number"
              name="electricity"
              value={formData.electricity}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Transportation */}
          <div className="mb-3">
            <label className="form-label">Transportation Type:</label>
            <select
              name="transportation"
              value={formData.transportation}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="bike">Bike</option>
              <option value="walking">Walking</option>
            </select>
          </div>

          {/* Car Type (Only shows if car is selected) */}
          {formData.transportation === 'car' && (
            <div className="mb-3">
              <label className="form-label">Car Fuel Type:</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>
          )}

          {/* Diet */}
          <div className="mb-3">
            <label className="form-label">Food Diet:</label>
            <select
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="meat_every_meal">Meat in every meal 🍖</option>
              <option value="vegetarian">Vegetarian 🥗</option>
              <option value="vegan">Vegan 🌱</option>
            </select>
          </div>

          {/* Water Usage */}
          <div className="mb-3">
            <label className="form-label">Water Usage (% of Average):</label>
            <input
              type="range"
              name="waterUsage"
              min="0"
              max="100"
              value={formData.waterUsage}
              onChange={handleChange}
              className="form-range"
            />
            <span className="d-block text-center mt-2">{formData.waterUsage}%</span>
          </div>

          {/* Submit Button and Cancel Button */}
          <div className="d-flex justify-content-between">
            <button type="submit" id="log-entry" className="btn btn-success">
              Log Entry
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CarbonForm;
