import { createContainer } from 'instances-container';

import bcrypt from 'bcrypt';

// service
import UserModel from './model/User';
import UserRepository from '../Domains/users/UserRepository';
import UserRepositoryMongo from './repository/UserRepositoryMongo';
import PasswordHash from '../Applications/security/PasswordHash';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import UserValidator from './validator/user/UserValidator';

// use case
import AddUser from '../Applications/use_case/AddUser';

const container = createContainer();

container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryMongo,
    parameter: {
      dependencies: [{ concrete: UserModel }],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: UserValidator.name,
    Class: UserValidator,
  },
]);

container.register([
  {
    key: AddUser.name,
    Class: AddUser,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'validator',
          internal: UserValidator.name,
        },
      ],
    },
  },
]);

export type IContainer = typeof container;

export default container;
