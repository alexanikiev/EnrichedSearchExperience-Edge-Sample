var express = require('express');
var router = express.Router();

const StorageService = require('../services/Storage');

//Storage

/**
 * @swagger
 * /create:
 *   post:
 *     description: Create file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', function(req, res) {
    StorageService.createFile(req, res);
});

/**
 * @swagger
 * /save:
 *   post:
 *     description: Save file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/save', function(req, res) {
    StorageService.saveFile(req, res);
});


/**
 * @swagger
 * /open:
 *   post:
 *     description: Open file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/open', function(req, res) {
    StorageService.openFile(req, res);
});

/**
 * @swagger
 * /copy:
 *   post:
 *     description: Copy file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/copy', function(req, res) {
    StorageService.copyFile(req, res);
});

/**
 * @swagger
 * /empty:
 *   post:
 *     description: Empty directories (success documents, media)
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/empty', function(req, res) {
    StorageService.emptyDirectories(req, res);
});

/**
 * @swagger
 * /delete:
 *   post:
 *     description: Delete file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/delete', function(req, res) {
    StorageService.deleteFile(req, res);
});


/**
 * @swagger
 * /move:
 *   post:
 *     description: Move file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/move', function(req, res) {
    StorageService.moveFile(req, res);
});

/**
 * @swagger
 * /scan:
 *   post:
 *     description: Scan folder
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/scan', function(req, res) {
    StorageService.scanFolder(req, res);
});

/**
 * @swagger
 * /download:
 *   get:
 *     description: Download file
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/download/:documentFolderName/:documentFileName', function(req, res) {
    StorageService.downloadFile(req, res);
});

/**
 * @swagger
 * /stash:
 *   post:
 *     description: Stash media file (images, audios)
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/stash', function(req, res) {
    StorageService.stashFile(req, res);
});

/**
 * @swagger
 * /purge:
 *   post:
 *     description: Purge directories (waiting documents)
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/purge', function(req, res) {
    StorageService.purgeDirectories(req, res);
});

module.exports = router;