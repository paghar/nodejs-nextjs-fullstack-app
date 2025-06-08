import { Request, Response } from 'express';
// import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User';

// REGISTER USER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  //   return;
  // }

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password_hash });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  //   return;
  // }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Set session
    req.session.userId = user.id;
    req.session.role = user.role;

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// LOGOUT USER
export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      res.status(500).json({ message: 'Failed to logout' });
      return;
    }

    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

// GET CURRENT LOGGED-IN USER
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.session.userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const user = await User.findByPk(req.session.userId, {
      attributes: ['id', 'name', 'email', 'role'],
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
