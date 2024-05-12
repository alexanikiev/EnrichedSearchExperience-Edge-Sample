var express = require('express');
const axios = require('axios');
var router = express.Router();

const DocumentService = require('../services/Document');
const EntityService = require('../services/Entity');
const TopicService = require('../services/Topic');
const InsightService = require('../services/Insight');
const CollectionService = require('../services/Collection');
const HierarchyService = require('../services/Hierarchy');
const UserService = require('../services/User');

require('../utils/Mongo').connect();

//Documents

/**
 * @swagger
 * /documents:
 *   post:
 *     description: Create documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documents', function(req, res) {
  DocumentService.createDocuments(req, res);
});

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
  DocumentService.createDocument(req, res);
});

/**
 * @swagger
 * /documents:
 *   get:
 *     description: Read documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documents', function(req, res) {
  DocumentService.readDocuments(req, res);
});

/**
 * @swagger
 * /document/{id}:
 *   get:
 *     description: Read document
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/document/:id', function(req, res) {
  DocumentService.readDocument(req, res);
});

/**
 * @swagger
 * /documents:
 *   put:
 *     description: Update documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/documents', function(req, res) {
  DocumentService.updateDocuments(req, res);
});

/**
 * @swagger
 * /document:
 *   put:
 *     description: Update document
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/document', function(req, res) {
  DocumentService.updateDocument(req, res);
});

/**
 * @swagger
 * /documents:
 *   delete:
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
  DocumentService.deleteDocuments(req, res);
});

/**
 * @swagger
 * /document/{id}:
 *   delete:
 *     description: Delete document
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/document/:id', function(req, res) {
  DocumentService.deleteDocument(req, res);
});

//Entities

/**
 * @swagger
 * /entities:
 *   post:
 *     description: Create entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/entities', function(req, res) {
  EntityService.createEntities(req, res);
});

/**
 * @swagger
 * /entity:
 *   post:
 *     description: Create entity
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/entity', function(req, res) {
  EntityService.createEntity(req, res);
});

/**
 * @swagger
 * /entities:
 *   get:
 *     description: Read entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/entities', function(req, res) {
  EntityService.readEntities(req, res);
});

/**
 * @swagger
 * /entity/{id}:
 *   get:
 *     description: Read entity
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/entity/:id', function(req, res) {
  EntityService.readEntity(req, res);
});

/**
 * @swagger
 * /entities:
 *   put:
 *     description: Update entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/entities', function(req, res) {
  EntityService.updateEntities(req, res);
});

/**
 * @swagger
 * /entity:
 *   put:
 *     description: Update entity
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/entity', function(req, res) {
  EntityService.updateEntity(req, res);
});

/**
 * @swagger
 * /entities:
 *   delete:
 *     description: Delete entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/entities', function(req, res) {
  EntityService.deleteEntities(req, res);
});

/**
 * @swagger
 * /entity/{id}:
 *   delete:
 *     description: Delete entity
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/entity/:id', function(req, res) {
  EntityService.deleteEntity(req, res);
});

//Topics

/**
 * @swagger
 * /topics:
 *   post:
 *     description: Create topics
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/topics', function(req, res) {
  TopicService.createTopics(req, res);
});

/**
 * @swagger
 * /topic:
 *   post:
 *     description: Create topic
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/topic', function(req, res) {
  TopicService.createTopic(req, res);
});

/**
 * @swagger
 * /topics:
 *   get:
 *     description: Read topics
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/topics', function(req, res) {
  TopicService.readTopics(req, res);
});

/**
 * @swagger
 * /topic/{id}:
 *   get:
 *     description: Read topic
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/topic/:id', function(req, res) {
  TopicService.readTopic(req, res);
});

/**
 * @swagger
 * /topics:
 *   put:
 *     description: Update topics
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/topics', function(req, res) {
  TopicService.updateTopics(req, res);
});

/**
 * @swagger
 * /topic:
 *   put:
 *     description: Update topic
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/topic', function(req, res) {
  TopicService.updateTopic(req, res);
});

/**
 * @swagger
 * /topics:
 *   delete:
 *     description: Delete topics
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/topics', function(req, res) {
  TopicService.deleteTopics(req, res);
});

/**
 * @swagger
 * /topic/{id}:
 *   delete:
 *     description: Delete topic
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/topic/:id', function(req, res) {
  TopicService.deleteTopic(req, res);
});

//Insights

/**
 * @swagger
 * /insights:
 *   post:
 *     description: Create insights
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/insights', function(req, res) {
  InsightService.createInsights(req, res);
});

/**
 * @swagger
 * /insight:
 *   post:
 *     description: Create insight
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/insight', function(req, res) {
  InsightService.createInsight(req, res);
});

/**
 * @swagger
 * /insights:
 *   get:
 *     description: Read insights
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/insights', function(req, res) {
  InsightService.readInsights(req, res);
});

/**
 * @swagger
 * /insight/{id}:
 *   get:
 *     description: Read insight
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/insight/:id', function(req, res) {
  InsightService.readInsight(req, res);
});

/**
 * @swagger
 * /insights:
 *   put:
 *     description: Update insights
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/insights', function(req, res) {
  InsightService.updateInsights(req, res);
});

/**
 * @swagger
 * /insight:
 *   put:
 *     description: Update insight
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/insight', function(req, res) {
  InsightService.updateInsight(req, res);
});

/**
 * @swagger
 * /insights:
 *   delete:
 *     description: Delete insights
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/insights', function(req, res) {
  InsightService.deleteInsights(req, res);
});

/**
 * @swagger
 * /insight/{id}:
 *   delete:
 *     description: Delete insight
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/insight/:id', function(req, res) {
  InsightService.deleteInsight(req, res);
});

//Collections

/**
 * @swagger
 * /collections:
 *   post:
 *     description: Create collections
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/collections', function(req, res) {
  CollectionService.createCollections(req, res);
});

/**
 * @swagger
 * /collection:
 *   post:
 *     description: Create collection
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/collection', function(req, res) {
  CollectionService.createCollection(req, res);
});

/**
 * @swagger
 * /collections:
 *   get:
 *     description: Read collections
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/collections', function(req, res) {
  CollectionService.readCollections(req, res);
});

/**
 * @swagger
 * /collection/{id}:
 *   get:
 *     description: Read collection
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/collection/:id', function(req, res) {
  CollectionService.readCollection(req, res);
});

/**
 * @swagger
 * /collections:
 *   put:
 *     description: Update collections
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/collections', function(req, res) {
  CollectionService.updateCollections(req, res);
});

/**
 * @swagger
 * /collection:
 *   put:
 *     description: Update collection
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/collection', function(req, res) {
  CollectionService.updateCollection(req, res);
});

/**
 * @swagger
 * /collections:
 *   delete:
 *     description: Delete collections
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/collections', function(req, res) {
  CollectionService.deleteCollections(req, res);
});

/**
 * @swagger
 * /collection/{id}:
 *   delete:
 *     description: Delete collection
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/collection/:id', function(req, res) {
  CollectionService.deleteCollection(req, res);
});

//Hierarchies

/**
 * @swagger
 * /hierarchies:
 *   post:
 *     description: Create hierarchies
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/hierarchies', function(req, res) {
  HierarchyService.createHierarchies(req, res);
});

/**
 * @swagger
 * /hierarchy:
 *   post:
 *     description: Create hierarchy
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/hierarchy', function(req, res) {
  HierarchyService.createHierarchy(req, res);
});

/**
 * @swagger
 * /hierarchies:
 *   get:
 *     description: Read hierarchies
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/hierarchies', function(req, res) {
  HierarchyService.readHierarchies(req, res);
});

/**
 * @swagger
 * /hierarchy/{id}:
 *   get:
 *     description: Read hierarchy
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/hierarchy/:id', function(req, res) {
  HierarchyService.readHierarchy(req, res);
});

/**
 * @swagger
 * /hierarchies:
 *   put:
 *     description: Update hierarchies
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/hierarchies', function(req, res) {
  HierarchyService.updateHierarchies(req, res);
});

/**
 * @swagger
 * /hierarchy:
 *   put:
 *     description: Update hierarchy
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/hierarchy', function(req, res) {
  HierarchyService.updateHierarchy(req, res);
});

/**
 * @swagger
 * /hierarchies:
 *   delete:
 *     description: Delete hierarchies
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/hierarchies', function(req, res) {
  HierarchyService.deleteHierarchies(req, res);
});

/**
 * @swagger
 * /hierarchy/{id}:
 *   delete:
 *     description: Delete hierarchy
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/hierarchy/:id', function(req, res) {
  HierarchyService.deleteHierarchy(req, res);
});

//Users

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create users
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/users', function(req, res) {
  UserService.createUsers(req, res);
});

/**
 * @swagger
 * /user:
 *   post:
 *     description: Create user
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/user', function(req, res) {
  UserService.createUser(req, res);
});

/**
 * @swagger
 * /users:
 *   get:
 *     description: Read users
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/users', function(req, res) {
  UserService.readUsers(req, res);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     description: Read user
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:id', function(req, res) {
  UserService.readUser(req, res);
});

/**
 * @swagger
 * /users:
 *   put:
 *     description: Update users
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/users', function(req, res) {
  UserService.updateUsers(req, res);
});

/**
 * @swagger
 * /user:
 *   put:
 *     description: Update user
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/user', function(req, res) {
  UserService.updateUser(req, res);
});

/**
 * @swagger
 * /users:
 *   delete:
 *     description: Delete users
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/users', function(req, res) {
  UserService.deleteUsers(req, res);
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     description: Delete user
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/user/:id', function(req, res) {
  UserService.deleteUser(req, res);
});

module.exports = router;
