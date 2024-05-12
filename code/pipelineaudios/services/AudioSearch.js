var rp = require('request-promise');

function createAudio(id, name, description, content, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/elasticsearch/audio',
    body: JSON.stringify({ id, name, description, content, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  //console.log(`[AUDIO] ${id}: CREATING ELASTICSEARCH AUDIO STARTED`);
  return rp(options);
}

module.exports = {
  createAudio
};