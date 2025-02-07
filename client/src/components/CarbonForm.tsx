import React, { useState } from 'react';
/*
interface FormData {
  location: string;
  electricity: number;
  transportation: string;
  carType: string;
  diet: string;
  waterUsage: number;
} */

const CarbonForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    electricity: 0,
    transportation: 'car',
    carType: 'electric',
    diet: 'meat_every_meal',
    waterUsage: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   /* 
    // Here, you would process and send formData to the API
    const response = await fetch('https://api.climatiq.io/impact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log('API Response:', data);
    // You can call your function to process data (displaying on dashboard, storing activities, etc.)
  }; */

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location (Zip Code):
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Monthly Electricity Bill ($):
        <input
          type="number"
          name="electricity"
          value={formData.electricity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Transportation Type:
        <select
          name="transportation"
          value={formData.transportation}
          onChange={handleChange}
          required
        >
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="bike_walking">Bike/Walking</option>
        </select>
      </label>
      <label>
        Car Fuel Type:
        <select
          name="carType"
          value={formData.carType}
          onChange={handleChange}
        >
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
      </label>
      <label>
        Food Diet:
        <select
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          required
        >
          <option value="meat_every_meal">Meat in every meal</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </label>
      <label>
        Water Usage (Percentage of Average):
        <input
          type="number"
          name="waterUsage"
          min="0"
          max="100"
          value={formData.waterUsage}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Log Entry</button>
    </form>
  );
};

export default CarbonForm;
