const splitSentences2Chunks = (sentences, chunkmaxsize) => {
    var chunks = [];

    var chunk = "";
    var chunksize = 0;
    for (var i = 0; i < sentences.length; i++) {
        //handle a single large sentence larger than a limit
        if (sentences[i].length > chunkmaxsize) {
            //todo: split a hard way 
        }
    
        if (chunksize + sentences[i].length < chunkmaxsize) {
            chunksize += sentences[i].length; chunk += sentences[i];
            if ( i + 1 === sentences.length) {
                chunks.push(chunk);
            }
        }
        else {
            chunks.push(chunk); chunksize = 0; chunk = sentences[i];
        }
    }

    return chunks;
}

module.exports = { splitSentences2Chunks };