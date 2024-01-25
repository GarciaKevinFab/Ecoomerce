import express from 'express';
import {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrders,
    getAllOrders,
    getMonthlyIncome
} from '../controllers/orderController.js';
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

router.post('/', createOrder);
router.put('/:id', verifyAdmin, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/find/:userId', verifyAdmin, getUserOrders);
router.get('/', verifyAdmin, getAllOrders);
router.get('/income', verifyAdmin, getMonthlyIncome);

export default router;
