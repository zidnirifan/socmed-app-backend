interface Post {
  id: string;
  media: string;
}

export interface IUserProfile {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
  bio: string;
  posts: Post[];
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowed: boolean;
}

class UserProfile implements IUserProfile {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
  bio: string;
  posts: Post[];
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowed: boolean;

  constructor(payload: IUserProfile) {
    this.id = payload.id;
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.profilePhoto = payload.profilePhoto;
    this.bio = payload.bio;
    this.posts = payload.posts;
    this.postsCount = payload.postsCount;
    this.followersCount = payload.followersCount;
    this.followingCount = payload.followingCount;
    this.isFollowed = payload.isFollowed;
  }
}

export default UserProfile;
