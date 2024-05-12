var express = require('express');
var router = express.Router();

const AuthenticationService = require('../services/Authentication');

//Authentication

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login user
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', function(req, res) {
    AuthenticationService.authenticateUser(req, res);
});