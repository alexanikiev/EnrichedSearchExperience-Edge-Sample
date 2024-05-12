var express = require('express');
const axios = require('axios');
var rp = require('request-promise');
var router = express.Router();

const TextAnalyticsService = require('../services/TextAnalytics');

//TextAnalytics

/**
 * @swagger
 * /keyphrases:
 *   post:
 *     description: Extract key phrases
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/keyphrases', function(req, res) {
  TextAnalyticsService.extractKeyPhrases(req, res);
});

module.exports = router;