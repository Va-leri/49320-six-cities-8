import { Offers } from '../types/offers';
import { generateDescription } from '../utils';
import { Ids } from './offer-ids';
import { users } from './users';


export const offers: Offers = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.37611047039797,
        'longitude': 4.904427979397728,
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
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
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
        'latitude': 52.37611047039797,
        'longitude': 4.904427979397728,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': generateDescription(),
    'goods': ['Cable TV', 'Washing machine', 'Dishwasher'],
    'host': users[1],
    'id': Ids[1],
    'images': ['img/apartment-03.jpg', 'img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 52.369553943508,
      'longitude': 4.85309666406198,
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
        'latitude': 52.37611047039797,
        'longitude': 4.904427979397728,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': generateDescription(),
    'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    'host': users[2],
    'id': Ids[2],
    'images': ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
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
        'latitude': 52.37611047039797,
        'longitude': 4.904427979397728,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': generateDescription(),
    'goods': ['Cable TV', 'Dishwasher'],
    'host': users[3],
    'id': Ids[3],
    'images': ['img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': false,
    'isPremium': true,
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 8,
    },
    'maxAdults': 1,
    'previewImage': 'img/apartment-small-04.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'hotel',
  },


  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 48.962130559647285,
        'longitude': 2.3241526105766597,
        'zoom': 10,
      },
      'name': 'Paris',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': ['Heating', 'Kitchen', 'Washing machine', 'Coffee machine'],
    'host': users[0],
    'id': Ids[0],
    'images': ['img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': false,
    'isPremium': false,
    'location': {
      'latitude': 48.9909553943508,
      'longitude': 2.35309666406198,
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
        'latitude': 51.01675242696989,
        'longitude': 6.996752725636304,
        'zoom': 10,
      },
      'name': 'Cologne',
    },
    'description': generateDescription(),
    'goods': ['Cable TV', 'Washing machine', 'Dishwasher'],
    'host': users[1],
    'id': Ids[1],
    'images': ['img/apartment-03.jpg', 'img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 51.069553943508,
      'longitude': 6.95309666406198,
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
        'latitude': 51.01675242696989,
        'longitude': 6.996752725636304,
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
      'latitude': 51.0909553943508,
      'longitude': 6.929309666406198,
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
        'latitude': 50.936552719576035,
        'longitude': 4.386363794792568,
        'zoom': 10,
      },
      'name': 'Brussels',
    },
    'description': generateDescription(),
    'goods': ['Cable TV', 'Dishwasher'],
    'host': users[3],
    'id': Ids[3],
    'images': ['img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    'isFavorite': false,
    'isPremium': true,
    'location': {
      'latitude': 50.9809553943508,
      'longitude': 4.339309666406198,
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
