import { faker } from '@faker-js/faker';
import { User } from '../models/User';

/**
 * Generates random user data using faker-js
 * @returns {User} Random user data
 */
export const generateUserData = (): User => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({
      firstName: `test_${Date.now()}`,
      provider: 'gmail.com',
    }),
    telephone: faker.phone.number({ style: 'national' }),
    password: faker.internet.password({ length: 12 }),
  };
};
