var express = require('express');
const axios = require('axios');
var rp = require('request-promise');
var router = express.Router();

const TextAnalyticsService = require('../services/TextAnalytics');

//TextAnalytics

/**
 * @swagger
 * /languages:
 *   post:
 *     description: Extract languages
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/languages', function(req, res) {
  TextAnalyticsService.extractLanguages(req, res);
});

module.exports = router;