import {Event} from './event';
export class User {
  id: number;
  firstName: string;
  lastName: string;
  events: Event[];
  friends: User[];
  profileImg: string;
}
