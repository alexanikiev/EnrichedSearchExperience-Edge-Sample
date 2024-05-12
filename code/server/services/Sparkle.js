var rp = require('request-promise');
var fs = require('fs-extra');
var os = require('os');
const { v4 } = require('uuid');

function queryTriples(req, res) {
  const { search } = req.body;
  var options = {
    method: 'POST',
    uri: 'http://fuseki:9976/ese',
    headers: {
        'Accept': 'application/sparql-results+json; charset=utf-8application/sparql-results+json,*/*;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    form: {
        'query': `PREFIX ese: <http://ese#> 
        SELECT * WHERE { 
            { 
              {  
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?subject) 
                    ?subject ?predicate ?object
                } 
              }
              UNION 
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?predicate) 
                    ?subject ?predicate ?object
                } 
              }
              UNION
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?object) 
                    ?subject ?predicate ?object
                }   
              }
            } 
        }`
    }
  };
    
  rp(options)
  .then(data => { 
      var sparkleobj = JSON.parse(data);
      var triples = [];
      var ids = [];
      if (sparkleobj !== undefined && sparkleobj.results !== undefined && sparkleobj.results.bindings !== undefined && sparkleobj.results.bindings.length > 0) {
        sparkleobj.results.bindings.forEach(triple => {
            let subject = triple.subject.value.replace("http://ese#", "").replace(/%20/g, " ");
            let predicate = triple.predicate.value.replace("http://ese#", "").replace(/%20/g, " ");
            let object = triple.object.value.replace("http://ese#", "").replace(/%20/g, " ");
            if (subject !== '' && predicate !== '' && object !== '') {
                let id = `${subject} : ${predicate} : ${object}`;
                if (!ids.includes(id)){
                    triples.push({ subject: subject, 
                                   predicate: predicate, 
                                   object: object });
                }
                else {
                    ids.push(id);
                }
            }
        });  
      }
      return res.json({ triples: triples }); 
  })
  .catch(error => res.status(500).send(error));
}

