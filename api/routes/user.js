import express from 'express';
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, getNewUsers, getUserStats } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Crear usuario
router.post('/', createUser);

// Actualizar usuario
router.put('/:id', updateUser);

// Eliminar usuario
router.delete('/:id', deleteUser);

// Obtener un solo usuario
router.get('/:id', getSingleUser);

// Obtener todos los usuarios
router.get('/', getAllUser);

// Obtener usuarios nuevos
router.get('/?new=true', getNewUsers);

// Obtener estadísticas de usuarios
router.get('/test', getUserStats);



export default router;
