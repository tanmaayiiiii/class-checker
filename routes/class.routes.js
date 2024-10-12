// routes/userRoutes.js
import express from 'express';
import { signUp } from '../controllers/user.controller.js';

const router = express.Router();

// POST request to sign up a new user
router.route('/signup').post(signUp); 

export default router;
