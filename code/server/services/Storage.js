var fs = require('fs');
var fsextra = require('fs-extra');

function createFile(req, res) {
    let documentFileName = req.body.documentFileName;
    let documentFileContent = req.body.documentFileContent;

    const workDir = `/usr/data`;
    const filePath = `${workDir}/waiting/${documentFileName}`;

    fsextra.outputFile(filePath, documentFileContent)
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function saveFile(req, res) {
    let documentFile = req.files.documentFile;
    let documentFileName = req.body.documentFileName;

    const workDir = `/usr/data`;
    const filePath = `${workDir}/waiting/${documentFileName}`;

    fsextra.ensureDir(workDir)
    .then(() => documentFile.mv(filePath))
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function openFile(req, res) {
    let documentFileName = req.body.documentFileName;

    const workDir = `/usr/data`;
    const filePath = `${workDir}/success/${documentFileName}`;

    //https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/
    //https://nodejs.dev/learn/nodejs-streams

    //REFERENCE:
    //https://stackoverflow.com/questions/10046039/nodejs-send-file-in-response
    res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + documentFileName
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    //https://www.youtube.com/watch?v=KtK3qxaYddE
    return new Promise((resolve, reject) => {
        res.on('finish', resolve);
        res.on('error', reject);
    });
    
    /*
    setTimeout(() => {
        readStream.unpipe(res);
        res.status(200).send();
    }, 2000);
    */
    
    //https://medium.com/developers-arena/streams-piping-and-their-error-handling-in-nodejs-c3fd818530b6
}

function copyFile(req, res) {
    let documentFileName = req.body.documentFileName;

    const workDir = `/usr/data`;
    const srcFilePath = `${workDir}/waiting/${documentFileName}`;
    const destFilePath = `${workDir}/success/${documentFileName}`;

    fsextra.copy(srcFilePath, destFilePath)
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function emptyDirectories(req, res) {
    const workDir1 = `/usr/data/success`;
    const workDir2 = `/usr/src/app/public/media`;
    fsextra.emptyDir(workDir1)
    .then(() => fsextra.emptyDir(workDir2))
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function deleteFile(req, res) {
    let documentFileName = req.body.documentFileName;

    const workDir = `/usr/data`;
    const filePath = `${workDir}/waiting/${documentFileName}`;

    fsextra.remove(filePath)
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function moveFile(req, res) {
    let documentFileName = req.body.documentFileName;

    const workDir = `/usr/data`;
    const srcFilePath = `${workDir}/waiting/${documentFileName}`;
    const destFilePath = `${workDir}/success/${documentFileName}`;

    fsextra.move(srcFilePath, destFilePath)
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function scanFolder(req, res) {
    const workDir = `/usr/data`;

    new Promise((resolve, reject) => {
        return fs.readdir(`${workDir}/waiting`, (err, filenames) => err != null ? reject(err) : resolve(filenames))
    })
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
}

function downloadFile(req, res) {
    let documentFileName = req.params.documentFileName;
    let documentFolderName = req.params.documentFolderName;

    const workDir = `/usr/data`;
    const filePath = `${workDir}/${documentFolderName}/${documentFileName}`;

    res.download(filePath);
}

function stashFile(req, res) {
    //todo: image (also include audios)
    let imageFile = req.files.imageFile;
    let imageFileName = req.body.imageFileName;

    const workDir = `/usr/src/app/public/media`;
    const filePath = `${workDir}/${imageFileName}`;

    fsextra.ensureDir(workDir)
    .then(() => imageFile.mv(filePath))
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}

function purgeDirectories(req, res) {
    const workDir1 = `/usr/data/waiting`;
    fsextra.emptyDir(workDir1)
    .then(() => res.send(true))
    .catch(error => res.status(500).send(error));
}
  
module.exports = {
    createFile,
    saveFile,
    openFile,
    copyFile,
    emptyDirectories,
    deleteFile,
    moveFile,
    scanFolder,
    downloadFile,
    stashFile,
    purgeDirectories
};