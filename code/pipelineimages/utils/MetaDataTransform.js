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

const convertMetatags2Dimensions = (metatags) => {
    var width = 0;
    var height = 0;

    try {
        for (var i = 0; i < metatags.length; i++) {
            if (metatags[i].length > 1) {
                //Width
                //Height
                if (metatags[i][0].toLowerCase() === "image width" || 
                    metatags[i][0].toLowerCase() === "width") {
                    width = metatags[i][1].split(" ")[0];//"x pixels"
                }
                if (metatags[i][0].toLowerCase() === "image height" || 
                    metatags[i][0].toLowerCase() === "height") {
                    height = metatags[i][1].split(" ")[0];//"y pixels"
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }

    return [width, height];
}

module.exports = { convertMetatags2Tags,
                   convertMetatags2Dimensions };