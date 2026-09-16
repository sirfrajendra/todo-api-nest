import { AuthUser } from '../auth/auth-user.js';

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
    }
  }
}