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
 * /documents:
 *   post:
 *     description: Test documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documents', function(req, res) {
    //let documentFile = req.files.documentFile;
    TestService.testDocuments(req, res);
});

/**
 * @swagger
 * /entities:
 *   post:
 *     description: Test entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/entities', function(req, res) {
    //let entityFile = req.files.entityFile;
    TestService.testEntities(req, res);
});

/**
 * @swagger
 * /topics:
 *   post:
 *     description: Test topics
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/topics', function(req, res) {
    //let topicFile = req.files.topicFile;
    TestService.testTopics(req, res);
});

/**
 * @swagger
 * /insights:
 *   post:
 *     description: Test insights
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/insights', function(req, res) {
    //let insightFile = req.files.insightFile;
    TestService.testInsights(req, res);
});

/**
 * @swagger
 * /collections:
 *   post:
 *     description: Test collections
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/collections', function(req, res) {
    //let collectionFile = req.files.collectionFile;
    TestService.testCollections(req, res);
});

/**
 * @swagger
 * /hierarchies:
 *   post:
 *     description: Test hierarchies
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/hierarchies', function(req, res) {
    //let hierarchyFile = req.files.hierarchyFile;
    TestService.testHierarchies(req, res);
});

/**
 * @swagger
 * /users:
 *   post:
 *     description: Test users
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/users', function(req, res) {
    //let userFile = req.files.userFile;
    TestService.testUsers(req, res);
});

module.exports = router;