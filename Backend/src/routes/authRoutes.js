import express from 'express';
import  {registerUser, loginUser}  from '../controllers/authController.js';

console.log('Auth Routes Loaded');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Route Working');
});

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;