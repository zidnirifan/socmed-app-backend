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
import GetFollowingPosts from '../Applications/use_case/GetFollowingPosts';
import GetUserProfile from '../Applications/use_case/GetUserProfile';
import ToggleLikePost from '../Applications/use_case/ToggleLikePost';
import ToggleFollowUser from '../Applications/use_case/ToggleFollowUser';
import EditUser from '../Applications/use_case/EditUser';
import EditUserValidator from './validator/user/EditUserValidator';
import SearchUsers from '../Applications/use_case/SearchUsers';
import AddComment from '../Applications/use_case/AddComment';
import CommentValidator from './validator/comment/CommentValidator';
import CommentRepository from '../Domains/comments/CommentRepository';
import CommentRepositoryMongo from './repository/CommentRepositoryMongo';
import GetPostComments from '../Applications/use_case/GetPostComments';
import ToggleLikeComment from '../Applications/use_case/ToggleLikeComment';
import GetExplorePosts from '../Applications/use_case/GetExplorePosts';
import GetExplorePostsMedia from '../Applications/use_case/GetExplorePostsMedia';
import ChatRepository from '../Domains/chats/ChatRepository';
import ChatRepositoryMongo from './repository/ChatRepositoryMongo';
import ChatValidator from './validator/chat/ChatValidator';
import AddChat from '../Applications/use_case/AddChat';
import GetLatestChat from '../Applications/use_case/GetLatestChat';
import GetConversation from '../Applications/use_case/GetConversation';
import ReadChat from '../Applications/use_case/ReadChat';
import SocketClient from '../Applications/socketClient/SocketClient';
import SocketIOClient from './socketClient/SocketIOClient';
import AddNotif from '../Applications/use_case/AddNotif';
import NotifRepository from '../Domains/notif/NotifRepository';
import NotifRepositoryMongo from './repository/NotifRepositoryMongo';
import GetNotifs from '../Applications/use_case/GetNotifs';
import GetCountNotifChat from '../Applications/use_case/GetCountNotifChat';
import ReadNotif from '../Applications/use_case/ReadNotif';
import GetFollowers from '../Applications/use_case/GetFollowers';
import GetFollowing from '../Applications/use_case/GetFollowing';
import GetSuggestedUsers from '../Applications/use_case/GetSuggestedUsers';
import GetUserById from '../Applications/use_case/GetUserById';
import EditUserBio from '../Applications/use_case/EditUserBio';

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
  {
    key: EditUserValidator.name,
    Class: EditUserValidator,
  },
  {
    key: CommentValidator.name,
    Class: CommentValidator,
  },
  {
    key: CommentRepository.name,
    Class: CommentRepositoryMongo,
  },
  {
    key: ChatValidator.name,
    Class: ChatValidator,
  },
  {
    key: ChatRepository.name,
    Class: ChatRepositoryMongo,
  },
  {
    key: SocketClient.name,
    Class: SocketIOClient,
  },
  {
    key: NotifRepository.name,
    Class: NotifRepositoryMongo,
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
    key: GetFollowingPosts.name,
    Class: GetFollowingPosts,
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
        {
          name: 'socketClient',
          internal: SocketClient.name,
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
        {
          name: 'socketClient',
          internal: SocketClient.name,
        },
      ],
    },
  },
  {
    key: EditUser.name,
    Class: EditUser,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: EditUserValidator.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: SearchUsers.name,
    Class: SearchUsers,
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
  {
    key: AddComment.name,
    Class: AddComment,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: CommentValidator.name,
        },
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'socketClient',
          internal: SocketClient.name,
        },
      ],
    },
  },
  {
    key: GetPostComments.name,
    Class: GetPostComments,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
  {
    key: ToggleLikeComment.name,
    Class: ToggleLikeComment,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'socketClient',
          internal: SocketClient.name,
        },
      ],
    },
  },
  {
    key: GetExplorePosts.name,
    Class: GetExplorePosts,
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
    key: GetExplorePostsMedia.name,
    Class: GetExplorePostsMedia,
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
    key: AddChat.name,
    Class: AddChat,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'chatRepository',
          internal: ChatRepository.name,
        },
        {
          name: 'validator',
          internal: ChatValidator.name,
        },
      ],
    },
  },
  {
    key: GetLatestChat.name,
    Class: GetLatestChat,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'chatRepository',
          internal: ChatRepository.name,
        },
      ],
    },
  },
  {
    key: GetConversation.name,
    Class: GetConversation,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'chatRepository',
          internal: ChatRepository.name,
        },
      ],
    },
  },
  {
    key: ReadChat.name,
    Class: ReadChat,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'chatRepository',
          internal: ChatRepository.name,
        },
      ],
    },
  },
  {
    key: AddNotif.name,
    Class: AddNotif,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'notifRepository',
          internal: NotifRepository.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'postRepository',
          internal: PostRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
  {
    key: GetNotifs.name,
    Class: GetNotifs,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'notifRepository',
          internal: NotifRepository.name,
        },
      ],
    },
  },
  {
    key: GetCountNotifChat.name,
    Class: GetCountNotifChat,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'notifRepository',
          internal: NotifRepository.name,
        },
        {
          name: 'chatRepository',
          internal: ChatRepository.name,
        },
      ],
    },
  },
  {
    key: ReadNotif.name,
    Class: ReadNotif,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'notifRepository',
          internal: NotifRepository.name,
        },
      ],
    },
  },
  {
    key: GetFollowers.name,
    Class: GetFollowers,
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
  {
    key: GetFollowing.name,
    Class: GetFollowing,
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
  {
    key: GetSuggestedUsers.name,
    Class: GetSuggestedUsers,
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
  {
    key: GetUserById.name,
    Class: GetUserById,
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
  {
    key: EditUserBio.name,
    Class: EditUserBio,
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