function updateTriples(req, res) {
  const { triples } = req.body;
  var query = '';
  for (var i = 0; i < triples.length; i++) {
      let subject = triples[i].subject.replace(/[^\w\s]/gi, '').replace(/ /g,"%20");
      let predicate = triples[i].relation.replace(/[^\w\s]/gi, '').replace(/ /g,"%20");
      let object = triples[i].argument.replace(/[^\w\s]/gi, '').replace(/ /g,"%20");
      if (subject !== '' && predicate !== '' && object !== '')
        query += `INSERT DATA { ese:${subject.toLowerCase()} ese:${predicate.toLowerCase()} ese:${object.toLowerCase()} };`;
  }
  var options = {
    method: 'POST',
    uri: 'http://fuseki:9976/ese',
    headers: {
        'Accept': 'application/sparql-results+json; charset=utf-8application/sparql-results+json,*/*;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    form: {
        'update': `PREFIX ese: <http://ese#> 
        ${query}`
    }
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createTriples(req, res) {
    const { triples, documentid } = req.body;
    const workDir = `${os.tmpdir()}/${v4()}`;
    const filePath = `${workDir}/${documentid}.ttl`;
    var fileContent = '@prefix ese: <http://ese#>.' + '\n\n';
    for (var i=0; i<triples.length; i++) {
        let subject = triples[i].subject.replace(/[^\w\s]/gi, '').replace(/ /g,"%20");
        let predicate = triples[i].relation.replace(/[^\w\s]/gi, '').replace(/ /g,"%20");
        let object = triples[i].argument.replace(/[^\w\s]/gi, '').replace(/ /g,"%20");
        if (subject !== '' && predicate !== '' && object !== '') {
            fileContent += `ese:${subject.toLowerCase()} ese:${predicate.toLowerCase()} ese:${object.toLowerCase()} .` + '\n';
        }
    }     
    fs.ensureDir(workDir)
    .then(() => fs.writeFile(filePath, fileContent))
    .then(() => rp({
        method: 'POST',
        uri: `http://fuseki:9976/ese/data`, //?graph=${documentid}
        headers: {
            'Accept': 'application/json, text/javascript, */*;q=0.01',
            'Content-Type': 'multipart/form-data'
        },
        formData: {
            files: fs.createReadStream(filePath)
        }
      }))
    .then(data => res.json(data))
    .catch(error => res.status(500).send(error))
    .finally(() => fs.remove(workDir));

    // { 
    //    "count": 4,
    //    "tripleCount": 4,
    //    "quadCount": 0
    // }
}

function countTriples(req, res) {
  var search = req.params.search; 
  var options = {
    method: 'POST',
    uri: 'http://fuseki:9976/ese',
    headers: {
        'Accept': 'application/sparql-results+json; charset=utf-8application/sparql-results+json,*/*;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    form: {
        'query': `PREFIX ese: <http://ese#> 
        SELECT (COUNT(*) as ?triplescnt) WHERE { 
            { 
              {  
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?subject) 
                    ?subject ?predicate ?object
                } 
              }
              UNION 
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?predicate) 
                    ?subject ?predicate ?object
                } 
              }
              UNION
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?object) 
                    ?subject ?predicate ?object
                }   
              }
            } 
        }`
    }
  };
    
  rp(options)
  .then(data => { 
      var count = 0;
      var sparkleobj = JSON.parse(data);
      if (sparkleobj !== undefined && sparkleobj.results !== undefined && sparkleobj.results.bindings !== undefined && sparkleobj.results.bindings.length > 0) {
        count = parseInt(sparkleobj.results.bindings[0].triplescnt.value);
      }
      return res.json({ count: count }); 
  })
  .catch(error => res.status(500).send(error));
}

function deleteTriples(req, res) {
  var options = {
    method: 'POST',
    uri: 'http://fuseki:9976/$/datasets/ese',
    headers: {
      'Authorization': 'Basic base64' /* username:password */
    }
  };

  rp(options)
  .then(data => res.send(true))
  .catch(error => res.status(500).send(error));
}

function queryTriplesPOST(req, res) {
  const { search, subjectlen, predicatelen, objectlen } = req.body;
  var options = {
    method: 'POST',
    uri: 'http://fuseki:9976/ese',
    headers: {
        'Accept': 'application/sparql-results+json; charset=utf-8application/sparql-results+json,*/*;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    form: {
        'query': `PREFIX ese: <http://ese#> 
        SELECT * WHERE { 
            { 
              {  
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?subject) 
                    ?subject ?predicate ?object 
                    FILTER (STRLEN(STR(?subject)) <= 11+${subjectlen})
                    FILTER (STRLEN(STR(?predicate)) <= 11+${predicatelen})
                    FILTER (STRLEN(STR(?object)) <= 11+${objectlen})
                } 
              }
              UNION 
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?predicate) 
                    ?subject ?predicate ?object 
                    FILTER (STRLEN(STR(?subject)) <= 11+${subjectlen})
                    FILTER (STRLEN(STR(?predicate)) <= 11+${predicatelen})
                    FILTER (STRLEN(STR(?object)) <= 11+${objectlen})
                } 
              }
              UNION
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?object) 
                    ?subject ?predicate ?object 
                    FILTER (STRLEN(STR(?subject)) <= 11+${subjectlen})
                    FILTER (STRLEN(STR(?predicate)) <= 11+${predicatelen})
                    FILTER (STRLEN(STR(?object)) <= 11+${objectlen})
                }   
              }
            } 
        }`
    }
  };
    
  rp(options)
  .then(data => { 
      var sparkleobj = JSON.parse(data);
      var triples = [];
      var ids = [];
      if (sparkleobj !== undefined && sparkleobj.results !== undefined && sparkleobj.results.bindings !== undefined && sparkleobj.results.bindings.length > 0) {
        sparkleobj.results.bindings.forEach(triple => {
            let subject = triple.subject.value.replace("http://ese#", "").replace(/%20/g, " ");
            let predicate = triple.predicate.value.replace("http://ese#", "").replace(/%20/g, " ");
            let object = triple.object.value.replace("http://ese#", "").replace(/%20/g, " ");
            if (subject !== '' && predicate !== '' && object !== '') {
                let id = `${subject} : ${predicate} : ${object}`;
                if (!ids.includes(id)){
                    triples.push({ subject: subject, 
                                   predicate: predicate, 
                                   object: object });
                }
                else {
                    ids.push(id);
                }
            }
        });  
      }
      return res.json({ triples: triples }); 
  })
  .catch(error => res.status(500).send(error));
}

function countTriplesPOST(req, res) {
  const { search, subjectlen, predicatelen, objectlen } = req.body;
  var options = {
    method: 'POST',
    uri: 'http://fuseki:9976/ese',
    headers: {
        'Accept': 'application/sparql-results+json; charset=utf-8application/sparql-results+json,*/*;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    form: {
        'query': `PREFIX ese: <http://ese#> 
        SELECT (COUNT(*) as ?triplescnt) WHERE { 
            { 
              {  
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?subject) 
                    ?subject ?predicate ?object 
                    FILTER (STRLEN(STR(?subject)) <= 11+${subjectlen})
                    FILTER (STRLEN(STR(?predicate)) <= 11+${predicatelen})
                    FILTER (STRLEN(STR(?object)) <= 11+${objectlen})
                } 
              }
              UNION 
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?predicate) 
                    ?subject ?predicate ?object 
                    FILTER (STRLEN(STR(?subject)) <= 11+${subjectlen})
                    FILTER (STRLEN(STR(?predicate)) <= 11+${predicatelen})
                    FILTER (STRLEN(STR(?object)) <= 11+${objectlen})
                } 
              }
              UNION
              {
                SELECT ?subject ?predicate ?object WHERE { 
                    BIND(ese:${search.replace(/ /g,"%20")} as ?object) 
                    ?subject ?predicate ?object 
                    FILTER (STRLEN(STR(?subject)) <= 11+${subjectlen})
                    FILTER (STRLEN(STR(?predicate)) <= 11+${predicatelen})
                    FILTER (STRLEN(STR(?object)) <= 11+${objectlen})
                }   
              }
            } 
        }`
    }
  };
    
  rp(options)
  .then(data => { 
      var count = 0;
      var sparkleobj = JSON.parse(data);
      if (sparkleobj !== undefined && sparkleobj.results !== undefined && sparkleobj.results.bindings !== undefined && sparkleobj.results.bindings.length > 0) {
        count = parseInt(sparkleobj.results.bindings[0].triplescnt.value);
      }
      return res.json({ count: count }); 
  })
  .catch(error => res.status(500).send(error));
}

module.exports = {
    queryTriples,
    updateTriples,
    createTriples,
    countTriples,
    deleteTriples,
    queryTriplesPOST,
    countTriplesPOST
};