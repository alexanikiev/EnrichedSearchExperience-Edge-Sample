var express = require('express');
var fs = require('fs-extra');
var os = require('os');
var rp = require('request-promise');
var request = require('request');
const { v4 } = require('uuid');

const DocumentService = require('./Document');

const DocumentSearchService = require('./DocumentSearch');
const GraphSearchService = require('./GraphSearch');
const OpenInfoService = require('./OpenInfo');
const TextService = require('./Text');
const TextAnalyticsService = require('./TextAnalytics');
const TextSearchService = require('./TextSearch');

const MetaDataTransformUtil = require('../utils/MetaDataTransform');
const OpenInfoTransformUtil = require('../utils/OpenInfoTransform');
const TextAnalyticsTransformUtil = require('../utils/TextAnalyticsTransform');
const TextSplitUtil = require('../utils/TextSplit');

function crackDocuments(req, res) {
    /*
    let documentFile = req.files.documentFile;
    let documentFileName = req.body.documentFileName;
    */

    let documentFileName = req.body.documentFileName;
    const urlPath = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/storage/download/${documentFileName}`;

    const workDir = `${os.tmpdir()}/${v4()}`;
    const filePath = `${workDir}/${documentFileName}`;

    var content = '';
    var metadata = '';//authors, title, abstract, etc.
    var nlpcontent = {success: true};
    var sentences = [];//nlpcontent
    var triples = [];//nlpcontent
    var linkedentities = [];//nlpcontent
    var language = '';
    var languagecontent = '';
    var keywords = [];
    var keywordscontent = {};
    var mongocontent = '';
    var gremlinservercontent = '';
    var elasticsearchcontent = '';
    var sqlcontent = '';
    var tags = ["tag1", 'tag2'];
    var collections = ["coll1", 'coll2'];
    var chunks = []; var nlpchunks = [];
    var tokensentenceschunks = [], 
        linkedentitieschunks = [], 
        keywordschunks = [], 
        tripleschunks = [];
    const regexp = /[^\.!\?]+[\.!\?]+/g;

    var id = v4();
    var name = documentFileName;

    console.log(`[DOCUMENT] ${name}: CRACKING STARTED`);

    fs.ensureDir(workDir)
    //.then(() => documentFile.mv(filePath))
    //https://www.npmjs.com/package/request#streaming
    .then(() => new Promise((resolve, reject) => {
        request(urlPath)
          .pipe(fs.createWriteStream(filePath))
          .on('finish', resolve)
          .on('error', reject);
    }))
    .then(() => Promise.all([ TextService.extractText(filePath), 
                              TextService.extractMetadata(filePath) ]))
    .then(data => {
        content = data[0];
        content = content.replace(/<[^>]*>/g, '');//xml
        content = content.replace(/\n|\r/g, '');//new line
        content = content.trim();
        metadata = data[1];

        sentences = (content + ".").match(regexp);

        chunks = TextSplitUtil.splitSentences2Chunks(sentences, 1000);
        nlpchunks = TextSplitUtil.splitSentences2Chunks(sentences, 2000);

        //console.log(`[DOCUMENT] CONTENT: ${content}`);
        //console.log(`[DOCUMENT] METADATA: ${metadata}`);

        var metalines = metadata.split('\n');
        var metatags = [];
        for (var i = 0; i < metalines.length; i++) {
            if (metalines[i] !== '') {
                var metatag = metalines[i].split('","');
                if (metatag.length > 1) {
                    metatags.push([metatag[0].replace(/['"]+/g, ''), metatag[1].replace(/['"]+/g, '')]);
                }
            }
        }

        console.log(`[DOCUMENT] METATAGS: ${metatags}`);

        tags = tags.concat(MetaDataTransformUtil.convertMetatags2Tags(metatags));

        return OpenInfoService.extractBatchDocumentTriples(nlpchunks);
    })
    .then(data => {
        for (var i = 0; i < data.length; i++) {           
            var nlpobj = OpenInfoTransformUtil.transformResult2Object(JSON.parse(data[i]));
            tokensentenceschunks.push(nlpobj.tokensentences);
            linkedentitieschunks.push(nlpobj.linkedentities);
            tripleschunks.push(nlpobj.triples);
        }

        return TextAnalyticsService.extractBatchDocumentKeyPhrases(chunks);
    })
    .then(data => {
        for (var i = 0; i < data.length; i++) {
            var keywordsobj = TextAnalyticsTransformUtil.transformResult2Object(JSON.parse(data[i]));
            keywordschunks.push(keywordsobj.keywords);
        }

        return TextAnalyticsService.extractDocumentLanguages(chunks[0]);
    })
    .then(data => {
        var langval = TextAnalyticsTransformUtil.transformResult2Value(JSON.parse(data));
        console.log(`[DOCUMENT] ${name}: LANGUAGE ${langval}`);
        return Promise.all([ DocumentService.createDocument(id, name, content.substring(0, 250), collections, tags),
                             DocumentSearchService.createDocument(id, name, content.substring(0, 250), content, collections, tags),
                             GraphSearchService.createDocument(id, name, content.substring(0, 250), collections, tags),
                             TextSearchService.createDocument(id, name, content.substring(0, 250), collections, tags) ]);
    })
    .then(data => {
        return Promise.all([ TextSearchService.createBatchDocumentSentences(id, tokensentenceschunks),
                             TextSearchService.createBatchDocumentLinkedEntities(id, linkedentitieschunks),
                             TextSearchService.createBatchDocumentKeyPhrases(id, keywordschunks),
                             TextSearchService.createBatchDocumentTriples(id, tripleschunks) ]);
    })
    .then(data => {
        console.log(`[DOCUMENT] ${name}: CRACKING FINISHED`);
        res.send(true);
    })
    .catch(error => res.status(500).send(error))
    .finally(() => fs.remove(workDir));
}

module.exports = {
    crackDocuments
};