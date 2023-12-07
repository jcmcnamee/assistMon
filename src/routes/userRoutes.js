import express from 'express';
import * as controller from '../userController.js';

const router = express.Router();

router.get('/', controller.renderMain);
router.get('/events', controller.registerClient);
// router.post('/update/:clientID', controller.updateStatus);

export default router;
