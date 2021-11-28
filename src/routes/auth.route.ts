import { Router } from 'express';
import { signIn } from '../controllers/auth.controller';

const router: Router = Router();

router.get('/sign-in', signIn);

export default router;