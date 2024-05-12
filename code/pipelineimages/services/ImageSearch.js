var rp = require('request-promise');

/*
function createImage(id, name, description, content, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/elasticsearch/image',
    body: JSON.stringify({ id, name, description, content, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  //console.log(`[IMAGE] ${id}: CREATING ELASTICSEARCH IMAGE STARTED`);
  return rp(options);
}
*/

function createImage(imageid, name, description, content, collections, tags, extradata, width, height) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/sql/image',
    body: JSON.stringify({ imageid, name, description, content, collections, tags, extradata, metadata: '', width, height }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  return rp(options);
}

module.exports = {
  createImage
};