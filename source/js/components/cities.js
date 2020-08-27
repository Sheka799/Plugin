import CZ from './countries/cities/cs';
import HU from './countries/cities/hu';
import LT from './countries/cities/lt';
import SK from './countries/cities/sk';
import RO from './countries/cities/ro';
import PL from './countries/cities/pl';
import BG from './countries/cities/bg';

function getCurrentCity() {
  if (!localStorage.hasOwnProperty(`city`)) {
    return null;
  }
  return localStorage.getItem(`city`);
}

export function getCity(city) {
  const cities = Object.assign({}, CZ, HU, LT, SK, RO, PL, BG);
  return cities.hasOwnProperty(city) ? cities[city] : city;
}

export default getCurrentCity;
