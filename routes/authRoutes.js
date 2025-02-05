import express from 'express'
import { registerUser, loginUser, updateUserProfile, getUsers, deleteUser } from '../controllers/authController.js'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', auth, admin, getUsers)
router.delete('/users/:id', auth, admin, deleteUser)
router.put('/users/profile', auth, updateUserProfile)

export default router;