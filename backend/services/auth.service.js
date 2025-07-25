const conn = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

async function signup({ name, email, phone, password,role}) {
  try {
    if (!email && !phone) {
      return { status: 400, message: 'Email or phone is required' };
    }

    // Check if user exists
    const existing = await conn.query(
      'SELECT * FROM user WHERE email = ? OR phone = ?',
      [email || null, phone || null]
    );

    if (existing.length > 0) {
      return { status: 400, message: 'User already exists' };
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user
    const result = await conn.query(
      'INSERT INTO user (fullname, email, phone, password,role) VALUES (?, ?, ?, ?, ?)',
      [name, email || null, phone || null, hashed,role]
    );

    const insertedId = result.insertId;

    // Generate token
    const token = jwt.sign(
  { id: insertedId, email, phone, role: role }, // Default role is user
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN }
);


    // Fetch the newly created user (to return details)
    const rows = await conn.query('SELECT id, fullname, email, phone, role FROM user WHERE id = ?', [insertedId]);
    const newUser = rows[0];

    return {
      status: 201,
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    };
  } catch (err) {
    console.error('Signup error:', err);
    return { status: 500, message: 'Internal server error' };
  }
}

async function login({ identifier, password }) {
  try {
    const users = await conn.query(
      'SELECT * FROM user WHERE email = ? OR phone = ?',
      [identifier, identifier]
    );

    if (users.length === 0) {
      return { status: 401, message: 'Invalid credentials' };
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { status: 401, message: 'Invalid credentials' };
    }

    await conn.query(`UPDATE user SET last_login = NOW() WHERE id = ?`, [user.id]);

    const token = jwt.sign(
  { id: user.id, email: user.email, phone: user.phone, role: user.role },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN }
);


    return {
      status: 200,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  } catch (err) {
    console.error('Login error:', err);
    return { status: 500, message: 'Internal server error' };
  }
}


module.exports = { signup, login };

// module.exports = { signup, login };
