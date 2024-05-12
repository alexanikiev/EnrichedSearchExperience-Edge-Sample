var express = require('express');
const axios = require('axios');
var rp = require('request-promise');
var router = express.Router();

const CustomVisionService = require('../services/CustomVision');

//CustomVision

/**
 * @swagger
 * /objects:
 *   post:
 *     description: Detect custom objects
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/objects', function(req, res) {
    CustomVisionService.detectObjects(req, res);
});

module.exports = router;