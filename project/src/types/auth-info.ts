import { Token } from '../services/token';
import { User } from './user';

export type AuthInfo = User & {
  email: string,
  token: Token,
}
