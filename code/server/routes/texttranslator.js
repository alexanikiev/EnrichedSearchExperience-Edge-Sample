var express = require('express');
var router = express.Router();

const TextTranslatorService = require('../services/TextTranslator');

//TextTranslator

/**
 * @swagger
 * /translate:
 *   post:
 *     description: Translate text
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/translate', function(req, res) {
    TextTranslatorService.translateText(req, res);
});

module.exports = router;