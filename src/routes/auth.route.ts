import { Router } from 'express';
import passport from 'passport';
import { signIn, signOut } from '../controllers/auth.controller';

const router: Router = Router();

router.get('/sign-in', signIn);
router.post('/sign-out', signOut);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export default router;