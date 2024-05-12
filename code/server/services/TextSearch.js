const sql = require('mssql');

async function createDocuments(req, res) {
  try {
    const { documents } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('Documents');
    table.create = false;
    table.columns.add('DocumentID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('Data', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('MetaData', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    documents.map(document => {
        table.rows.add('test2', 'test2', '', '', 'test2');
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocument(req, res) {
  try {
    const { documentid, name, description, tags, collections, metadata } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`INSERT INTO Documents (DocumentID, FileID, Data, MetaData, SearchID) VALUES ('${documentid}', '${name}', '${JSON.stringify({ tags: tags, collections: collections })}', '${metadata}', '${documentid}')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentSentences(req, res) {
  try {
    const { documentid, fileid, sentences } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('DocumentSentences');
    table.create = false;
    table.columns.add('DocumentID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('Sentence', sql.VarChar(sql.MAX), {nullable: false});
    table.columns.add('LineNum', sql.Int, {nullable: true});
    table.columns.add('EntitiesCnt', sql.Int, {nullable: true});
    table.columns.add('EntitiesMatchesCnt', sql.Int, {nullable: true});
    table.columns.add('PhrasesCnt', sql.Int, {nullable: true});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    sentences.map((sentence, index) => {
        //console.log(`[Document] ${documentid}: Creating Sql Document sentence (${documentid}, ${fileid}, ${sentence}, ${index}, 0, 0, 0, ${documentid})`);
        table.rows.add(documentid, fileid, sentence, index, 0, 0, 0, documentid);
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentSentence(req, res) {
  try {
    const { documentid, fileid, sentence } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`INSERT INTO DocumentSentences (DocumentID, FileID, Sentence, LineNum, EntitiesCnt, EntitiesMatchesCnt, PhrasesCnt, SearchID) VALUES ('${documentid}', '${fileid}', '${sentence}', 0, 0, 0, 0, '${documentid}')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentTriples(req, res){
  try {
    const { documentid, fileid, triples } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('DocumentTriplesFTS');
    table.create = false;
    table.columns.add('DocumentID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('S', sql.VarChar(1000), {nullable: true});
    table.columns.add('P', sql.VarChar(1000), {nullable: true});
    table.columns.add('O', sql.VarChar(1000), {nullable: true});
    table.columns.add('LineNum', sql.Int, {nullable: true});
    table.columns.add('Optional', sql.Bit, {nullable: true});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    triples.map((triple, index) => {
        //console.log(`[Document] ${documentid}: Creating Sql Document triple (${documentid}, ${fileid}, ${triple.subject}, ${triple.relation}, ${triple.argument}, ${triple.line}, 0, ${documentid})`);
        table.rows.add(documentid, fileid, triple.subject, triple.relation, triple.argument, triple.line, 0, documentid);
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentTriple(req, res){
  try {
    const { documentid, fileid, triple } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`INSERT INTO DocumentTriplesFTS (DocumentID, FileID, S, P, O, LineNum, Optional, SearchID) VALUES ('${documentid}', '${fileid}', '${triple.subject}', '${triple.relation}', '${triple.argument}', ${triple.line}, 0, '${documentid}')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentLinkedEntities(req, res){
  try {
    const { documentid, fileid, linkedentities } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('DocumentLinkedEntities');
    table.create = false;
    table.columns.add('DocumentID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('Entity', sql.VarChar(255), {nullable: false});
    table.columns.add('Category', sql.VarChar(120), {nullable: true});
    table.columns.add('Classification', sql.VarChar(120), {nullable: true});
    table.columns.add('Type', sql.VarChar(120), {nullable: true});
    table.columns.add('WikipediaID', sql.VarChar(255), {nullable: true});
    table.columns.add('BingID', sql.VarChar(255), {nullable: true});
    table.columns.add('Data', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('MatchesCnt', sql.Int, {nullable: true});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    linkedentities.map((linkedentity, index) => {
        //console.log(`[Document] ${documentid}: Creating Sql Document linked entity (${documentid}, ${fileid}, ${linkedentity}, 'Default', 'Default', 'Default', '', '', 'test', 0, ${documentid})`);
        table.rows.add(documentid, fileid, linkedentity, 'Default', 'Default', 'Default', '', '', 'test', 0, documentid);
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentLinkedEntity(req, res){
  try {
    const { documentid, fileid, linkedentity } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`INSERT INTO DocumentLinkedEntities (DocumentID, FileID, Entity, Category, Classification, Type, WikipediaID, BingID, Data, MatchesCnt, SearchID) VALUES ('${documentid}', '${fileid}', '${linkedentity}', 'Default', 'Default', 'Default', '', '', 'test', 0, '${documentid}')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentKeyPhrases(req, res){
  try {
    const { documentid, fileid, keyphrases } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('DocumentKeyPhrases');
    table.create = false;
    table.columns.add('DocumentID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('Phrase', sql.VarChar(1000), {nullable: false});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    keyphrases.map((keyphrase, index) => {
        //console.log(`[Document] ${documentid}: Creating Sql Document key phrase (${documentid}, ${fileid}, ${keyphrase}, ${documentid})`);
        table.rows.add(documentid, fileid, keyphrase, documentid);
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDocumentKeyPhrase(req, res){
  try {
    const { documentid, fileid, keyphrase } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`INSERT INTO DocumentKeyPhrases (DocumentID, FileID, Phrase, SearchID) VALUES ('${documentid}', '${fileid}', '${keyphrase}', '${documentid}')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocuments(req, res){
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Documents`);
    var documents = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
        documents.push({ searchid: record.SearchID });
      });
    }
    res.send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocument(req, res){
  try {
    var id = req.params.id;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Documents WHERE DocumentID='${id}'`);
    var document = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      document = { searchid: record.SearchID };
    }
    res.send(document);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentSentences(req, res){
  try {
    var id = req.params.id;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentSentences WHERE DocumentID='${id}'`);
    var sentences = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
        sentences.push({ document: record.DocumentID, 
                         file: record.FileID,
                         sentence: record.Sentence, 
                         line: record.LineNum, 
                         searchid: record.SearchID });
      });
    }
    res.send(sentences);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentSentence(req, res){
  try {
    var id = req.params.id;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentSentences WHERE SentenceID='${id}'`);
    var sentence = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      sentence = { document: record.DocumentID, 
                   file: record.FileID,
                   sentence: record.Sentence, 
                   line: record.LineNum,
                   searchid: record.SearchID };
    }
    res.send(sentence);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentTriples(req, res){
  try {
    var id = req.params.id;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentTriplesFTS WHERE DocumentID='${id}'`);
    var triples = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
          triples.push({ id: record.TripleID, 
                         document: record.DocumentID, 
                         file: record.FileID,
                         argument: record.O, 
                         line: record.LineNum, 
                         subject: record.S, 
                         relation: record.P, 
                         searchid: record.SearchID });
      });
    }
    res.send(triples);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentTriple(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentTriplesFTS WHERE TripleID='${id}'`);
    var triple = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      triple = { id: record.TripleID, 
                 document: record.DocumentID, 
                 file: record.FileID,
                 argument: record.O, 
                 line: record.LineNum, 
                 subject: record.S, 
                 relation: record.P, 
                 searchid: record.SearchID };
    }
    res.send(triple);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function findDocumentTriple(req, res){
  try {
    var subject = req.params.subject;  
    var predicate = req.params.predicate;  
    var object = req.params.object; 
    subject = subject.replace(/%20/g, " ");
    predicate = predicate.replace(/%20/g, " ");
    object = object.replace(/%20/g, " ");
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentTriplesFTS WHERE LOWER(S)='${subject}' AND LOWER(P)='${predicate}' AND LOWER(O)='${object}'`);
    var triple = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      triple = { id: record.TripleID, 
                 document: record.DocumentID, 
                 file: record.FileID,
                 argument: record.O, 
                 line: record.LineNum, 
                 subject: record.S, 
                 relation: record.P, 
                 searchid: record.SearchID };
    }
    res.send(triple);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function countDocumentTriples(req, res){
  try {
    var search = req.params.search;  
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT COUNT(TripleID) AS TriplesCnt FROM DocumentTriplesFTS WHERE LOWER(S)='${search}' OR LOWER(P)='${search}' OR LOWER(O)='${search}'`);
    var count = 0;
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      count = record.TriplesCnt;
    }
    res.send({ count: count });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentLinkedEntities(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentLinkedEntities WHERE DocumentID='${id}'`);
    var entities = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
          entities.push({ document: record.DocumentID,
                          file: record.FileID, 
                          entity: record.Entity, 
                          searchid: record.SearchID,
                          wikipediaid: record.WikipediaID, 
                          bingid: record.BingID, 
                          matchesCnt: record.MatchesCnt });
        });
    }
    res.send(entities);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentAggregatedLinkedEntities(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT COUNT(EntityId) AS EntityCnt, DocumentID, FileID, Entity, SearchID, WikipediaID, BingID FROM DocumentLinkedEntities WHERE DocumentID='${id}' GROUP BY DocumentID, FileID, Entity, SearchID, WikipediaID, BingID ORDER BY EntityCnt DESC`);
    var entities = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
          entities.push({ document: record.DocumentID, 
                          file: record.FileID,
                          entity: record.Entity, 
                          searchid: record.SearchID,
                          wikipediaid: record.WikipediaID, 
                          bingid: record.BingID, 
                          entityCnt: record.EntityCnt });
        });
    }
    res.send(entities);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentLinkedEntity(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`SELECT * FROM DocumentLinkedEntities WHERE EntityID='${id}'`);
    var entity = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      entity = { document: record.DocumentID, 
                 file: record.FileID,
                 entity: record.Entity, 
                 searchid: record.SearchID,
                 wikipediaid: record.WikipediaID, 
                 bingid: record.BingID, 
                 matchesCnt: record.MatchesCnt };
    }
    res.send(entity);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentKeyPhrases(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentKeyPhrases WHERE DocumentID='${id}'`);
    var phrases = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
        phrases.push({ document: record.DocumentID, 
                       file: record.FileID,
                       phrase: record.Phrase, 
                       searchid: record.SearchID });
      });
    }
    res.send(phrases);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentAggregatedKeyPhrases(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT COUNT(PhraseId) AS PhraseCnt, DocumentID, FileID, Phrase, SearchID FROM DocumentKeyPhrases WHERE DocumentID='${id}' GROUP BY DocumentID, FileID, Phrase, SearchID ORDER BY PhraseCnt DESC`);
    var phrases = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
        phrases.push({ document: record.DocumentID, 
                       file: record.FileID,
                       phrase: record.Phrase, 
                       searchid: record.SearchID,
                       phraseCnt: record.PhraseCnt });
      });
    }
    res.send(phrases);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentKeyPhrase(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`SELECT * FROM DocumentKeyPhrases WHERE PhraseID='${id}'`);
    var phrase = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      phrase = { document: record.DocumentID, 
                 file: record.FileID,
                 phrase: record.Phrase, 
                 searchid: record.SearchID };
    }
    res.send(phrase);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readDocumentsTriples(req, res){
  try {
    const { search, tags, collections } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM DocumentTriplesFTS WHERE ` + (search !== '' ? 
    `(S LIKE '%${search}%' OR P LIKE '%${search}%' OR O LIKE '%${search}%')` : 'DocumentID IS NOT NULL'));
    var triples = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
          triples.push({ id: record.TripleID, 
                         document: record.DocumentID, 
                         file: record.FileID,
                         argument: record.O, 
                         line: record.LineNum, 
                         subject: record.S, 
                         relation: record.P, 
                         searchid: record.SearchID });
      });
    }
    res.send(triples);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateDocuments(req, res){

}

