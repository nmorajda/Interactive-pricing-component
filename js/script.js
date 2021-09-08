// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const offer = [
  {
    price: 8,
    pageViews: 25,
  },
  {
    price: 12,
    pageViews: 50,
  },
  {
    price: 16,
    pageViews: 100,
  },
  {
    price: 20,
    pageViews: 150,
  },
  {
    price: 25,
    pageViews: 200,
  },
];

let state = {
  price: offer[2].price,
  pageViews: offer[2].pageViews,
  discount: false,
};

const updateState = newState => {
  state = { ...state, ...newState };
  updateUi();
  console.log(state);
};

const elemPriceValue = document.getElementById('priceValue');
const elemPageViewValue = document.getElementById('pageViewValue');
const btnToggle = document.getElementById('btnToggle');
const inpRange = document.querySelector('input[type="range"]');
const progressBar = document.getElementById('progressBar');

const totalPrice = () => {
  return state.discount ? state.price - state.price * 0.25 : state.price;
};

const updateUi = () => {
  const { price } = state;
  elemPriceValue.textContent = formatter.format(totalPrice());
  elemPageViewValue.textContent = state.pageViews;
};

btnToggle.addEventListener('click', () => {
  updateState({ discount: !state.discount });
  btnToggle.classList.toggle('is-active');
});

inpRange.addEventListener('input', () => {});

inpRange.addEventListener('change', e => {
  const pageViews = offer[e.target.value].pageViews;
  const price = offer[e.target.value].price;

  updateState({ price, pageViews });
  progressBar.style.width = e.target.value * 25 + '%';
  console.log(e.target.value * 25 + '%');
});

updateUi();
