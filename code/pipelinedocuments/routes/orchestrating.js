var express = require('express');
var router = express.Router();

const OrchestratorService = require('../services/Orchestrator');

//Orchestration pipeline (a substitute for Azure Functions-based orchestration when called from the client on demand due to the CORS issue)

/**
 * @swagger
 * /documents:
 *   post:
 *     description: Orchestrate documents
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/documents', function(req, res) {
    OrchestratorService.orchestrateDocuments(req, res);
});

module.exports = router; 