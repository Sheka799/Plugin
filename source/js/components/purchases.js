import getRandomGender from "./helpers/get-random-gender";
import getRandomInteger from "./helpers/get-random-integer";
import names from "./countries/names/names";
import getRandomName from "./helpers/get-random-name";
import getRandomCity from "./helpers/get-random-city";

let Name, Present, Gender, Count;

// Счетчик
let hours = 24;
    let saved = localStorage.getItem('saved')
    if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
      localStorage.clear()
    }
    localStorage.setItem('saved', new Date().getTime());

function Purchases({lang, count, replace, gender, start, time, name, present, point}) {
  this.countAmount = [2, 3, 4, 5];
  this.lang = lang;

this.name = name;
Name = name;
if (Name == undefined || Name == '') {
  Name = 'name';
}

  this.gender = gender || [`male`, `female`];
  this.point = point;
  let Point = document.querySelectorAll(this.point)[0];

  if (gender == '' || gender == undefined) {
    gender = ['male', 'female'];
  }
  Gender = gender;

  this.present = present;
  Present = present;
  if (Present == undefined || Present == true || Present == null) {
    Present = true;
  } else if (Present == false) {
    Present = false;
  }

  this.count = (count && count < 10) ? count : 10;
  Count = count;

  this.start = start || getRandomInteger(10000, 15000);
  this.time = time || 15000;

  if (replace) {
    this.replace = replace;
  }

  if (localStorage.getItem(`purchases`) !== null) {
    const {countOrder, customers, numberPurchase} = JSON.parse(localStorage.getItem(`purchases`));
    this.countOrder = countOrder;
    this.customers = customers;
    this.numberPurchase = numberPurchase;
  } else if (Point)  {


      if (localStorage.getItem(`purchases`) === null) {

        let r = Point.offsetTop;
      function throttle(func, ms) {
        let isThrottled = false,
          savedArgs,
          savedThis;
        function wrapper() {
          if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
          }

          func.apply(this, arguments);

          isThrottled = true;

          setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
              wrapper.apply(savedThis, savedArgs);
              savedArgs = savedThis = null;
            }
          }, ms);
        }

        return wrapper;
      }

      var showThrottle = throttle(()=> {

        if (window.window.pageYOffset + window.innerHeight > r) {
          this.numberPurchase = 1;
          this.getCustomers()
          this.getCountOrder()
          localStorage.setItem(`purchases`, JSON.stringify(this));
          this.prepare();
          window.removeEventListener("scroll", showThrottle);

        }
      }, 100);

      window.addEventListener("scroll", showThrottle);
    }

  } else {
    if (localStorage.getItem(`purchases`) === null) {
      this.numberPurchase = 1;
          this.getCustomers();
          this.getCountOrder();
          localStorage.setItem(`purchases`, JSON.stringify(this));
  }
  }
  if (Point) {
    if (localStorage.getItem(`purchases`) === null) {
    console.log('');
    } else {
      this.prepare();
    }
  } else {
    this.prepare();
  }
}

Purchases.prototype.names = names;

Purchases.prototype.getRandomCity = function () {
  return getRandomCity(this.lang);
};


Purchases.prototype.getCustomers = function () {
  if (this.lang == '') {
    this.customers = 0;
    console.log('error');
  } else if (this.lang == ['pl'] || this.lang == ['hu'] || this.lang == ['sk'] || this.lang == ['cz'] || this.lang == ['bg'] || this.lang == ['ro'] || this.lang == ['lt']) {
  this.customers = [];
  let count = 1,
  numberPerson;
  let y = [];
  y.push('male', 'female');

  if (this.gender[0] + this.gender[1] == y[0] + y[1]) {
    numberPerson = this.names[this.lang].male.length / 2 + this.names[this.lang].female.length / 2;
  } else {
    numberPerson = this.names[this.lang][this.gender].length;
  }
  for (let i = 1; i < numberPerson; i++) {
    count--;
    let gender = getRandomGender(this.gender);
    let city = null;

    city = this.getRandomCity();

    if (count === 0) {
      count = 3;
    }

    this.customers.push({
      gender,
      city,
      name: this.getRundomGenderName(gender),
      count: this.countAmount[getRandomInteger(0, this.countAmount.length - 1)],
    });
  }

  let gender = getRandomGender(this.gender);

  this.customers.push({
    gender,
    city: this.getRandomCity(),
    name: this.getRundomGenderName(gender),
    count: 4,
  });
} else {
  this.customers = 0;
  console.log('The language is not supported!')
}
};


