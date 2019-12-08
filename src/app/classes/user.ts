import {Event} from './event';
export class User {
  id: string;
  firstName: string;
  lastName: string;
  events: Event[];
  friends: User[];
  profileImg: string;
}
