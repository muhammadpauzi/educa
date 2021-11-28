import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { Application } from 'express';
import { User } from '../models';
import IPassportUser from '../interfaces/passport.interface';

export const initPassport = (app: Application): void => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: "/google/callback"
    },
        async (accessToken, refreshToken, { id, displayName, photos, emails }, done): Promise<void> => {
            const newUser = {
                googleId: id,
                name: displayName,
                image: photos && photos[0].value,
                email: emails && emails[0].value
            };

            try {
                let user = await User.findOne({
                    where: { googleId: id },
                });

                if (!user)
                    user = await User.create(newUser);

                return done(null, user.toJSON());
            } catch (error: any) {
                console.log(error.message);
                return done(error, undefined);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (_user: IPassportUser, done) => {
        try {
            const user = await User.findOne({ where: { googleId: _user.googleId } });
            done(null, user?.toJSON());
        } catch (error) {
            done(error, null)
        }
    });
}

