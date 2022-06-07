import { legacy_createStore } from "redux";

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// refactoring #2 string 대신 constant variable 사용
const PLUS = "PLUS";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  console.log(count, action);

  // refactoring #1 if-else문을 switch문으로 수정
  switch (action.type) {
    case PLUS:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }

  /*
  if (action.type === "PLUS") {
    return count + 1;
  }
  else if (action.type === "MINUS") {
    return count - 1;
  }
  else {
    return count;
  }
  */
};

const countStore = legacy_createStore(countModifier);

// action은 redux에서 function을 부를 때 두 번째 parameter 혹은 argument로
// reducer와 소통하기 위한 방법
// actions must be plain objects!
// actions may not have an undefined "type" property! action은 무조건 type이 있어야함
// reducer에게 action을 보내는 방법 dispatch
/*
countStore.dispatch({type: "PLUS"});
countStore.dispatch({type: "MINUS"});
*/

const handlePlus = () => {
  countStore.dispatch({type:PLUS});
}

const handleMinus = () =>{
  countStore.dispatch({type:MINUS});
}

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);

// subscribe는 store 안에 있는 변화들을 알 수 있게 해줌
// onChange 함수는 store에 변화가 있을 때마다 감지해서 호출될 것
const onChange = () => {
  console.log("there was a change on the store!");
  number.innerText = countStore.getState();
}
countStore.subscribe(onChange);