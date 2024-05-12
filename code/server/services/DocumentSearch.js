var express = require('express');
const axios = require('axios');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://elasticsearch:9997' });
var router = express.Router();

async function createDocument(req, res) {
  try {
    const { id, name, description, content, tags, collections } = req.body;
    let data = await client.index({
        index: 'ese',
        body: {
          id: id,
          name: name,
          content: content,
          tags: tags,
          collections: collections
        }
    });
    res.send(data);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

//https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
async function searchDocuments(req, res) {
  try {
    const { search, tags, collections } = req.body;
    let data = await client.search({
        index: 'ese',
        //from: 20,
        size: 1000,
        body: {
          query: {
            bool: {
              must: {
                match: { 
                  content: search 
                }
              },
              filter: {
                bool: {
                  must: [
                    { 
                      terms: { 
                        collections : collections 
                      }
                    },
                    { 
                      terms: { 
                        tags: tags 
                      }
                    }
                  ]
                }
              }
            }
          },
          highlight: {
            fields: {
              content: {
                type: 'plain',
                fragment_size: 25,
                number_of_fragments: 5,
                fragmenter: 'simple'
              }
            }
          }
        }
    });
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocuments(req, res) {
  try {
    let data = await client.indices.delete({
        index: 'ese'
    });
    res.send(data);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    createDocument,
    searchDocuments,
    deleteDocuments
};