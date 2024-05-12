const transformResult2Object = (result) => {
    var keywords = [];

    try {
        var documents = JSON.parse(result).documents;
        for (var i = 0; i < documents.length; i++) {
            keywords = documents[i].keyPhrases;
        }
    }
    catch (error) {
        console.log(error);
    }

    return { keywords: keywords };
}

const transformResult2Value = (result) => {
    var language = '';

    try {
        var documents = JSON.parse(result).documents;
        for (var i = 0; i < documents.length; i++) {
            language = documents[i].detectedLanguages[0].iso6391Name;
            break;
        }
    }
    catch (error) {
        console.log(error);
    }

    return language;
}

module.exports = { transformResult2Object,
                   transformResult2Value };