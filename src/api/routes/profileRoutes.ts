import express from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = express.Router();

profileRoutes.post('/reset-password', ProfileController.resetPassword);
profileRoutes.get('/', ProfileController.show);

export default profileRoutes;
