import { seedEmissionFactors} from './emisssion-factors-seeds.js';
import { seedUsers } from './user-seeds.js';
import { seedParameters } from './paramete-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedEmissionFactors();
    console.log('\n----- EMISSIONFACTORS SEEDED -----\n');

    await seedParameters();
    console.log('\n----- PARAMETERS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
