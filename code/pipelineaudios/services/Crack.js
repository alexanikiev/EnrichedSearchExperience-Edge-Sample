var express = require('express');
var fs = require('fs-extra');
var os = require('os');
var rp = require('request-promise');
const { v4 } = require('uuid');

const AudioService = require('./Audio');
const AudioSearchService = require('./AudioSearch');
const SttService = require('./Stt');

const MetaDataTransformUtil = require('../utils/MetaDataTransform');
const TextSplitUtil = require('../utils/TextSplit');

function crackAudios(req, res) {
    let audioFile = req.files.audioFile;
    let audioFileName = req.body.audioFileName;

    const workDir = `${os.tmpdir()}/${v4()}`;
    const filePath = `${workDir}/${audioFileName}`;

    var id = v4();
    var name = audioFileName;

    console.log(`[AUDIO] ${name}: CRACKING STARTED`);

    fs.ensureDir(workDir)
    .then(() => audioFile.mv(filePath))
    .then(() => SttService.extractText(filePath))
    .then(data => {
        console.log(`[AUDIO] ${name}: CRACKING FINISHED`);
        res.send(data);
    })
    .catch(error => res.status(500).send(error))
    .finally(() => fs.remove(workDir));
}

module.exports = {
    crackAudios
};