// server/modules/auth/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../utils/prisma');
const ApiResponse = require('../../utils/apiResponse');
const { logger } = require('../../utils/logger');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return ApiResponse.error(res, 'An account with this email already exists', 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        role: 'BUYER',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTER',
        entity: 'User',
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      },
    });

    logger.info(`New user registered: ${user.email}`);

    return ApiResponse.success(res, { user, token: accessToken }, 'Registration successful', 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        artisanProfile: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });

    if (!user) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    if (!user.isActive) {
      return ApiResponse.error(res, 'Account has been deactivated', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        entity: 'User',
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      },
    });

    const { passwordHash, ...userWithoutPassword } = user;

    logger.info(`User logged in: ${user.email}`);

    return ApiResponse.success(res, {
      user: userWithoutPassword,
      token: accessToken,
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  return ApiResponse.success(res, null, 'Logged out successfully');
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        artisanProfile: true,
      },
    });

    return ApiResponse.success(res, user);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return ApiResponse.error(res, 'Refresh token required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.isActive) {
      return ApiResponse.error(res, 'Invalid refresh token', 401);
    }

    const tokens = generateTokens(user.id);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.success(res, { token: tokens.accessToken }, 'Token refreshed');
  } catch (error) {
    return ApiResponse.error(res, 'Invalid refresh token', 401);
  }
};

module.exports = { register, login, logout, getMe, refreshToken };