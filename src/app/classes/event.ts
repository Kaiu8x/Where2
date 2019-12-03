import { Message } from './message';
import { Location } from './Location';
import {invite_status} from "./invite_status";
// tslint:disable:variable-name
export class Event {
  public id: number;
  public name: string;
  public description: string;
  public direction: Location;
  public date: string;
  public category: number;
  public owner_id: number;
  public invited: invite_status[];
  public messages: Message[];
  public photoUrls: string[];
  public constructor() {}
}
