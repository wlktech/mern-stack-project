const express = require('express');
const router = express.Router();
const ReceipeController = require("../controllers/ReceipeController");
const { body } = require('express-validator');
const handleErrorMsg = require('../middlewares/handleErrorMsg');
const upload = require("../helpers/upload")


router.get('', ReceipeController.index);

router.post('', [
    body('title').notEmpty().withMessage("Title is required"),
    body('description').notEmpty().withMessage("Description is required"),
    body('ingredients').notEmpty().isArray({ min: 2 }),
], handleErrorMsg, ReceipeController.store);

router.get('/:id', ReceipeController.show);
router.put('/:id', ReceipeController.update);
router.delete('/:id', ReceipeController.destroy);
router.post('/:id/upload',upload.single('photo'), ReceipeController.upload);

module.exports = router;