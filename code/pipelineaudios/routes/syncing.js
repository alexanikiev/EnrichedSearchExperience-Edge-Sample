var express = require('express');
var router = express.Router();

const SyncService = require('../services/Sync');

//Synchronization pipeline

/**
 * @swagger
 * /audios:
 *   post:
 *     description: Synchronize audios
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/audios', function(req, res) {
    //let audioFile = req.files.audioFile;
    SyncService.syncAudios(req, res);
});

module.exports = router; 