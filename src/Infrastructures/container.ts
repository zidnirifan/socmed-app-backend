/* istanbul ignore file */

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
import ProfilePhotoValidator from './validator/user/ProfilePhotoValidator';
import ImageResizer from '../Applications/storage/ImageResizer';
import ImageResizerSharp from './storage/ImageResizer';
import Storage from '../Applications/storage/Storage';
import RefreshAuthValidator from './validator/auth/RefreshAuthValidator';
import LogoutUserValidator from './validator/auth/LogoutUserValidator';
import PostValidator from './validator/post/PostValidator';
import PostRepository from '../Domains/posts/PostRepository';
import PostRepositoryMongo from './repository/PostRepositoryMongo';
import LocalStorage from './storage/LocalStorage';
import FirebaseStorage from './storage/FirebaseStorage';

// use case
import AddUser from '../Applications/use_case/AddUser';
import LoginUser from '../Applications/use_case/LoginUser';
import RefreshAuth from '../Applications/use_case/RefreshAuth';
import LogoutUser from '../Applications/use_case/LogoutUser';
import EditProfilePhoto from '../Applications/use_case/EditProfilePhoto';
import AddPost from '../Applications/use_case/AddPost';
import GetPost from '../Applications/use_case/GetPost';
import GetHomePost from '../Applications/use_case/GetHomePosts';
import GetUserProfile from '../Applications/use_case/GetUserProfile';
import ToggleLikePost from '../Applications/use_case/ToggleLikePost';
import ToggleFollowUser from '../Applications/use_case/ToggleFollowUser';

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
  {
    key: RefreshAuthValidator.name,
    Class: RefreshAuthValidator,
  },
  {
    key: LogoutUserValidator.name,
    Class: LogoutUserValidator,
  },
  {
    key: ProfilePhotoValidator.name,
    Class: ProfilePhotoValidator,
  },
  {
    key: ImageResizer.name,
    Class: ImageResizerSharp,
  },
  {
    key: Storage.name,
    Class: process.env.NODE_ENV === 'test' ? LocalStorage : FirebaseStorage,
  },
  {
    key: PostValidator.name,
    Class: PostValidator,
  },
  {
    key: PostRepository.name,
    Class: PostRepositoryMongo,
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
  {
    key: RefreshAuth.name,
    Class: RefreshAuth,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: RefreshAuthValidator.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
      ],
    },
  },
  {
    key: LogoutUser.name,
    Class: LogoutUser,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: LogoutUserValidator.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
      ],
    },
  },
  {
    key: EditProfilePhoto.name,
    Class: EditProfilePhoto,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: ProfilePhotoValidator.name,
        },
        {
          name: 'imageResizer',
          internal: ImageResizer.name,
        },
        {
          name: 'storage',
          internal: Storage.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: AddPost.name,
    Class: AddPost,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: PostValidator.name,
        },
        {
          name: 'imageResizer',
          internal: ImageResizer.name,
        },
        {
          name: 'storage',
          internal: Storage.name,
        },
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
      ],
    },
  },
  {
    key: GetPost.name,
    Class: GetPost,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
      ],
    },
  },
  {
    key: GetHomePost.name,
    Class: GetHomePost,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserProfile.name,
    Class: GetUserProfile,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
      ],
    },
  },
  {
    key: ToggleLikePost.name,
    Class: ToggleLikePost,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
      ],
    },
  },
  {
    key: ToggleFollowUser.name,
    Class: ToggleFollowUser,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
]);

export type IContainer = typeof container;

export default container;
