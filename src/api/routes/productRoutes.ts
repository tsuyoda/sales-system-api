import ProductController from '../controllers/ProductController';
import express from 'express';

const router = express.Router();

router.post('/', ProductController.create);
router.get('/:id', ProductController.show);
router.get('/', ProductController.list);
router.delete('/:id', ProductController.delete);
router.put('/:id', ProductController.update);

export default router;
