import { createContainer } from 'instances-container';

// service
import UserRepository from '../Domains/users/UserRepository';
import UserRepositoryMongo from './repository/UserRepositoryMongo';
import PasswordHash from '../Applications/security/PasswordHash';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import UserValidator from './validator/user/UserValidator';
import UserLoginValidator from './validator/auth/UserLoginValidator';
import AuthRepositoryMongo from './repository/AuthRepositoryMongo';
import AuthRepository from '../Domains/auth/AuthRepository';
import TokenManager from '../Applications/security/TokenManager';
import JwtTokenManager from './security/JwtTokenManager';
import LoginUser from '../Applications/use_case/LoginUser';

// use case
import AddUser from '../Applications/use_case/AddUser';

const container = createContainer();

container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryMongo,
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
  },
  {
    key: UserValidator.name,
    Class: UserValidator,
  },
  {
    key: UserLoginValidator.name,
    Class: UserLoginValidator,
  },
  {
    key: AuthRepository.name,
    Class: AuthRepositoryMongo,
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
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
  {
    key: LoginUser.name,
    Class: LoginUser,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: UserLoginValidator.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

export type IContainer = typeof container;

export default container;
