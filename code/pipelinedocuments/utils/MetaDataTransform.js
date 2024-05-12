const convertMetatags2Tags = (metatags) => {
    var tags = [];

    try {
        for (var i = 0; i < metatags.length; i++) {
            if (metatags[i].length > 1) {
                //Authors (,)
                //Title
                //Description
                //Keywords (,)
                //Abstract (Summary)
                if (metatags[i][0].toLowerCase() === "authors" || metatags[i][0].toLowerCase() === "author") {
                    var authors = metatags[i][1].split(",");
                    tags = tags.concat(authors);
                }
                if (metatags[i][0].toLowerCase() === "title") {
                    tags.push(metatags[i][1]);
                }
                if (metatags[i][0].toLowerCase() === "keywords") {
                    var keywords = metatags[i][1].split(",");
                    tags = tags.concat(keywords);
                }
                /*
                if (metatags[i][0].toLowerCase() === "description") {
                    tags.push(value);
                }
                */
            }
        }
    }
    catch (error) {
        console.log(error);
    }

    return tags;
}

module.exports = { convertMetatags2Tags };