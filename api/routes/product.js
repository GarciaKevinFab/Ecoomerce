import express from 'express';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
} from '../controllers/productController.js';
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Rutas para los productos
router.post('/', verifyAdmin, createProduct);
router.put('/:id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);
router.get('/find/:id', verifyAdmin, getProduct);
router.get('/', verifyAdmin, getAllProducts);

export default router;
