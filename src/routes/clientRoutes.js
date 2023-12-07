import express from 'express';
import * as controller from '../clientController.js';

const router = express.Router();

router.post('/:clientID', controller.updateModel);

export default router