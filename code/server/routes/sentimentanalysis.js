var express = require('express');
const axios = require('axios');
var rp = require('request-promise');
var router = express.Router();

const TextAnalyticsService = require('../services/TextAnalytics');

//TextAnalytics

/**
 * @swagger
 * /sentiments:
 *   post:
 *     description: Extract sentiments
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/sentiments', function(req, res) {
  TextAnalyticsService.extractSentiments(req, res);
});

module.exports = router;