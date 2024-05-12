var express = require('express');
var axios = require('axios');
var fs = require('fs-extra');
var os = require('os');
var FormData = require('form-data');
var rp = require('request-promise');
var router = express.Router();

const SttService = require('../services/Stt');

//Stt

/**
 * @swagger
 * /text:
 *   post:
 *     description: Extract text
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/text', function(req, res) {
  SttService.extractText(req, res);
});

/**
 * @swagger
 * /metadata:
 *   post:
 *     description: Extract metadata
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/metadata', function(req, res) {
  SttService.extractMetadata(req, res);
});

module.exports = router;
