var express = require('express');
var fs = require('fs-extra');
var os = require('os');
var rp = require('request-promise');
const { v4 } = require('uuid');
var router = express.Router();

const CrackService = require('../services/Crack');

//Cracking pipeline

/**
 * @swagger
 * /audios:
 *   post:
 *     description: Crack audios
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/audios', function(req, res) {
  CrackService.crackAudios(req, res);
});

module.exports = router;