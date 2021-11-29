import { Router } from 'express';
import { index } from '../controllers/student.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', ensureAuth, index);

export default router;