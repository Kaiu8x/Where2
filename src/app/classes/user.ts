import { Event } from './event';
export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  friends: string[];
  photoUrl: string;
  token?: string;
}
