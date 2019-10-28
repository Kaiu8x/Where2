import {Event} from '../classes/event';
// import {Message} from '../classes/Message';

export const events: Array<any> = [
  {
    id: 1,
    title: 'Drink or Int?',
    description: 'Halloween Party for ITC students',
    location: [1234.5678, 1234.5678],
    ownerId: 1,
    date: new Date('2019-10-27'),
    invitedId: [2, 3, 4, 5, 6],
    acceptedId: [7, 8, 9],
    thread: [],
    image:
      'https://cdn.asiatatler.com/asiatatler/sg/i/2018/09/05175509-2017BangBangF1WeekendImage_resized_1999x1277.jpg'
  },
  {
    id: 2,
    title: 'Super Bowl',
    description: 'Hang with your friends to watch this year Super Bowl',
    location: [2345.6789, 2345.6789],
    date: new Date('2019-10-28'),
    ownerId: 2,
    invitedId: [1, 3, 4],
    thread: [],
    image: 'https://cdn-s3.si.com/images/NFL_Season_Predictions_1.jpg'
  },
  {
    id: 3,
    title: 'Six Flags Day',
    description: 'Plan to go with your friends to Six Flags all day long',
    location: [3456.789, 3456.789],
    date: new Date('2019-10-29'),
    ownerId: 3,
    invitedId: [2, 1, 4, 5, 6, 7, 8],
    thread: [],
    image: 'https://allears.net/wp-content/uploads/2019/04/Six-Flags-Promo.jpeg'
  },
  {
    id: 4,
    title: 'BWW Best Wings Ever',
    description:
      'Plan to go to the best wings in Mexico City, Buffalo Wild Wings',
    location: [4567.8901, 4567.8901],
    date: new Date('2019-10-30'),
    ownerId: 1,
    invitedId: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    thread: [],
    image: 'https://www.gannett-cdn.com/-mm-/d7ac9b920d336ef76c58a5b3a3afb042000218bd/c=0-26-580-461/local/-/media/2018/01/24/USATODAY/usatsports/buffalo-wild-wings-bwld-chicken-soda-beer-sports-source-bwld_large.jpg?width=540&height=405&fit=crop'
  },
  {
    id: 5,
    title: 'Halloween Party',
    description: 'It\'s Halloween, let\'s celebrate with the biggest party ever',
    location: [5678.9012, 5678.9012],
    date: new Date('2019-11-15'),
    ownerId: 4,
    invitedId: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25
    ],
    thread: [],
    image: 'https://isnamsterdam.nl/wp-content/uploads/2019/09/img6887.jpg'
  }
];
