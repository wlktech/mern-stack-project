const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const { body } = require('express-validator');
const handleErrorMsg = require('../middlewares/handleErrorMsg');


router.get('', UserController.index);

router.post('', [
    body('title').notEmpty().withMessage("Title is required"),
    body('description').notEmpty().withMessage("Description is required"),
    body('ingredients').notEmpty().isArray({ min: 2 }),
], handleErrorMsg, UserController.store);

router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;