async function updateDocument(req, res){

}

async function deleteDocuments(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM Documents`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocument(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM Documents WHERE DocumentID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentSentences(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentSentences`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentSentence(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentSentences WHERE SentenceID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentTriples(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentTriplesFTS`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentTriple(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentTriplesFTS WHERE TripleID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentLinkedEntities(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentLinkedEntities`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentLinkedEntity(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentLinkedEntities WHERE EntityID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentKeyPhrases(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentKeyPhrases`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDocumentKeyPhrase(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM DocumentKeyPhrases WHERE PhraseID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createImages(req, res) {
  try {
    const { images } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('Images');
    table.create = false;
    table.columns.add('ImageID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('Content', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('Data', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('MetaData', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('Width', sql.Int, {nullable: true});
    table.columns.add('Height', sql.Int, {nullable: true});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    table.columns.add('DocumentFileID', sql.VarChar(1000), {nullable: false});
    images.map(image => {
        table.rows.add('test2', 'test2', '', '', '', 0, 0, 'test2', 'test2');
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createImage(req, res) {
  try {
    const { imageid, name, description, content, collections, tags, extradata, metadata, width, height } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    //'${JSON.stringify({ tags: tags, collections: collections })}'
    let data = await pool.request().query(`INSERT INTO Images (ImageID, FileID, Content, Data, MetaData, Width, Height, SearchID, DocumentFileID) VALUES ('${imageid}', '${name}', '${content}', '${extradata}', '${metadata}', ${width}, ${height}, '${imageid}', '${name}.txt')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readImages(req, res){
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Images`);
    var images = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
        images.push({ imageid: record.ImageID, 
                      fileid: record.FileID,
                      source: record.Source,
                      content: record.Content,
                      data: record.Data,
                      metadata: record.MetaData,
                      width: record.Width,
                      height: record.Height,
                      searchid: record.SearchID,
                      documentfileid: record.DocumentFileID });
      });
    }
    res.send(images);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readImage(req, res){
  try {
    var id = req.params.id;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Images WHERE ImageID='${id}'`);
    var image = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      image = { imageid: record.ImageID, 
                fileid: record.FileID,
                source: record.Source,
                content: record.Content,
                data: record.Data,
                metadata: record.MetaData,
                width: record.Width,
                height: record.Height,
                searchid: record.SearchID,
                documentfileid: record.DocumentFileID };
    }
    res.send(image);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function findImage(req, res){
  try {
    var fileid = req.params.fileid;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Images WHERE DocumentFileID='${fileid}'`);
    var image = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      image = { imageid: record.ImageID, 
                fileid: record.FileID,
                source: record.Source,
                content: record.Content,
                data: record.Data,
                metadata: record.MetaData,
                width: record.Width,
                height: record.Height,
                searchid: record.SearchID,
                documentfileid: record.DocumentFileID };
    }
    res.send(image);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteImages(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM Images`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteImage(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM Images WHERE ImageID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createAudios(req, res) {
  try {
    const { audios } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    const table = new sql.Table('Audios');
    table.create = false;
    table.columns.add('AudioID', sql.UniqueIdentifier, {nullable: false});
    table.columns.add('FileID', sql.VarChar(1000), {nullable: false});
    table.columns.add('Content', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('Data', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('MetaData', sql.VarChar(sql.MAX), {nullable: true});
    table.columns.add('SearchID', sql.VarChar(1500), {nullable: false});
    table.columns.add('DocumentFileID', sql.VarChar(1000), {nullable: false});
    audios.map(audio => {
        table.rows.add('test2', 'test2', '', '', '', 'test2', 'test2');
    });
    let data = await pool.request().bulk(table);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createAudio(req, res) {
  try {
    const { audioid, name, description, content, collections, tags, extradata, metadata } = req.body;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    //'${JSON.stringify({ tags: tags, collections: collections })}'
    let data = await pool.request().query(`INSERT INTO Audios (AudioID, FileID, Content, Data, MetaData, SearchID, DocumentFileID) VALUES ('${audioid}', '${name}', '${content}', '${extradata}', '${metadata}', '${audioid}', '${name}.txt')`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readAudios(req, res){
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Audios`);
    var audios = [];
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      data.recordset.forEach(record => {
        audios.push({ audioid: record.AudioID, 
                      fileid: record.FileID,
                      source: record.Source,
                      content: record.Content,
                      data: record.Data,
                      metadata: record.MetaData,
                      searchid: record.SearchID,
                      documentfileid: record.DocumentFileID });
      });
    }
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readAudio(req, res){
  try {
    var id = req.params.id;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Audios WHERE AudioID='${id}'`);
    var audio = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      audio = { audioid: record.AudioID, 
                fileid: record.FileID,
                source: record.Source,
                content: record.Content,
                data: record.Data,
                metadata: record.MetaData,
                searchid: record.SearchID,
                documentfileid: record.DocumentFileID };
    }
    res.send(audio);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function findAudio(req, res){
  try {
    var fileid = req.params.fileid;
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');
    let data = await pool.request().query(`SELECT * FROM Audios WHERE DocumentFileID='${fileid}'`);
    var audio = {};
    if (data !== undefined && data.recordset !== undefined && data.recordset.length > 0) {
      let record = data.recordset[0];
      audio = { audioid: record.AudioID, 
                fileid: record.FileID,
                source: record.Source,
                content: record.Content,
                data: record.Data,
                metadata: record.MetaData,
                searchid: record.SearchID,
                documentfileid: record.DocumentFileID };
    }
    res.send(audio);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteAudios(req, res){ 
  try {
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM Audios`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteAudio(req, res){
  try {
    var id = req.params.id; 
    let pool = await sql.connect('mssql://sa:your_password@sql:9988/ese');    
    let data = await pool.request().query(`DELETE FROM Audios WHERE AudioID='${id}'`);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    createDocuments,
    createDocument,
    createDocumentSentences,
    createDocumentSentence,
    createDocumentTriples,
    createDocumentTriple,
    createDocumentLinkedEntities,
    createDocumentLinkedEntity,
    createDocumentKeyPhrases,
    createDocumentKeyPhrase,
    readDocuments,
    readDocument,
    readDocumentSentences,
    readDocumentSentence,
    readDocumentTriples,
    readDocumentTriple,
    findDocumentTriple,
    countDocumentTriples,
    readDocumentLinkedEntities,
    readDocumentAggregatedLinkedEntities,
    readDocumentLinkedEntity,
    readDocumentKeyPhrases,
    readDocumentAggregatedKeyPhrases,
    readDocumentKeyPhrase,
    readDocumentsTriples,//search
    updateDocuments,
    updateDocument,
    deleteDocuments,
    deleteDocument,
    deleteDocumentSentences,
    deleteDocumentSentence,
    deleteDocumentTriples,
    deleteDocumentTriple,
    deleteDocumentLinkedEntities,
    deleteDocumentLinkedEntity,
    deleteDocumentKeyPhrases,
    deleteDocumentKeyPhrase,
    createImages,
    createImage,
    readImages,
    readImage,
    findImage,
    deleteImages,
    deleteImage,
    createAudios,
    createAudio,
    readAudios,
    readAudio,
    findAudio,
    deleteAudios,
    deleteAudio
};