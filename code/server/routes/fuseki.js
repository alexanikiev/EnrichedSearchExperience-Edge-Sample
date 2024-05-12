var express = require('express');
var axios = require('axios');
var fs = require('fs-extra');
var os = require('os');
var FormData = require('form-data');
var rp = require('request-promise');
var router = express.Router();

const SparkleService = require('../services/Sparkle');

//Sparkle

/**
 * @swagger
 * /search:
 *   post:
 *     description: Search triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/search', function(req, res) {
  SparkleService.queryTriples(req, res);
});

/**
 * @swagger
 * /triples:
 *   post:
 *     description: Create triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/triples', function(req, res) {
    SparkleService.createTriples(req, res);
});

/**
 * @swagger
 * /triples:
 *   put:
 *     description: Update (create) triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/triples', function(req, res) {
  SparkleService.updateTriples(req, res);
});

/**
 * @swagger
 * /search:
 *   post:
 *     description: Search triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/search', function(req, res) {
  SparkleService.queryTriples(req, res);
});

/**
 * @swagger
 * /demo:
 *   post:
 *     description: Demo data
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/demo', function(req, res) {
  SparkleService.updateTriples(req, res);
});

/**
 * @swagger
 * /triplescount/{search}:
 *   get:
 *     description: Count triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/triplescount/:search', function(req, res) {
  SparkleService.countTriples(req, res);
});

/**
 * @swagger
 * /triples:
 *   delete:
 *     description: Delete triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/triples', function(req, res) {
  SparkleService.deleteTriples(req, res);
});

/**
 * @swagger
 * /searchpost:
 *   post:
 *     description: Search triples (POST)
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/searchpost', function(req, res) {
  SparkleService.queryTriplesPOST(req, res);
});

/**
 * @swagger
 * /triplescountpost:
 *   post:
 *     description: Count triples (POST)
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/triplescountpost', function(req, res) {
  SparkleService.countTriplesPOST(req, res);
});

module.exports = router;
