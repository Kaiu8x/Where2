import {Event} from './event';
export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  events: Event[];
  friends: User[];
  profileImg: string;
  token?: string;
}
