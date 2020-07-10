const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', async (req, res) => {
	items = await Item.find().sort({ date: -1 });
	res.json(items);
});

// @route POST api/items
// @desc Create An Item
// @access Private
router.post('/', auth, async (req, res) => {
	const newItem = new Item({
		name : req.body.name
	});

	item = await newItem.save();
	res.json(item);
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Private
router.delete('/:id', auth, async (req, res) => {
	try {
		await Item.findById(req.params.id).deleteOne();
	} catch (err) {
		res.status(404).json({ success: false });
	}
	res.json({ success: true });
});

module.exports = router;
