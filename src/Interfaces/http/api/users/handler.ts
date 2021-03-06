import { NextFunction, Request, Response } from 'express';
import AddUserUseCase from '../../../../Applications/use_case/AddUser';
import EditProfilePhoto from '../../../../Applications/use_case/EditProfilePhoto';
import BaseHandler from '../BaseHandler';
import { RequestAuth } from '../../middleware/auth';
import GetUserProfile from '../../../../Applications/use_case/GetUserProfile';
import ToggleFollowUser from '../../../../Applications/use_case/ToggleFollowUser';
import EditUser from '../../../../Applications/use_case/EditUser';
import SearchUsers from '../../../../Applications/use_case/SearchUsers';

class UsersHandler extends BaseHandler {
  async postUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const addUserUseCase = this.container.getInstance(AddUserUseCase.name);
      const userId = await addUserUseCase.execute(req.body);

      return res.status(201).json({
        status: 'success',
        message: 'user successfully registered',
        data: {
          userId,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async putProfilePhoto(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const photo = req.file;
      /* istanbul ignore next */
      const userId = req.auth?.id;

      if (!photo) {
        return res.status(400).json({
          status: 'fail',
          message: 'photo should be attached',
        });
      }

      const editProfilePhotoUseCase = this.container.getInstance(
        EditProfilePhoto.name
      );

      const profilePhoto = await editProfilePhotoUseCase.execute({
        path: photo.path,
        userId,
        fileName: photo.originalname,
        fileType: photo.mimetype,
      });

      return res.status(200).json({
        status: 'success',
        message: 'profile photo changed successfully',
        data: {
          profilePhoto,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getUserProfile(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const getUserProfile = this.container.getInstance(GetUserProfile.name);
      const userProfile = await getUserProfile.execute(
        req.params.id || userId,
        userId
      );
      return res.status(200).json({
        status: 'success',
        data: {
          userProfile,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async toggleFollowUser(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const payload = { userId, userFollow: req.params.id };

      const toggleFollowUser = this.container.getInstance(
        ToggleFollowUser.name
      );
      const followUnfollow = await toggleFollowUser.execute(payload);
      return res.status(200).json({
        status: 'success',
        message: `user ${followUnfollow}`,
      });
    } catch (error) {
      return next(error);
    }
  }

  async putUser(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const payload = { id: userId, ...req.body };

      const editUser = this.container.getInstance(EditUser.name);

      await editUser.execute(payload);

      return res.status(200).json({
        status: 'success',
        message: 'user edited successfully',
      });
    } catch (error) {
      return next(error);
    }
  }
  async searchUsers(req: RequestAuth, res: Response): Promise<Response | void> {
    const { text } = req.query;

    const searchUsers = this.container.getInstance(SearchUsers.name);

    const users = await searchUsers.execute(text);

    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  }
}

export default UsersHandler;
