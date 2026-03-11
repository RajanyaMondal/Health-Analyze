const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

router.get('/nearby', clinicController.getNearbyClinics);

module.exports = router;
