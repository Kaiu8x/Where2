import { Message } from './message';
import { Location } from './Location';
// tslint:disable:variable-name
export class Event {
  public id: number;
  public name: string;
  public description: string;
  public direction: Location;
  public date: string;
  public category: number;
  public owner_id: number;
  public invited: number[];
  public messages: Message[];
  public photoUrls: string[];
  public constructor() {}
}
