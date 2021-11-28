import { Router } from 'express';
import passport from 'passport';
import { signIn, signOut } from '../controllers/auth.controller';
import { ensureAuth, ensureGuest } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/sign-in', ensureGuest, signIn);
router.post('/sign-out', ensureAuth, signOut);

router.post('/google', ensureGuest, passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', ensureGuest,
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export default router;