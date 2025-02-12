import { Parameter } from "../models/index.js";

export const seedParameters = async () => {
    await Parameter.bulkCreate([
        {parameter_name: 'passengers', value: '4', value_type: 'number', display_name: 'gas', user_id: 1 },
        {parameter_name: 'distance', value: '100', value_type: 'number', display_name: 'gas', user_id: 1},
        {parameter_name: 'distance_unit', value: 'mi', value_type: 'string', display_name: 'gas', user_id: 1}
    ]);
};