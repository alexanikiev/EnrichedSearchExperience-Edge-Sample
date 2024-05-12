var express = require('express');
var router = express.Router();

const SyncService = require('../services/Sync');

//Synchronization pipeline

/**
 * @swagger
 * /documents:
 *   post:
 *     description: Synchronize documents
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
    SyncService.syncDocuments(req, res);
});

/**
 * @swagger
 * /entities:
 *   post:
 *     description: Synchronize entities
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
    SyncService.syncEntities(req, res);
});

/**
 * @swagger
 * /topics:
 *   post:
 *     description: Synchronize topics
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
    SyncService.syncTopics(req, res);
});

/**
 * @swagger
 * /insights:
 *   post:
 *     description: Synchronize insights
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
    SyncService.syncInsights(req, res);
});

/**
 * @swagger
 * /collections:
 *   post:
 *     description: Synchronize collections
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
    SyncService.syncCollections(req, res);
});

/**
 * @swagger
 * /hierarchies:
 *   post:
 *     description: Synchronize hierarchies
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
    SyncService.syncHierarchies(req, res);
});

/**
 * @swagger
 * /users:
 *   post:
 *     description: Synchronize users
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
    SyncService.syncUsers(req, res);
});

module.exports = router; 