var express = require('express');
const axios = require('axios');
const gremlin = require('gremlin');
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const g = traversal().withRemote(new DriverRemoteConnection('ws://gremlinserver:9995/gremlin'));
var router = express.Router();

const GraphSearchService = require('../services/GraphSearch');

/**
 * @swagger
 * /document:
 *   post:
 *     description: Create document
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/document', function(req, res) {
  GraphSearchService.createDocument(req, res);
});

/**
 * @swagger
 * /search:
 *   post:
 *     description: Search documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/search', function(req, res) {
  GraphSearchService.searchDocuments(req, res);
});

module.exports = router;
