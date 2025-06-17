
const {
  registerUser,
  loginUser,
  getUserFromToken,
  setTokenCookie,
  clearTokenCookie,
} = require('../../services/authService');

// Import dependencies that will be mocked
const usersRepository = require('../../repositories/usersRepository');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const { getCookieOptions } = require('../../utils/cookieUtil');

// --- MOCKING SETUP ---
// Jest will automatically use the manual mock for the repository
jest.mock('../../repositories/usersRepository');

// Mock other dependencies
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../utils/cookieUtil'); // Mock cookie utils to control options

// --- TEST SUITE ---
describe('Auth Service', () => {

  // Runs once before all tests
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  // Runs before each individual test to ensure a clean slate
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Tests for registerUser ---
  describe('registerUser', () => {
    // (Your existing, passing tests for registerUser go here. No changes needed.)
    it('should register a new user successfully when username is available and passwords match', async () => {
      const username = 'newUser';
      const password = 'password123';
      const mockNewUser = { user_id: 1, username: 'newUser' };
      usersRepository.findUserByUsername.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed_password');
      usersRepository.createUser.mockResolvedValue(mockNewUser);
      jwt.sign.mockReturnValue('fake_jwt_token');

      const result = await registerUser(username, password, password);

      expect(usersRepository.findUserByUsername).toHaveBeenCalledWith(username);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(usersRepository.createUser).toHaveBeenCalledWith(username, 'hashed_password');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockNewUser.user_id }, 'test-secret', { expiresIn: '1h' });
      expect(result.user).toEqual(mockNewUser);
      expect(result.token).toBe('fake_jwt_token');
    });

    it('should throw an error if the username is already taken', async () => {
      const username = 'existingUser';
      usersRepository.findUserByUsername.mockResolvedValue({ user_id: 2, username });
      await expect(registerUser(username, 'pw', 'pw')).rejects.toThrow('Username already taken');
      expect(usersRepository.createUser).not.toHaveBeenCalled();
    });

    it('should throw an error if passwords do not match', async () => {
      await expect(registerUser('anyUser', 'pass1', 'pass2')).rejects.toThrow('Passwords do not match');
      expect(usersRepository.findUserByUsername).not.toHaveBeenCalled();
    });
  });

  // --- Tests for loginUser ---
  describe('loginUser', () => {
    const mockUser = {
      user_id: 1,
      username: 'testuser',
      password_hash: 'hashed_password_from_db'
    };

    it('should login a user and return a token on valid credentials', async () => {
      // Arrange
      usersRepository.findUserByUsername.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); // Password is correct
      jwt.sign.mockReturnValue('fake_jwt_token');

      // Act
      const result = await loginUser('testuser', 'password123');

      // Assert
      expect(usersRepository.findUserByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password_hash);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.user_id }, 'test-secret', { expiresIn: '1h' });
      expect(result.user).toEqual(mockUser);
      expect(result.token).toBe('fake_jwt_token');
    });

    it('should throw an error if the user is not found', async () => {
      // Arrange
      usersRepository.findUserByUsername.mockResolvedValue(null); // No user found

      // Act & Assert
      await expect(loginUser('nouser', 'password123')).rejects.toThrow('Invalid username or password');
      expect(bcrypt.compare).not.toHaveBeenCalled(); // Should not attempt to compare password
    });

    it('should throw an error on an incorrect password', async () => {
      // Arrange
      usersRepository.findUserByUsername.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); // Password is incorrect

      // Act & Assert
      await expect(loginUser('testuser', 'wrongpassword')).rejects.toThrow('Invalid username or password');
      expect(jwt.sign).not.toHaveBeenCalled(); // Should not generate a token
    });
  });

  // --- Tests for getUserFromToken ---
  describe('getUserFromToken', () => {
    it('should return user data for a valid token', async () => {
      // Arrange
      const mockPayload = { userId: 42 };
      const mockUserFromDb = { user_id: 42, username: 'tokenuser', role: 'user' };
      jwt.verify.mockReturnValue(mockPayload);
      usersRepository.findUserById.mockResolvedValue(mockUserFromDb);

      // Act
      const user = await getUserFromToken('valid.token.string');

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('valid.token.string', 'test-secret');
      expect(usersRepository.findUserById).toHaveBeenCalledWith(mockPayload.userId);
      expect(user).toEqual({ id: 42, username: 'tokenuser', role: 'user' });
    });

    it('should throw an error if jwt.verify fails', async () => {
      // Arrange
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      // Act & Assert
      await expect(getUserFromToken('invalid.token')).rejects.toThrow('Invalid signature');
      expect(usersRepository.findUserById).not.toHaveBeenCalled();
    });


    it('should throw an error if user from token payload is not found in db', async () => {
      // Arrange
      jwt.verify.mockReturnValue({ userId: 999 });
      usersRepository.findUserById.mockResolvedValue(null); // User not found

      // Act & Assert
      await expect(getUserFromToken('valid.token.for.nonexistent.user')).rejects.toThrow('User not found');
    });
  });

  // --- Tests for Cookie Helpers ---
  describe('Cookie Helpers', () => {
    let mockRes;
    const mockCookieOptions = { httpOnly: true, secure: true, sameSite: 'lax' };

    beforeEach(() => {
      // Create a fake Express response object with a mock `cookie` function
      mockRes = {
        cookie: jest.fn(),
      };
      // Make our mocked getCookieOptions return a consistent value for testing
      getCookieOptions.mockReturnValue(mockCookieOptions);
    });

    it('setTokenCookie should call res.cookie with correct parameters', () => {
      // Act
      setTokenCookie(mockRes, 'my-test-token');

      // Assert
      expect(mockRes.cookie).toHaveBeenCalledTimes(1);
      expect(mockRes.cookie).toHaveBeenCalledWith('token', 'my-test-token', mockCookieOptions);
    });

    it('clearTokenCookie should call res.cookie to clear both tokens', () => {
      // Act
      clearTokenCookie(mockRes);

      // Assert
      const expiredOptions = { ...mockCookieOptions, maxAge: 0 };
      expect(mockRes.cookie).toHaveBeenCalledTimes(2);
      expect(mockRes.cookie).toHaveBeenCalledWith('token', '', expiredOptions);
      expect(mockRes.cookie).toHaveBeenCalledWith('csrf-token', '', expiredOptions);
    });
  });
});