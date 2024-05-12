var express = require('express');
const axios = require('axios');
var router = express.Router();

const TextSearchService = require('../services/TextSearch');

//TextSearch

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
  TextSearchService.createDocuments(req, res);
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
  TextSearchService.createDocument(req, res);
});

/**
 * @swagger
 * /documentsentences:
 *   post:
 *     description: Create document sentences
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documentsentences', function(req, res) {
  TextSearchService.createDocumentSentences(req, res);
});

/**
 * @swagger
 * /documentsentence:
 *   post:
 *     description: Create document sentence
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documentsentence', function(req, res) {
  TextSearchService.createDocumentSentence(req, res);
});

/**
 * @swagger
 * /documenttriples:
 *   post:
 *     description: Create document triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documenttriples', function(req, res) {
  TextSearchService.createDocumentTriples(req, res);
});

/**
 * @swagger
 * /documenttriple:
 *   post:
 *     description: Create document triple
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documenttriple', function(req, res) {
  TextSearchService.createDocumentTriple(req, res);
});

/**
 * @swagger
 * /documentlinkedentities:
 *   post:
 *     description: Create document linked entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documentlinkedentities', function(req, res) {
  TextSearchService.createDocumentLinkedEntities(req, res);
});
  
/**
 * @swagger
 * /documentlinkedentity:
 *   post:
 *     description: Create document linked entity
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documentlinkedentity', function(req, res) {
  TextSearchService.createDocumentLinkedEntity(req, res);
});

/**
 * @swagger
 * /documentkeyphrases:
 *   post:
 *     description: Create document key phrases
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documentkeyphrases', function(req, res) {
  TextSearchService.createDocumentKeyPhrases(req, res);
});

/**
 * @swagger
 * /documentkeyphrase:
 *   post:
 *     description: Create document key phrase
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documentkeyphrase', function(req, res) {
  TextSearchService.createDocumentKeyPhrase(req, res);
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
  TextSearchService.readDocuments(req, res);
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
  TextSearchService.readDocument(req, res);
});

/**
 * @swagger
 * /documentsentences/{id}:
 *   get:
 *     description: Read document sentences
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentsentences/:id', function(req, res) {
  TextSearchService.readDocumentSentences(req, res);
});

/**
 * @swagger
 * /documentsentence/{id}:
 *   get:
 *     description: Read document sentence
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentsentence/:id', function(req, res) {
  TextSearchService.readDocumentSentence(req, res);
});

/**
 * @swagger
 * /documenttriples/{id}:
 *   get:
 *     description: Read document triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documenttriples/:id', function(req, res) {
  TextSearchService.readDocumentTriples(req, res);
});

/**
 * @swagger
 * /documenttriple/{id}:
 *   get:
 *     description: Read document triple
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documenttriple/:id', function(req, res) {
  TextSearchService.readDocumentTriple(req, res);
});

/**
 * @swagger
 * /documenttriple/{subject}/{predicate}/{object}:
 *   get:
 *     description: Find document triple
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documenttriple/:subject/:predicate/:object', function(req, res) {
  TextSearchService.findDocumentTriple(req, res);
});

/**
 * @swagger
 * /documenttriplescount/{search}:
 *   get:
 *     description: Count document triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documenttriplescount/:search', function(req, res) {
  TextSearchService.countDocumentTriples(req, res);
});

/**
 * @swagger
 * /documentlinkedentities/{id}:
 *   get:
 *     description: Read document linked entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentlinkedentities/:id', function(req, res) {
  TextSearchService.readDocumentLinkedEntities(req, res);
});

/**
 * @swagger
 * /documentaggregatedlinkedentities/{id}:
 *   get:
 *     description: Read document aggregated linked entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentaggregatedlinkedentities/:id', function(req, res) {
  TextSearchService.readDocumentAggregatedLinkedEntities(req, res);
});

/**
 * @swagger
 * /documentlinkedentity/{id}:
 *   get:
 *     description: Read document linked entity
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentlinkedentity/:id', function(req, res) {
  TextSearchService.readDocumentLinkedEntity(req, res);
});

/**
 * @swagger
 * /documentkeyphrases/{id}:
 *   get:
 *     description: Read document key phrases
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentkeyphrases/:id', function(req, res) {
  TextSearchService.readDocumentKeyPhrases(req, res);
});

/**
 * @swagger
 * /documentaggregatedkeyphrases/{id}:
 *   get:
 *     description: Read document aggregated key phrases
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentaggregatedkeyphrases/:id', function(req, res) {
  TextSearchService.readDocumentAggregatedKeyPhrases(req, res);
});

/**
 * @swagger
 * /documentkeyphrase/{id}:
 *   get:
 *     description: Read document key phrase
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentkeyphrase/:id', function(req, res) {
  TextSearchService.readDocumentKeyPhrase(req, res);
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
  TextSearchService.updateDocuments(req, res);
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
  TextSearchService.updateDocument(req, res);
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
  TextSearchService.deleteDocuments(req, res);
});

/**
 * @swagger
 * /document/:id:
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
  TextSearchService.deleteDocument(req, res);
});

/**
 * @swagger
 * /documentsentences:
 *   delete:
 *     description: Delete document sentences
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documentsentences', function(req, res) {
  TextSearchService.deleteDocumentSentences(req, res);
});

/**
 * @swagger
 * /documentsentence/:id:
 *   delete:
 *     description: Delete document sentence
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documentsentence/:id', function(req, res) {
  TextSearchService.deleteDocumentSentence(req, res);
});

/**
 * @swagger
 * /documenttriples:
 *   delete:
 *     description: Delete document triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documenttriples', function(req, res) {
  TextSearchService.deleteDocumentTriples(req, res);
});

/**
 * @swagger
 * /documenttriple/:id:
 *   delete:
 *     description: Delete document triple
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documenttriple/:id', function(req, res) {
  TextSearchService.deleteDocumentTriple(req, res);
});

/**
 * @swagger
 * /documentlinkedentities:
 *   delete:
 *     description: Delete document linked entities
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documentlinkedentities', function(req, res) {
  TextSearchService.deleteDocumentLinkedEntities(req, res);
});

/**
 * @swagger
 * /documentlinkedentity/:id:
 *   delete:
 *     description: Delete document triple
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documentlinkedentity/:id', function(req, res) {
  TextSearchService.deleteDocumentLinkedEntity(req, res);
});

/**
 * @swagger
 * /documentkeyphrases:
 *   delete:
 *     description: Delete document key phrases
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documentkeyphrases', function(req, res) {
  TextSearchService.deleteDocumentKeyPhrases(req, res);
});

/**
 * @swagger
 * /documentkeyphrase/:id:
 *   delete:
 *     description: Delete document key phrase
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/documentkeyphrase/:id', function(req, res) {
  TextSearchService.deleteDocumentKeyPhrase(req, res);
});

/**
 * @swagger
 * /search:
 *   post:
 *     description: Search documents triples
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/search', function(req, res) {
  TextSearchService.readDocumentsTriples(req, res);
});

/**
 * @swagger
 * /images:
 *   post:
 *     description: Create images
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/images', function(req, res) {
  TextSearchService.createImages(req, res);
});

/**
 * @swagger
 * /image:
 *   post:
 *     description: Create image
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/image', function(req, res) {
  TextSearchService.createImage(req, res);
});

/**
 * @swagger
 * /images:
 *   get:
 *     description: Read images
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/images', function(req, res) {
  TextSearchService.readImages(req, res);
});

/**
 * @swagger
 * /image/{id}:
 *   get:
 *     description: Read image
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/image/:id', function(req, res) {
  TextSearchService.readImage(req, res);
});

/**
 * @swagger
 * /documentimage/{fileid}:
 *   get:
 *     description: Find document image
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentimage/:fileid', function(req, res) {
  TextSearchService.findImage(req, res);
});

/**
 * @swagger
 * /images:
 *   delete:
 *     description: Delete images
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/images', function(req, res) {
  TextSearchService.deleteImages(req, res);
});

/**
 * @swagger
 * /image/:id:
 *   delete:
 *     description: Delete image
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/image/:id', function(req, res) {
  TextSearchService.deleteImage(req, res);
});

/**
 * @swagger
 * /audios:
 *   post:
 *     description: Create audios
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/audios', function(req, res) {
  TextSearchService.createAudios(req, res);
});

/**
 * @swagger
 * /audio:
 *   post:
 *     description: Create audio
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/audio', function(req, res) {
  TextSearchService.createAudio(req, res);
});

/**
 * @swagger
 * /audios:
 *   get:
 *     description: Read audios
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/audios', function(req, res) {
  TextSearchService.readAudios(req, res);
});

/**
 * @swagger
 * /audio/{id}:
 *   get:
 *     description: Read audio
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/audio/:id', function(req, res) {
  TextSearchService.readAudio(req, res);
});

/**
 * @swagger
 * /documentaudio/{fileid}:
 *   get:
 *     description: Find document audio
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/documentaudio/:fileid', function(req, res) {
  TextSearchService.findAudio(req, res);
});

/**
 * @swagger
 * /audios:
 *   delete:
 *     description: Delete audios
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/audios', function(req, res) {
  TextSearchService.deleteAudios(req, res);
});

/**
 * @swagger
 * /audio/:id:
 *   delete:
 *     description: Delete audio
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/audio/:id', function(req, res) {
  TextSearchService.deleteAudio(req, res);
});

module.exports = router;
