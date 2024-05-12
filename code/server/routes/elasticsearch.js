var express = require('express');
const axios = require('axios');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://elasticsearch:9997' });
var router = express.Router();

const DocumentSearchService = require('../services/DocumentSearch');

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
  DocumentSearchService.createDocument(req, res);
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
  DocumentSearchService.searchDocuments(req, res);
});

/**
 * @swagger
 * /documents:
 *   post:
 *     description: Delete documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documents', function(req, res) {
  DocumentSearchService.deleteDocuments(req, res);
});

module.exports = router;