Purchases.prototype.getRundomGenderName = function (gender) {
 let fullName = this.names[this.lang][gender];
 let arrayName = fullName.map((item) => {
    return item.split(' ').slice(0, 1);
  })

  let cutName = fullName.map((item) => {
      let name = item.split(' ').slice(0, 1);
      let surname = item.split(' ').slice(1, 2);
      if (surname.join('').length > 3) {
      return `${name} ${(surname.join('').slice(0, -3) + '***')}`
      } else if (surname.join('').length == 3) {
        return `${name} ${(surname.join('').slice(0, 1) + '**')}`
      } else {
        return `${name} ${(surname.join('').slice(0, 1) + '*')}`
      }
    })

  let pushName;
  if (Name === 'full') {
    pushName = fullName;
  } else if (Name === 'name') {
    pushName = arrayName;
  } else if (Name === 'cut') {
    pushName = cutName;
  }

  return getRandomName(pushName);
};

Purchases.prototype.getCountOrder = function () {
  let count = 5;
  let current = 0;

  for (let i = 0; i < this.customers.length; i++) {
    current++;

    if (current === 3) {
      current = 0;
      continue;
    }

    count += this.customers[i].count;
  }

  this.countOrder = count;
};


// get city person
function getCity() {
  return fetch(`https://api.sypexgeo.net/json/`)
 .then((response) => response.json())
 .then((json) => {
   localStorage.setItem(`city`, json.city.name_en);
   return true;
 }).catch(() => false);

}
getCity();
//

Purchases.prototype.getOrder = function (gender) {
  const list = {
    ru: {male: `заказал`, female: `заказала`},
    en: {male: `requested`, female: `requested`},
    bg: {male: `заяви`, female: `заяви`},
    pl: {male: `poprosił`, female: `poprosiła`},
    ro: {male: `a solicitat`, female: `a solicitat`},
    sk: {male: `požiadal`, female: `požiadala`},
    cz: {male: `požádal`, female: `požádala`},
    lt: {male: `pateikė`, female: `pateikė`},
    hu: {male: `ingyenes`, female: `ingyenes`},
  };
  return list[this.lang][gender];
};

Purchases.prototype.getLeft = function (gender) {
  const list = {
    ru: {male: `оставил`, female: `оставила`},
    en: {male: `left`, female: `left`},
    bg: {male: `остави`, female: `остави`},
    pl: {male: `poprosił`, female: `poprosiła`},
    ro: {male: `a făcut`, female: `a făcut`},
    sk: {male: `zanechal`, female: `zanechala`},
    cz: {male: `požádal`, female: `požádala`},
    lt: {male: `pateikė`, female: `pateikė`},
    hu: {male: `visszahívást`, female: `visszahívást`},
  };
  return list[this.lang][gender];
};

Purchases.prototype.getReceive = function (gender) {
  const list = {
    ru: {male: `получил`, female: `получила`},
    en: {male: `received`, female: `received`},
    bg: {male: `получи`, female: `получи`},
    pl: {male: `otrzymał`, female: `otrzymała`},
    ro: {male: `a primit`, female: `a primit`},
    sk: {male: `si prevzal`, female: `si prevzala`},
    cz: {male: `obdržel`, female: `obdržela`},
    lt: {male: `gavo`, female: `gavo`},
    hu: {male: `rendelést`, female: `rendelést`},
  };
  return list[this.lang][gender];
};


