import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller';

const router: Router = Router();

router.get('/sign-in', signIn);
router.get('/sign-up', signUp);

export default router;