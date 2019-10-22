import {Event} from './event';
export class User {
  firstName: string;
  lastName: string;
  events: Event[];
  friends: User[];
  profileImg: string;
}
