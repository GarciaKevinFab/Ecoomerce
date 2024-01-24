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
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/find/:userId', getUserOrders);
router.get('/', getAllOrders);
router.get('/income', getMonthlyIncome);

export default router;
