import { Router } from 'express';
import { index, create, store, _class, inviteLink } from '../controllers/class.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', ensureAuth, index);
router.get('/create', ensureAuth, create);
router.post('/create', ensureAuth, store);
router.get('/:id', ensureAuth, _class);
router.get('/:id/invite-link', ensureAuth, inviteLink);

export default router;