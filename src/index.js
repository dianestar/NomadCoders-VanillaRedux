import { legacy_createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// 배열을 직접 관리 해줘야 함!
// const toDos = [];

// more comfortable redux way!
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// 액션만 넣어주는 함수를 따로 선언해서 사용할 수도 있음
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
}

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // state.push(action.text) 불가능!
      // return [...state, {text: action.text, id: Date.now() }];
      // 최신순으로 저장하고 싶다면 아래와 같이 수정
      return [{text: action.text, id: Date.now()}, ...state];
    case DELETE_TODO:
      // a filter() method creates a new array with all elements that pass the test!
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
}

const store = legacy_createStore(reducer);

store.subscribe(() => console.log(store.getState()) )

/*
const deleteToDo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch({type: DELETE_TODO, id: id});
}
*/

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // 이 코드가 없다면 매번 모든 항목들을 repaint하는 문제 발생
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(paintToDos);

const createToDo = (toDo) => {
  const li = document.createElement("li");
  li.innerText = toDo;
  ul.appendChild(li);
}

/*
const addToDo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
}
*/

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
}

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // createToDo(toDo);

  // text: toDo 를 추가함으로써 우리가 원하는 텍스트를 액션에 넘겨줄 수 있음
  // store.dispatch({ type: ADD_TODO, text: toDo });
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit);

// ⭐ NEVER MUTATE STATE!
// cf. Three Principles of redux
// 1. Single source of truth
// 2. State is read-only (store를 수정할 수 있는 유일한 방법은 action을 보내는 방법 뿐)
// 3. Changes are made with pure functions (mutating state 하는 대신에 new state objects를 리턴)
// mutation이란? const friends = [["A"]; friends.push("B"); 변형하는 것!