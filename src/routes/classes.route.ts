import { Router } from 'express';
import { index, create, store, _class } from '../controllers/class.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', ensureAuth, index);
router.get('/create', ensureAuth, create);
router.post('/create', ensureAuth, store);
router.get('/:id', ensureAuth, _class);

export default router;