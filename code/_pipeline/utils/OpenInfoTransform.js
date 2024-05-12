const transformResult2Object = (result) => {
    var triples = [];
    var tokensentences = [];
    var linkedentities = [];

    try {
        var sentences = JSON.parse(result).sentences;
        for (var i = 0; i < sentences.length; i++) {
            var index = sentences[i].index;
            //openie
            var openie = sentences[i].openie;
            for (var j = 0; j < openie.length; j++) {
                var triple = openie[j];
                triples.push({ line: index, subject: triple.subject, relation: triple.relation, argument: triple.object });
            }
            //tokensentences
            var tokens = sentences[i].tokens;
            var tokensentence = '';
            for (var k = 0; k < tokens.length; k++) {
                var token = tokens[k];
                tokensentence += token.word + " ";
            }
            tokensentences.push(tokensentence);
            //linkedentities
            var entitymentions = sentences[i].entitymentions;
            for (var l = 0; l < entitymentions.length; l++) {
                var entitymention = entitymentions[l];
                linkedentities.push(entitymention.text);
                //todo: add ner (type)
            }
        }
    }
    catch (error) {
        console.log(error);
    }

    return { tokensentences: tokensentences, 
             triples: triples,
             linkedentities: linkedentities };
}

module.exports = { transformResult2Object };