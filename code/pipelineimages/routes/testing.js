var express = require('express');
var fs = require('fs-extra');
var os = require('os');
var rp = require('request-promise');
const { v4 } = require('uuid');
var router = express.Router();

const TestService = require('../services/Test');

//Testing pipeline

/**
 * @swagger
 * /images:
 *   post:
 *     description: Test images
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/images', function(req, res) {
    //let imageFile = req.files.imageFile;
    TestService.testImages(req, res);
});

module.exports = router;