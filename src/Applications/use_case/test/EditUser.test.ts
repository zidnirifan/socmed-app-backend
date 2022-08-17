import UserEdit from '../../../Domains/users/entities/UserEdit';
import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';
import EditUser from '../EditUser';

describe('EditUser use case', () => {
  it('should orchestrating the add user action correctly', async () => {
    const id = 'user-123';
    const useCasePayload = {
      id,
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      bio: 'engineer',
    };

    const mockUserRepository = new MockUserRepository();
    const mockValidator = new MockValidator();

    mockUserRepository.editUser = jest.fn(() => Promise.resolve());
    mockUserRepository.isUserExistById = jest.fn(() => Promise.resolve());
    mockUserRepository.getUsernameById = jest.fn(() =>
      Promise.resolve(useCasePayload.username)
    );
    mockUserRepository.verifyAvailableUsername = jest.fn(() =>
      Promise.resolve()
    );
    mockValidator.validate = jest.fn(() => {});

    const editUserUseCase = new EditUser({
      userRepository: mockUserRepository,
      validator: mockValidator,
    });

    await editUserUseCase.execute(useCasePayload);

    expect(mockValidator.validate).toBeCalledWith(useCasePayload);
    expect(mockUserRepository.isUserExistById).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockUserRepository.getUsernameById).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockUserRepository.verifyAvailableUsername).not.toBeCalled();
    expect(mockUserRepository.editUser).toBeCalledWith(
      new UserEdit(useCasePayload)
    );
  });

  it('should call verifyAvailableUsername when oldUsername not same with username', async () => {
    const id = 'user-123';
    const useCasePayload = {
      id,
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      bio: 'engineer',
    };

    const mockUserRepository = new MockUserRepository();
    const mockValidator = new MockValidator();

    mockUserRepository.editUser = jest.fn(() => Promise.resolve());
    mockUserRepository.isUserExistById = jest.fn(() => Promise.resolve());
    mockUserRepository.getUsernameById = jest.fn(() =>
      Promise.resolve('oldUsername')
    );
    mockUserRepository.verifyAvailableUsername = jest.fn(() =>
      Promise.resolve()
    );
    mockValidator.validate = jest.fn(() => {});

    const editUserUseCase = new EditUser({
      userRepository: mockUserRepository,
      validator: mockValidator,
    });

    await editUserUseCase.execute(useCasePayload);

    expect(mockValidator.validate).toBeCalledWith(useCasePayload);
    expect(mockUserRepository.isUserExistById).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockUserRepository.getUsernameById).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(
      useCasePayload.username
    );
    expect(mockUserRepository.editUser).toBeCalledWith(
      new UserEdit(useCasePayload)
    );
  });
});
