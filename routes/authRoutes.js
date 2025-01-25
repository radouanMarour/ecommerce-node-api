import express from 'express'
import { registerUser, loginUser, updateUserProfile } from '../controllers/authController.js'
import auth from '../middlewares/auth.js';


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/users/profile', auth, updateUserProfile)

export default router;