import { Router } from 'express';
import { index } from '../controllers/dashboard.controller';

const router: Router = Router();

router.get('/', index);

export default router;