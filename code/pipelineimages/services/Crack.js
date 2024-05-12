var express = require('express');
var fs = require('fs-extra');
var os = require('os');
var rp = require('request-promise');
const { v4 } = require('uuid');

const ImageService = require('./Image');
const ImageSearchService = require('./ImageSearch');
const OcrService = require('./Ocr');
const CustomVisionService = require('./CustomVision');
const StorageService = require('./Storage');

const MetaDataTransformUtil = require('../utils/MetaDataTransform');
const TextSplitUtil = require('../utils/TextSplit');

function crackImages(req, res) {
    let imageFile = req.files.imageFile;
    let imageFileName = req.body.imageFileName;

    const workDir = `${os.tmpdir()}/${v4()}`;
    const filePath = `${workDir}/${imageFileName}`;

    var id = v4();
    var name = imageFileName;

    var content = '';
    var metadata = '';
    var results = [];
    var extradata = {};
    var collections = ["coll1", 'coll2'];
    var tags = ["tag1", 'tag2'];
    var dimensions = [0, 0];

    console.log(`[IMAGE] ${name}: CRACKING STARTED`);

    fs.ensureDir(workDir)
    .then(() => imageFile.mv(filePath))
    .then(() => Promise.all([ OcrService.extractText(filePath), 
                              OcrService.extractMetadata(filePath) ]))
    .then(data => {
        var ocrobj = JSON.parse(data[0]);
        if (ocrobj !== undefined && ocrobj !== null && ocrobj.status === "Succeeded" && ocrobj.recognitionResults.length > 0)
        {
            ocrobj.recognitionResults.forEach(recognitionResult => {
                recognitionResult.lines.forEach(line => {
                    if (line.text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') !== '') {
                        content += line.text + ' ';
                        results.push({ boundingBox: line.boundingBox, text: line.text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') });
                    }
                });
            });
            extradata.results = results;
        }
        if (content === '') {
            content = 'This is an empty file.';
        }
        else {
            content += '.';
            content = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        }

        metadata = data[1];
        var metalines = metadata.split('\n');
        var metatags = [];
        for (var i = 0; i < metalines.length; i++) {
            if (metalines[i] !== '') {
                var metatag = metalines[i].split('","');
                if (metatag.length > 1) {
                    metatags.push([metatag[0].replace(/['"]+/g, ''), metatag[1].replace(/['"]+/g, '')]);
                }
            }
        }
        dimensions = MetaDataTransformUtil.convertMetatags2Dimensions(metatags);
        
        //console.log(`[CONTENT] ${content}`);
        return CustomVisionService.detectObjects(filePath);
    })
    .then(data => {
        var cvobj = JSON.parse(data);
        if (cvobj !== undefined && cvobj !== null && cvobj.predictions.length > 0) {
            extradata.predictions = cvobj.predictions;
        }
        console.log(`[METADATA] ${extradata}`);
        return ImageSearchService.createImage(id, name, content.substring(0, 250), content, collections, tags, JSON.stringify(extradata), dimensions[0], dimensions[1]);
    })
    .then(() => StorageService.createDocumentImage(name, content))
    .then(() => {
        console.log(`[IMAGE] ${name}: CRACKING FINISHED`);
        res.send(true);
        //res.send(data);
    })
    .catch(error => res.status(500).send(error))
    .finally(() => fs.remove(workDir));
}

module.exports = {
    crackImages
};