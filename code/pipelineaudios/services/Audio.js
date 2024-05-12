var rp = require('request-promise');

function createAudios(audios) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/audios',
    body: null
  };
    
  return rp(options);
}

function createAudio(id, name, description, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/audio',
    body: JSON.stringify({ id, name, description, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
  
  //console.log(`[AUDIO] ${id}: CREATING MONGO AUDIO STARTED`);
  return rp(options);
}

function deleteAudios(audios) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/audios'
  };
    
  return rp(options);
}

function deleteAudio(id) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/audio',
    body: null
  };
    
  return rp(options);
}

module.exports = {
  createAudios,
  createAudio,
  deleteAudios,
  deleteAudio
};