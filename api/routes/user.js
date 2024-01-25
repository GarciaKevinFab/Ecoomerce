import express from 'express';
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, getNewUsers, getUserStats } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Crear usuario
router.post('/', createUser);

// Actualizar usuario
router.put('/:id', verifyAdmin, updateUser);

// Eliminar usuario
router.delete('/:id', verifyAdmin, deleteUser);

// Obtener un solo usuario
router.get('/:id', verifyAdmin, getSingleUser);

// Obtener todos los usuarios
router.get('/', verifyAdmin, getAllUser);

// Obtener usuarios nuevos
router.get('/?new=true', verifyAdmin, getNewUsers);

// Obtener estadísticas de usuarios
router.get('/test', verifyAdmin, getUserStats);



export default router;
