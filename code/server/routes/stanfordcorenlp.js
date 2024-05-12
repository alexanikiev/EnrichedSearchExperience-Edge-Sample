var express = require('express');
const axios = require('axios');
var rp = require('request-promise');
var router = express.Router();

const OpenInfoService = require('../services/OpenInfo');

//OpenInfo

/**
 * @swagger
 * /triples:
 *   post:
 *     description: Extract triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/triples', function(req, res) {
  OpenInfoService.extractTriples(req, res);
});

module.exports = router;
