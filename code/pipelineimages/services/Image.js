var rp = require('request-promise');

function createImages(images) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/images',
    body: null
  };
    
  return rp(options);
}

function createImage(id, name, description, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/image',
    body: JSON.stringify({ id, name, description, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
  
  //console.log(`[IMAGE] ${id}: CREATING MONGO IMAGE STARTED`);
  return rp(options);
}

function deleteImages(images) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/images'
  };
    
  return rp(options);
}

function deleteImage(id) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/image',
    body: null
  };
    
  return rp(options);
}

module.exports = {
  createImages,
  createImage,
  deleteImages,
  deleteImage
};