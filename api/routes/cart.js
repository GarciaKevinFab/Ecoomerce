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
router.delete('/:id', verifyAdmin, deleteCart);
router.get('/find/:userId', verifyAdmin, getUserCart);
router.get('/', verifyAdmin, getAllCarts);

export default router;