Purchases.prototype.getOrderPurchase = function () {
  this.countOrder -= this.customer.count;

  if (Present == true) {
    if (this.customer.count == 3) {
      --this.countOrder;
      this.customer.count = 3 + '+' + 1;
    }
    else if (this.customer.count == 4) {
      this.countOrder = this.countOrder - 2;
      this.customer.count = 4 + '+' + 2;
    }
    else if (this.customer.count == 5) {
      this.countOrder = this.countOrder - 3;
      this.customer.count = 5 + '+' + 3;
    }
  }

  const list = {
    ru: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;шт.</span><br>Доставка в: ${this.customer.city}</div></div>`,
    en: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;шт.</span><br>Delivery to the city of: ${this.customer.city}</div></div>`,
    bg: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;бр.</span><br>Доставка до: ${this.customer.city}</div></div>`,
    pl: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;szt.</span><br>Dostawa w: ${this.customer.city}</div></div>`,
    ro: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;buc.</span><br>Livrare la: ${this.customer.city}</div></div>`,
    cz: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;ks.</span><br>Místo doručení: ${this.customer.city}</div></div>`,
    sk: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;ks.</span><br>Dodanie: ${this.customer.city}</div></div>`,
    lt: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;vnt.</span><br>Pristatymas į: ${this.customer.city}</div></div>`,
    hu: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;db-ot.</span><br>Kiszállítás ide: ${this.customer.city}</div></div>`,
  };
  return list[this.lang];
};
Purchases.prototype.getOrderPurchaseCity = function () {
  this.countOrder -= this.customer.count;

  if (Present == true) {
    if (this.customer.count == 3) {
      --this.countOrder;
      this.customer.count = 3 + '+' + 1;
    }
    else if (this.customer.count == 4) {
      this.countOrder = this.countOrder - 2;
      this.customer.count = 4 + '+' + 2;
    }
    else if (this.customer.count == 5) {
      this.countOrder = this.countOrder - 3;
      this.customer.count = 5 + '+' + 3;
    }
  }
  // loaction
  let localCity;
if (localStorage.getItem('city') !== '')
{
  localCity = localStorage.getItem('city');
} else {
    localCity = this.customer.city;
}
  const list = {
    ru: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;шт.</span><br>Доставка в: ${localCity}</div></div>`,
    en: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;шт.</span><br>Delivery to the city of: ${localCity}</div></div>`,
    bg: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;бр.</span><br>Доставка до: ${localCity}</div></div>`,
    pl: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;szt.</span><br>Dostawa w: ${localCity}</div></div>`,
    ro: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;buc.</span><br>Livrare la: ${localCity}</div></div>`,
    cz: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;ks.</span><br>Místo doručení: ${localCity}</div></div>`,
    sk: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;ks.</span><br>Dodanie: ${localCity}</div></div>`,
    lt: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;vnt.</span><br>Pristatymas į: ${localCity}</div></div>`,
    hu: `<div class="purchases purchases--bag purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getOrder(this.customer.gender)} ${this.customer.count}&nbsp;db-ot.</span><br>Kiszállítás ide: ${localCity}</div></div>`,
  };
  return list[this.lang];
};


