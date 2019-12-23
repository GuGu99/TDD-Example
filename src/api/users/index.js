const express = require('express');
const router = express();

import * as userController from './users.ctrl';

router.get('/', userController.index);

router.get('/:id', userController.show); 
router.delete('/:id', userController.destory);
router.post('/', userController.create)
router.put('/:id', userController.update);

export default router;

