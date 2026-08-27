import balcony from './assets/balcony.jpg'
import facade from './assets/facade.jpg'
import roofs from './assets/roofs.jpg'
import oldtown from './assets/oldtown.jpg'
import lounge from './assets/lounge.jpg'
import corner from './assets/corner.jpg'
import wall from './assets/wall.jpg'
import light from './assets/light.jpg'
import shelves from './assets/shelves.jpg'
import breakfast from './assets/breakfast.jpg'
import table from './assets/table.jpg'

export const HOUSE = {
  name: 'The Balcony House',
  street: '14 Amaghleba Street',
  district: 'Sololaki',
  city: 'Tbilisi 0105, Georgia',
  phone: '+995 322 47 66 12',
  email: 'stay@balconyhouse.ge',
  checkIn: '14:00',
  checkOut: '11:00',
}

export const ROOMS = [
  {
    id: 'balcony-double',
    name: 'The Balcony Double',
    rate: 210,
    sleeps: 2,
    size: '22 m²',
    bed: 'King',
    aspect: 'Onto the carved balcony',
    blurb:
      'The room the house is named for. Two doors open straight onto the shaded '
      + 'wooden balcony, which you have to yourself until someone else takes the room.',
    features: ['Private balcony', 'Ensuite with bath', 'Air conditioning', 'Desk'],
  },
  {
    id: 'courtyard-twin',
    name: 'Courtyard Twin',
    rate: 175,
    sleeps: 2,
    size: '19 m²',
    bed: 'Two singles',
    aspect: 'Over the courtyard',
    blurb:
      'Quiet at the back of the house, looking down into the courtyard and the fig '
      + 'tree. The coolest room in the building in August.',
    features: ['Ensuite shower', 'Air conditioning', 'Reading chairs'],
  },
  {
    id: 'attic-studio',
    name: 'Attic Studio',
    rate: 240,
    sleeps: 3,
    size: '31 m²',
    bed: 'King + single',
    aspect: 'Rooftops to Narikala',
    blurb:
      'The whole top floor, with a kitchenette and windows on three sides. Two flights '
      + 'of stairs and no lift — worth it for the view at dusk.',
    features: ['Kitchenette', 'Ensuite with bath', 'Sofa', 'Roof view'],
  },
  {
    id: 'garden-single',
    name: 'Garden Single',
    rate: 130,
    sleeps: 1,
    size: '14 m²',
    bed: 'Double',
    aspect: 'Ground floor, onto the garden',
    blurb:
      'Small, plain and the best value in the house. Its own door into the courtyard, '
      + 'which regulars treat as a private terrace.',
    features: ['Ensuite shower', 'Own entrance', 'Air conditioning'],
  },
]

export const SPACES = [
  {
    photo: lounge,
    title: 'The morning room',
    body: 'Breakfast until eleven, and coffee whenever. Nobody minds if you sit here '
      + 'all afternoon with a laptop.',
  },
  {
    photo: shelves,
    title: 'The library corner',
    body: 'Two hundred books left behind by guests, in a dozen languages. Take one, '
      + 'leave one, or just read it here.',
  },
  {
    photo: corner,
    title: 'The courtyard',
    body: 'A fig tree, six chairs and a table that comfortably seats more people than '
      + 'it should. Where most evenings end up.',
  },
]

export const GALLERY = [
  { src: balcony, alt: 'A carved wooden balcony in Old Tbilisi' },
  { src: facade, alt: 'The brick and timber facade of an old Tbilisi house' },
  { src: roofs, alt: 'Tiled rooftops across the old town' },
  { src: oldtown, alt: 'Old Tbilisi seen from above' },
  { src: light, alt: 'Shelves of books in the house library' },
  { src: wall, alt: 'A wall of framed pictures in the house' },
  { src: breakfast, alt: 'A laid breakfast table' },
  { src: table, alt: 'Breakfast plates on a wooden table' },
]

export const NEARBY = [
  ['2 min', 'Gudiashvili Square and the Sololaki backstreets'],
  ['8 min', 'The sulphur baths and Abanotubani'],
  ['10 min', 'Rustaveli Avenue and the metro'],
  ['15 min', 'Narikala fortress, on foot up the hill'],
  ['25 min', 'Tbilisi airport by taxi, outside rush hour'],
]

export const FAQ = [
  {
    q: 'Is there a lift?',
    a: 'No. It is a nineteenth-century house on three floors and the stairs are '
      + 'original. The Garden Single is the only room at ground level.',
  },
  {
    q: 'Can we arrive late?',
    a: 'Yes. Tell us your flight and someone will wait up. There is no automated '
      + 'lockbox — a person lets you in.',
  },
  {
    q: 'Do you take children?',
    a: 'Gladly. The Attic Studio takes three, and we can add a cot to any room at '
      + 'no charge. The balcony has a low rail, so watch small ones.',
  },
  {
    q: 'Is breakfast included?',
    a: 'It is, and it is cooked rather than laid out cold. Tell us the night before '
      + 'if you need it early.',
  },
]