Purchases.prototype.getPackagesPurchase = function () {
  const list = {
    ru: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;заказ ${this.customer.count}&nbsp;шт.</span><br>Заказ доставлен в: ${this.customer.city}</div></div>`,
    en: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;an order of ${this.customer.count}&nbsp;pcs.</span><br>The order has been delivered to: ${this.customer.city}</div></div>`,
    bg: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;поръчката от&nbsp;${this.customer.count}&nbsp;бр.</span><br>Поръчката беше доставена до: ${this.customer.city}</div></div>`,
    pl: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;zamówienie ${this.customer.count}&nbsp;szt.</span><br>Zamówienie dostarczono do miasta: ${this.customer.city}</div></div>`,
    ro: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;o comandă de&nbsp;${this.customer.count}&nbsp;buc.</span><br>Comanda a fost livrată&nbsp;la:&nbsp;${this.customer.city}</div></div>`,
    cz: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)} objednávku ${this.customer.count}&nbsp;ks.</span><br>Objednávka byla doručena do města: ${this.customer.city}</div></div>`,
    sk: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)} objednávku ${this.customer.count}&nbsp;kusov.</span><br>Objednávka bola doručená do mesta: ${this.customer.city}</div></div>`,
    lt: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)} ${this.customer.count}&nbsp;vnt.</span><br>Užsakymas pristatytas į: ${this.customer.city}</div></div>`,
    hu: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.customer.count}&nbsp;db-os ${this.getReceive(this.customer.gender)} vett át.</span><br>A rendelést ${this.customer.city} városába került kiszállítása.</div></div>`,
  };
  return list[this.lang];
};
Purchases.prototype.getPackagesPurchaseCity = function () {
  let localCity;
if (localStorage.getItem('city') !== '')
{
  localCity = localStorage.getItem('city');
} else {
    localCity = this.customer.city;
}
  const list = {
    ru: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;заказ ${this.customer.count}&nbsp;шт.</span><br>Заказ доставлен в: ${localCity}</div></div>`,
    en: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;an order of ${this.customer.count}&nbsp;pcs.</span><br>The order has been delivered to: ${localCity}</div></div>`,
    bg: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;поръчката от&nbsp;${this.customer.count}&nbsp;бр.</span><br>Поръчката беше доставена до: ${localCity}</div></div>`,
    pl: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;zamówienie ${this.customer.count}&nbsp;szt.</span><br>Zamówienie dostarczono do miasta: ${localCity}</div></div>`,
    ro: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)}&nbsp;o comandă de&nbsp;${this.customer.count}&nbsp;buc.</span><br>Comanda a fost livrată&nbsp;la:&nbsp;${localCity}</div></div>`,
    cz: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)} objednávku ${this.customer.count}&nbsp;ks.</span><br>Objednávka byla doručena do města: ${localCity}</div></div>`,
    sk: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)} objednávku ${this.customer.count}&nbsp;kusov.</span><br>Objednávka bola doručená do mesta: ${localCity}</div></div>`,
    lt: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.getReceive(this.customer.gender)} ${this.customer.count}&nbsp;vnt.</span><br>Užsakymas pristatytas į: ${localCity}</div></div>`,
    hu: `<div class="purchases purchases__post purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name} ${this.customer.count}&nbsp;db-os ${this.getReceive(this.customer.gender)} vett át.</span><br>A rendelést ${localCity} városába került kiszállítása.</div></div>`,
  };
  return list[this.lang];
};
Purchases.prototype.getApplication = function () {
  const list = {
    ru: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;заявку на обратный звонок</div></div>`,
    en: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;a request for a callback</div></div>`,
    bg: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;заявка за обаждане</div></div>`,
    pl: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;o oddzwonienie</div></div>`,
    ro: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;o solicitare pentru un apel</div></div>`,
    cz: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;o zpětné volání</div></div>`,
    sk: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;žiadosť o telefonát</div></div>`,
    lt: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;perskambinimui</div></div>`,
    hu: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getLeft(this.customer.gender)}&nbsp;kért</div></div>`,
  };
  return list[this.lang];
};
Purchases.prototype.getСonsultation = function () {
  const list = {
    ru: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;бесплатную консультацию</div></div>`,
    en: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;a free specialist consultation</div></div>`,
    bg: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;безплатна консултация със специалист</div></div>`,
    pl: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;o bezpłatną konsultację specjalisty</div></div>`,
    ro: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;consultanță gratuită cu un specialist</div></div>`,
    cz: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;o bezplatnou odbornou konzultaci</div></div>`,
    sk: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;o bezplatnú odbornú konzultáciu</div></div>`,
    lt: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;užklausą nemokamai specialisto konsultacijai</div></div>`,
    hu: `<div class="purchases purchases__call purchases--truck purchases--in"><div class="purchases__main"><span class="red">${this.customer.name}</span> ${this.getOrder(this.customer.gender)}&nbsp;szakértői konzultációt kért</div></div>`,
  };
  return list[this.lang];
};

Purchases.prototype.getStockBalancePurchase = function () {
  const list = {
    ru: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Остаток товара по акции:<br><span class="red">${this.countOrder} шт.</span></div></div>`,
    en: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Balance of goods under the promotion:<br><span class="red">${this.countOrder} pcs.</span></div></div>`,
    bg: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Баланс на промоционалните продукти:<br><span class="red">${this.countOrder} бр.</span></div></div>`,
    pl: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Pozostała ilość w promocji:<br><span class="red">${this.countOrder} szt.</span></div></div>`,
    ro: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Numărul articolelor rămase la reducere:<br><span class="red">${this.countOrder} buc.</span></div></div>`,
    cz: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Skladové zásoby zboží v akci:<br><span class="red">${this.countOrder} ks.</span></div></div>`,
    sk: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Počet kusov za akciovú cenu:<br><span class="red">${this.countOrder} ks.</span></div></div>`,
    lt: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">Akcijos prekių likutis:<br><span class="red">${this.countOrder} vnt.</span></div></div>`,
    hu: `<div class="purchases purchases__sail purchases--boxes purchases--in"><div class="purchases__main">A promócióban még elérhető termékek száma:<br><span class="red">${this.countOrder} db.</span></div></div>`,
  };
  return list[this.lang];
};

