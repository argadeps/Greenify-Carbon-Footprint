import React, { useState } from "react";
// Import the calculateCarbonImpact function and CarbonFormData from your API file
// import { calculateCarbonImpact, CarbonFormData } from "./api/carbonApi";
import '../index.css'; 
import { calculateCarbonImpact, CarbonFormData } from "../services/carbonApi.js";
const CarbonForm: React.FC = () => {
  const [formData, setFormData] = useState({
    transportation: "car",
    carType: "electric",
    distance: 0,
  });

  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [carbonResults, setCarbonResults] = useState<any>({}); // Store CO₂ impact
  const [error, setError] = useState<string | null>(null); // Store errors

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", formData);

      // Prepare form data for API
      const carbonFormData: CarbonFormData = {
        vehicle: {
          type: formData.carType as "electric" | "hybrid" | "gas",
          distance: Number(formData.distance),
        },
      };

      // Fetch CO₂ impact from API (You need to define calculateCarbonImpact and CarbonFormData)
      const data = await calculateCarbonImpact(carbonFormData);
      setCarbonResults(data); // Store results
      setError(null);
      setShowForm(false);
    } catch (error) {
      setError("An error occurred while calculating the carbon impact.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      {/* Log Entry Button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn btn-success w-100">
          Log Entry
        </button>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="carbon-form"
        >
          {/* Transportation - Always set to "Car" */}
          <div className="mb-3">
            <label className="form-label">Transportation Type:</label>
            <input
              type="text"
              value="Car" // Fixed value for "Car"
              readOnly
              className="form-control"
            />
          </div>  

          {/* Car Type Dropdown */}
          {formData.transportation === "car" && (
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
                <option value="gas">Gas</option>
              </select>
            </div>
          )}

          {/* Distance */}
          {formData.transportation === "car" && (
            <div className="mb-3">
              <label className="form-label">Distance Driven (km):</label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          )}

          {/* Submit & Cancel */}
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">Calculate Impact</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-danger">Cancel</button>
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      )}

      {/* Display CO₂ Impact */}
      {carbonResults.length > 0 && (
        <div className="mt-4">
          <h4>Carbon Impact</h4>
          <ul className="list-group">
            {carbonResults.map((result: { activity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; co2e: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; unit: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
              <li key={index} className="list-group-item">
                {result.activity}: {result.co2e} {result.unit} CO₂
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarbonForm;

/*import React, { useState } from "react";
import "../index.css"; // Import your CSS file for styling

const CarbonForm: React.FC = () => {
  const [formData, setFormData] = useState({
    transportation: "car",  // Always set to "Car"
    carType: "electric",    // Default car type
    distance: 0,
  });

  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [carbonResults, setCarbonResults] = useState<any[]>([]); // Store CO₂ impact
  const [error, setError] = useState<string | null>(null); // Store errors

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fake calculation for CO₂ impact
  const simulateCarbonImpact = (data: { carType: string; distance: number }) => {
    const fakeData = [
      { activity: "Electric", co2e: 0.1, unit: "kg" },
      { activity: "Hybrid", co2e: 0.15, unit: "kg" },
      { activity: "Petrol", co2e: 0.25, unit: "kg" },
    ];

    const result = fakeData.find((item) => item.activity.toLowerCase() === data.carType);
    const simulatedCo2e = result ? result.co2e * data.distance : 0;

    return [
      {
        activity: result?.activity || "Unknown",
        co2e: simulatedCo2e.toFixed(2),
        unit: result?.unit || "kg",
      },
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate CO₂ impact calculation
      const data = simulateCarbonImpact({ carType: formData.carType, distance: Number(formData.distance) });
      setCarbonResults(data); // Store the simulated results
      setError(null);
      setShowForm(false);
    } catch (error) {
      setError("An error occurred while calculating the carbon impact.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      {/* Log Entry Button *//*}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn btn-success w-100">
          Log Entry
        </button>
      )}

      {/* Form *//*}
      {showForm && (
        <form onSubmit={handleSubmit} className="carbon-form">
          {/* Transportation - Always set to "Car" *//*}
          <div className="mb-3">
            <label className="form-label">Transportation Type:</label>
            <input
              type="text"
              value="Car" // Fixed value for "Car"
              readOnly
              className="form-control"
            />
          </div>

          {/* Car Type Dropdown *//*}
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
            </select>
          </div>

          {/* Distance *//*}
          <div className="mb-3">
            <label className="form-label">Distance Driven (km):</label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Submit & Cancel *//*}
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">Calculate Impact</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-danger">Cancel</button>
          </div>

          {/* Error Message *//*}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      )}

      {/* Display CO₂ Impact *//*}
      {carbonResults.length > 0 && (
        <div className="mt-4">
          <h4>Carbon Impact</h4>
          <ul className="list-group">
            {carbonResults.map((result, index) => (
              <li key={index} className="list-group-item">
                {result.activity}: {result.co2e} {result.unit} CO₂
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarbonForm;
*/