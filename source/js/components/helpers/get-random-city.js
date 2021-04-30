import CZ from './../countries/cities/cz';
import HU from './../countries/cities/hu';
import LT from './../countries/cities/lt';
import SK from './../countries/cities/sk';
import RO from './../countries/cities/ro';
import PL from './../countries/cities/pl';
import BG from './../countries/cities/bg';
import RU from './../countries/cities/ru';
import getRandomArrayItem from "./get-random-array-item";

const dictionary = {
  cz: CZ,
  hu: HU,
  lt: LT,
  sk: SK,
  ro: RO,
  pl: PL,
  bg: BG,
  ru: RU
};

function getRandomCity(lang) {
  return getRandomArrayItem(dictionary[lang]);
}

export default getRandomCity;
