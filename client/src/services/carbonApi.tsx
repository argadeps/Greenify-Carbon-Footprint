import { EmissionFactor as ef} from '../../../server/models/emissionFactor.js';
import { EmissionFactor } from '../../../server/models/index.js'

type CarType = "electric" | "hybrid" | "gas"; // Only car types

const activityIDs: Array<ef> = await EmissionFactor.findAll({ where: { category: 'car' } });

const ACTIVITY_IDS: Record<CarType, ef | undefined> = {
  electric: undefined,
  hybrid: undefined,
  gas: undefined
};

for(const id of activityIDs) {

  if (id.display_name === 'electric') {
    ACTIVITY_IDS.electric = id;
  }
  else if (id.display_name === 'hybrid') {
    ACTIVITY_IDS.hybrid = id;
  }
  else if (id.display_name === 'gas') {
    ACTIVITY_IDS.gas = id;
  }
}

// Define expected data structure for form data
export interface CarbonFormData {
  vehicle?: {
    type: CarType;
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
        'emission_factor': {
          'activity_id': ACTIVITY_IDS[data.vehicle.type]?.activity_id,
          'source': ACTIVITY_IDS[data.vehicle.type]?.source,
          'region': ACTIVITY_IDS[data.vehicle.type]?.region,
          'year': ACTIVITY_IDS[data.vehicle.type]?.year,
          'source_lca_activity': ACTIVITY_IDS[data.vehicle.type]?.source_lca_activity,
          'data_version': ACTIVITY_IDS[data.vehicle.type]?.data_version
        }, // Type-safe access
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
        Authorization: `Bearer A3FQN4KM056RV7653MD21R24W4`, // Replace with real API key
      },
      body: JSON.stringify(payload[0]),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Climatiq API");
    }

    const result = await response.json();
    const {co2e, unit, emission_factor} = result;

    // Extract CO₂ impact from response
    return {'co2e': co2e, 'unit': unit, 'activity_id': emission_factor.activity_id};

  } catch (error) {
    console.error("Error calculating carbon impact:", error);
    throw error;
  }
};
