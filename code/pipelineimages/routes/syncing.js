var express = require('express');
var router = express.Router();

const SyncService = require('../services/Sync');

//Synchronization pipeline

/**
 * @swagger
 * /images:
 *   post:
 *     description: Synchronize images
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/images', function(req, res) {
    //let imageFile = req.files.imageFile;
    SyncService.syncImages(req, res);
});

module.exports = router; 