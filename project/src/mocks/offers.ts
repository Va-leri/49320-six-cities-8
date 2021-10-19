// import { nanoid } from 'nanoid';
import { Offers } from '../types/offers';
import { generateDescription } from '../utils';
import { Ids } from './offer-ids';
import { users } from './users';


export const offers: Offers = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': ['Heating', 'Kitchen', 'Washing machine', 'Coffee machine'],
    'host': users[0],
    'id': Ids[0],
    'images': ['img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': false,
    'isPremium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8,
    },
    'maxAdults': 4,
    'previewImage': 'img/apartment-01.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
  },
  {
    'bedrooms': 4,
    'city': {
      'location': {
        'latitude': 49.172438329517824,
        'longitude': 2.131909909502689,
        'zoom': 10,
      },
      'name': 'Paris',
    },
    'description': generateDescription(),
    'goods': ['Cable TV', 'Washing machine', 'Dishwasher'],
    'host': users[1],
    'id': Ids[1],
    'images': ['img/apartment-03.jpg', 'img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 49.18,
      'longitude': 2.14,
      'zoom': 8,
    },
    'maxAdults': 1,
    'previewImage': 'img/apartment-02.jpg',
    'price': 20,
    'rating': 4.8,
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'room',
  },
  {
    'bedrooms': 2,
    'city': {
      'location': {
        'latitude': 51.16251418218736,
        'longitude': 6.902640437514056,
        'zoom': 10,
      },
      'name': 'Cologne',
    },
    'description': generateDescription(),
    'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    'host': users[2],
    'id': Ids[2],
    'images': ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 51.1,
      'longitude': 6.91,
      'zoom': 8,
    },
    'maxAdults': 4,
    'previewImage': 'img/apartment-03.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'house',
  },
  {
    'bedrooms': 1,
    'city': {
      'location': {
        'latitude': 51.33043689536671,
        'longitude': 6.787502744645261,
        'zoom': 10,
      },
      'name': 'Dusseldorf',
    },
    'description': generateDescription(),
    'goods': ['Cable TV', 'Dishwasher'],
    'host': users[3],
    'id': Ids[3],
    'images': ['img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': false,
    'isPremium': true,
    'location': {
      'latitude': 51.34,
      'longitude': 6.77,
      'zoom': 8,
    },
    'maxAdults': 1,
    'previewImage': 'img/apartment-small-04.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'hotel',
  },
];
