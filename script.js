const input = document.querySelector('.input');
const main = document.querySelector('.main');
const buttons = document.querySelectorAll('.button--number');

let resoult = 0;
let num = '';
let enter = [];
let flag = false;

const removeAll = function () {
  num = '';
  enter = [];
  input.textContent = enter;
  flag = false;
};

const math_it_up = {
  '+': function (x, y) {
    return x + y;
  },
  '-': function (x, y) {
    return x - y;
  },
  '*': function (x, y) {
    return x * y;
  },
  '/': function (x, y) {
    return x / y;
  },
};

main.addEventListener('click', function (e) {
  if (e.target.classList[1] == 'button--number') {
    let clickedNumber = e.target.classList[0];

    if (clickedNumber === '←') {
      if (enter != '') {
        if (num != '') {
          num = '';
        } else enter.pop();
      } else enter = [];

      input.textContent = enter.join(' ');
    } else if (clickedNumber === 'C') {
      removeAll();
    } else if (
      clickedNumber === '+' ||
      clickedNumber === '-' ||
      clickedNumber === '*' ||
      clickedNumber === '/'
    ) {
      flag = false;
      num != '' ? enter.push(num) : (num = '');
      if (enter.length != 0 && num != '') {
        num = '';
        enter.push(clickedNumber);
        input.textContent = enter.join(' ');
      }
    } else if (clickedNumber === '↵') {
      if (num != '') {
        enter.push(num);
      }
      num = '';
      resoult = enter.reduce(function (acc) {
        for (let i = 0; i < enter.length - 1; i++) {
          if (enter[i] === '*') {
            (acc = math_it_up['*'](+enter[i - 1], +enter[i + 1])),
              enter.splice(i - 1, 3),
              enter.unshift(`${acc}`);
          } else if (enter[i] === '/') {
            (acc = math_it_up['/'](+enter[i - 1], +enter[i + 1])),
              enter.splice(i - 1, 3),
              enter.unshift(`${acc}`);
          } else if (enter[i] === '+') {
            (acc = math_it_up['+'](+enter[i - 1], +enter[i + 1])),
              console.log(+enter[i - 1]),
              console.log(+enter[i + 1]),
              enter.splice(i - 1, 3),
              enter.unshift(`${acc}`);
          } else if (enter[i] === '-') {
            (acc = math_it_up['-'](+enter[i - 1], +enter[i + 1])),
              enter.splice(i - 1, 3),
              enter.unshift(`${acc}`);
          }
          console.log(enter);
        }
        return acc;
      }, 0);

      input.textContent = resoult;
      console.log(resoult);
      enter = [];
      flag = true;
      num = resoult;
    } else {
      if (!flag) {
        num != '' ? (num = `${num}${clickedNumber}`) : (num = clickedNumber),
          (input.textContent = `${enter.join(' ')} ${num}`);
      } else {
        removeAll(),
          (num = `${num}${clickedNumber}`),
          (input.textContent = `${enter.join(' ')} ${num}`);
      }
    }

    console.log(enter);
  }
});
