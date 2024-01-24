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
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/find/:id', getProduct);
router.get('/', getAllProducts);

export default router;
