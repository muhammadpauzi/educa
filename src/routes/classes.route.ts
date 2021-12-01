import { Router } from 'express';
import { index, create, store, _class, inviteLink, invite, students, updateClassCode, deleteClass, followedClasses, joinPost, join, update, updatePut } from '../controllers/class.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', ensureAuth, index);
router.get('/create', ensureAuth, create);
router.post('/create', ensureAuth, store);
router.get('/:id/update', ensureAuth, update);
router.put('/:id/update', ensureAuth, updatePut);
router.get('/join', ensureAuth, join);
router.post('/join', ensureAuth, joinPost);
router.get('/followed-classes', ensureAuth, followedClasses);
router.get('/:id', ensureAuth, _class);
router.get('/:id/invite-link', ensureAuth, inviteLink);
router.get('/:id/invite', ensureAuth, invite);
router.get('/:id/students', ensureAuth, students);
router.put('/:id/code', ensureAuth, updateClassCode);
router.delete('/:id', ensureAuth, deleteClass);

export default router;