import express from 'express';
import {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCarts
} from '../controllers/cartController.js';
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

// Rutas para el carrito
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.get('/find/:userId', getUserCart);
router.get('/', getAllCarts);

export default router;
