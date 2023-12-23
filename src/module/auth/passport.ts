import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { IPayload } from '../../@types';
import config from '../../config';
import { TOKEN_TYPES } from '../../constants';

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (payload: IPayload, done: any) => {
    try {
      if (payload.type !== TOKEN_TYPES.ACCESS) {
        throw new Error('Invalid token type');
      }
      done(null, payload);
    } catch (err) {
      done(err, false);
    }
  }
);

export default jwtStrategy;