Purchases.prototype.getPeopleOnSite = function () {
  const list = {
    ru: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Поситителей онлайн: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    en: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Online Visitors: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    bg: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Онлайн посетители: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    pl: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Gości online: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    ro: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Vizitatori Online: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    cz: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Počet návštěvníků online: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    sk: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Online návštevníkov stránky: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    lt: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Lankytojų internete: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
    hu: `<div class="purchases purchases__people purchases--users purchases--in"><div class="purchases__main">Online látogatók: <span class="red">${getRandomInteger(42, 52)}</span></div></div>`,
  };
  return list[this.lang];
};

Purchases.prototype.replaceCountOrder = function () {
  if (this.replace) {
    const selectors = document.querySelectorAll(this.replace);
    if (selectors.length) {
      for (let i = 0; i < selectors.length; i++) {
        selectors[i].innerText = this.countOrder;
      }
    }
  }
};

Purchases.prototype.prepare = function () {
  const purchases = `<div class="purchases"></div>`;

  this.replaceCountOrder();
  if (this.customers.length > 0) {
    setTimeout(() => {
      document.body.insertAdjacentHTML(`beforeend`, purchases);
    }, this.start);

    setTimeout(() => {
      this.renderPurchases();
    }, this.start);
  }
};




// randoom number for random message
const array = [];

const randomInteger = (min, max) => {
  const rand = Math.floor(min + Math.random() * (max + 1 - min));

  if (~array.indexOf(rand)) return randomInteger(min, max);

  array.push(rand);

  if (array.length === 5) {
    array.length = 0;
  }

  return rand;
}

Purchases.prototype.randomMessage = function() {

  let content = null;
  let countRandom = randomInteger(0, 4);
    switch(countRandom)
    {
        case 0:
        content = this.getPeopleOnSite();
        break;

        case 1:
          this.customer = this.customers.pop();
          content = this.getPackagesPurchase();
        break;

        case 2:
          this.customer = this.customers.pop();
          content = this.getСonsultation();
        break;
        case 3:
          this.customer = this.customers.pop();
          content = this.getApplication();
        break;
        case 4:
          this.customer = this.customers.pop();
          content = this.getPackagesPurchaseCity();
        break;

}
return content
}

//

// let numberCount = 0;
Purchases.prototype.getNextPurchase = function () {
  let content = null;

  switch (this.numberPurchase) {
    case 1:
      content = this.getStockBalancePurchase();
      break;
    case 2:
      this.customer = this.customers.pop();
      content = this.getOrderPurchaseCity();
      break;
    case 3:
      content = this.randomMessage();
      break;
    case 4:
      this.customer = this.customers.pop();
      content = this.getOrderPurchase();
      break;
    case 5:
      content = this.randomMessage();
      break;
  }

  this.numberPurchase++;
  // if (this.numberPurchase > 5) {
  //   numberCount++;
  // }
  if (this.numberPurchase > 5) {
    this.numberPurchase = 1;
  }

  return content;
};

Purchases.prototype.renderPurchases = function () {
  document.body.insertAdjacentHTML(`beforeend`, this.getNextPurchase());

  this.replaceCountOrder();

  localStorage.setItem(`purchases`, JSON.stringify(this));

  setTimeout(() => {
    document.querySelector(`.purchases`).classList.remove(`purchases--in`);
    document.querySelector(`.purchases`).classList.add(`bounceOutLeft`);
  }, this.time);

  setTimeout(() => {
    document.querySelector(`.purchases`).remove();
  }, 150);


  if (this.customers.length > 0) {
    setTimeout(() => {
      this.renderPurchases();
    }, getRandomInteger(this.time + 15000, this.time + 30000));
  }
};

export default Purchases;
