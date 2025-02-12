type ActivityType = "electric" | "hybrid" | "gas"; // Only car types

const ACTIVITY_IDS: Record<ActivityType, string> = {
  electric: "passenger_vehicle-vehicle_type_car-fuel_source_bev-distance_na...",
  hybrid: "passenger_vehicle-vehicle_type_car-fuel_source_diesel_hev...",
  gas: "passenger_vehicle-vehicle_type_car-fuel_source_gasoline-distance_na...",
};

// Define expected data structure for form data
export interface CarbonFormData {
  vehicle?: {
    type: ActivityType;
    distance: number;
  };
}

// Fetch CO₂ Impact from Climatiq API
export const calculateCarbonImpact = async (data: CarbonFormData) => {
  try {
    const payload = [];

    // Vehicle emissions (only for electric, hybrid, or gas cars)
    if (data.vehicle) {
      payload.push({
        activity_id: ACTIVITY_IDS[data.vehicle.type], // Type-safe access
        params: {
          distance: data.vehicle.distance,
          distance_unit: "km",
        },
      });
    }

    // API Request
    const response = await fetch("https://api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer your_api_key_here`, // Replace with real API key
      },
      body: JSON.stringify({ estimations: payload }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Climatiq API");
    }

    const result = await response.json();

    // Extract CO₂ impact from response
    return result.estimations.map((activity: any) => ({
      activity: activity.activity_id,
      co2e: activity.co2e, // CO₂ impact in kg
      unit: activity.co2e_unit, // "kg"
    }));
  } catch (error) {
    console.error("Error calculating carbon impact:", error);
    throw error;
  }
};
