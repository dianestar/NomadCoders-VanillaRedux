import { legacy_createStore } from "redux";
// store란 data(state)를 넣는 곳
// 리덕스 최신 버전에서는 creaeStore deprecated
// 그대료 사용해도 작동은 하나, legacy_createStore 쓰면 취소선이 나타나지 않음

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const reducer = (state = 0) => {
  console.log(state);
  return state;
};
// reducer는 함수 형태여야 함
// 1. store를 만든다 data를 저장하는 곳
// 2. reducer를 만든다 reducer는 함수다 data를 modify하는!
// reducer가 data를 바꿔준다 return 하는 것이 application에 있는 data가 된다

const store = legacy_createStore(reducer);
// Error: Expected the reducer to be a function
// createStore라는 reducer를 주기를 요구함
console.log(store);
console.log(store.getState());

let count = 0; // 바뀌는 값 data
number.innerText = count;

// HTML에게 무언가 바꼈다고 알려줄 함수를 따로 선언해주고 호출해주어야 함! 😥
const updateText = () => {
  number.innerText = count;
}

const handlePlus = () => {
  count++;
  console.log(count); // count 값은 변하지만 화면에 보여지는 숫자는 바뀌지 않음
  updateText();
}

const handleMinus = () => {
  count--;
  console.log(count);
  updateText();
}

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);