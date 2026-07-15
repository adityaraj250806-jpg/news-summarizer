const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' })
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({
      message: 'Account created successfully.',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    res.json({
      message: 'Login successful.',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message })
  }
}

module.exports = { register, login }
