var express = require('express');
var router = express.Router();

var routes = require('../routes');


/**
 * @swagger
 * definitions:
 *   Location:
 *     properties:
 *       lat:
 *         type: number
 *         example: -22.1367345
 *       lng:
 *         type: number
 *         example: -51.4201818
 */



/**
 * @swagger
 * /api/Hospitals:
 *   post:
 *     tags:
 *       - Hospitals
 *     description: Get all hospitals from SP
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: location
 *         description: Current user location
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Location'
 *       - name: pagetoken
 *         description: (optional) Each call retrieves a maxium 20 hospitals, and then a token for the next 20
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.post('/api/Hospitals', routes.getHospitals);


module.exports = router;
