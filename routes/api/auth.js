const express = require('express');
const router = express.Router();
const bcrypyt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route GET api/auth
// @desc Auth user
// @access Public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ msg: 'User does not exist' });
	}

	// Validate password
	const isMatch = await bcrypyt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({ msg: 'Invalid credentials' });
	}

	jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, async (err, token) => {
		try {
			res.json({
				token,
				user  : {
					id    : user.id,
					name  : user.name,
					email : user.email
				}
			});
		} catch (err) {
			throw err;
		}
	});
});

// @route GET api/auth/user
// @desc Get user data
// @access Public
router.get('/user', auth, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password');
	res.json(user);
});

module.exports = router;
