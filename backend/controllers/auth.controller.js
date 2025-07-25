const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone, password,role } = req.body;
  const normalizedPhone = phone ? (phone.startsWith('+1') ? phone : `+1${phone}`) : null;

  const result = await authService.signup({ name, email, phone: normalizedPhone, password,role });

  const success = result.status === 201;

  res.status(result.status).json({
    success,
    message: result.message,
    token: result.token || null,
    user: result.user || null
  });
}


async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { identifier, password } = req.body;
  let email = null;
  let phone = null;

  // Detect if identifier is email or phone
  if (identifier.includes('@')) {
    email = identifier;
  } else {
    phone = identifier.startsWith('+1') ? identifier : `+1${identifier}`;
  }

  const result = await authService.login({identifier, password });
  const success = result.status === 200;
  if (result.status === 200) {
    res.status(200).json({
      success,
      message: result.message,
      token: result.token,
      user: {
        id: result.user.id,
        fullname: result.user.fullname,
        email: result.user.email,
        phone: result.user.phone,
        role: result.user.role,
      },
    });
  } else {
    res.status(result.status).json({ message: result.message });
  }
}

module.exports = { signup, login };
