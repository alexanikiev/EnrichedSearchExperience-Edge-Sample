var express = require('express');
const axios = require('axios');
const gremlin = require('gremlin');
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const g = traversal().withRemote(new DriverRemoteConnection('ws://gremlinserver:9995/gremlin'));
var router = express.Router();

function createDocument(req, res) {
  const { id, name, description, tags, collections } = req.body;
  g.addV('document').property('name', name).property('description', description).property(gremlin.process.cardinality.list, 'tags', 'tag1').property(gremlin.process.cardinality.list, 'tags', 'tag2').property(gremlin.process.cardinality.list,'collections','coll1').property(gremlin.process.cardinality.list,'collections','coll2').toList()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function searchDocuments(req, res) {
  const { search, tags, collections } = req.body;
  g.V().hasLabel('document').values('description').toList()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createDocument,
    searchDocuments
};