type ActivityType = "car" | "electric" | "hybrid" | "electricity" | "water";

const ACTIVITY_IDS: Record<ActivityType, string> = {
  car: "passenger_vehicle-vehicle_type_transport_passenger_car_medium_size_natural_gas...",
  electric: "passenger_vehicle-vehicle_type_car-fuel_source_bev-distance_na...",
  hybrid: "passenger_vehicle-vehicle_type_car-fuel_source_diesel_hev...",
  electricity: "electricity-supply_grid-source_supplier_mix",
  water: "water_supply-type_na",
};

// Define expected data structure
export interface CarbonFormData {
  vehicle?: {
    type: ActivityType;
    distance: number;
  };
  home?: {
    electricity?: number;
    water?: number;
  };
}

// Fetch CO₂ Impact from Climatiq API
export const calculateCarbonImpact = async (data: CarbonFormData) => {
  try {
    const payload = [];

    // Vehicle emissions
    if (data.vehicle) {
      payload.push({
        activity_id: ACTIVITY_IDS[data.vehicle.type], // Type-safe access
        params: {
          distance: data.vehicle.distance,
          distance_unit: "km",
        },
      });
    }

    // Electricity emissions
    if (data.home?.electricity) {
      payload.push({
        activity_id: ACTIVITY_IDS.electricity,
        params: {
          energy: data.home.electricity,
          energy_unit: "kWh",
        },
      });
    }

    // Water usage emissions
    if (data.home?.water) {
      payload.push({
        activity_id: ACTIVITY_IDS.water,
        params: {
          volume: data.home.water,
          volume_unit: "m³",
        },
      });
    }

    // API Request
    const response = await fetch("https://beta3.api.climatiq.io/estimate", {
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
