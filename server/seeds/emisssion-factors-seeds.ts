import { EmissionFactor } from "../models/index.js";

export const seedEmissionFactors = async () => {
    await EmissionFactor.bulkCreate([
        {activity_id: 'passenger_vehicle-vehicle_type_car-fuel_source_bev-distance_na-engine_size_na', category: 'car', display_name: 'electric',source: 'UBA', region: 'DE', year: 2020, source_lca_activity: 'upstream-electricity_consumption', data_version: '^20', created_at: Date.now()},
        {activity_id: 'passenger_vehicle-vehicle_type_car-fuel_source_bio_petrol-distance_na-engine_size_medium', category: 'car', display_name: 'gas', source: 'UBA', region: 'DE', year: 2020, source_lca_activity: 'fuel_combustion', data_version: '^20', created_at: Date.now()},
        {activity_id: 'passenger_vehicle-vehicle_type_car-fuel_source_diesel_hev-engine_size_na-vehicle_age_na-vehicle_weight_na', category: 'car', display_name: 'hybrid',source: 'MfE', region: 'NZ', year: 2020, source_lca_activity: 'fuel_combustion', data_version: '^20', created_at: Date.now()}
    ])
};