import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { ActivityFactory } from './activity.js';
import { CarbonFootprintFactory } from './carbonFootprint.js';
import { EmissionFactorFactory } from './emissionFactor.js';
import { ParameterFactory } from './parameter.js';

const User = UserFactory(sequelize);
const Activity = ActivityFactory(sequelize);
const CarbonFootprint = CarbonFootprintFactory(sequelize);
const EmissionFactor =  EmissionFactorFactory(sequelize);
const Parameter = ParameterFactory(sequelize);

export { User, Activity, CarbonFootprint, EmissionFactor, Parameter };