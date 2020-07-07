const express = require('express');
const router = express.Router();

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
// @access Public
router.post('/', async (req, res) => {
	const newItem = new Item({
		name : req.body.name
	});

	item = await newItem.save();
	res.json(item);
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', async (req, res) => {
	try {
		await (await Item.findById(req.params.id)).deleteOne();
		res.json({ success: true });
	} catch (err) {
		res.status(404).json({ success: false });
	}
});

module.exports = router;
