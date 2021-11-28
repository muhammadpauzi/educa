import { Router, Request, Response } from 'express';
import passport from 'passport';
import { signIn, signOut } from '../controllers/auth.controller';
import { ensureAuth, ensureGuest } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/sign-in', ensureGuest, signIn);
router.post('/sign-out', ensureAuth, signOut);

router.post('/google', ensureGuest, passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', ensureGuest,
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
    function (req: Request, res: Response) {
        // Successful authentication, redirect home.
        req.flash('success', 'Congratulations, you have successfully signed in!');
        res.redirect('/');
    });

export default router;