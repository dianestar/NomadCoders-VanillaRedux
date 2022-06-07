// import { legacy_createStore } from "redux";
import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");
/*
const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
    return {
        type: ADD,
        text,
    };
}

const deleteToDo = (id) => {
    return {
        type: DELETE,
        id: parseInt(id),
    };
}
*/

// using crateReducer allows mutating state!
// TWO options i) 새로운 state를 리턴 ii) mutate state (redux-toolkit이 immer 하에 작동하기 때문?!)
/*
const reducer = createReducer([], {
    [addToDo]: (state, action) => {
        // option ii)
        state.push({ text: action.payload, id: Date.now() });
    },
    [deleteToDo]: (state, action) => {
        // option i)
        state.filter((toDo) => toDo.id !== action.paylaod);
    }
});
*/

// createSlice는 reducer 뿐만 아니라 actions도 생성해줌
const toDos = createSlice({
    name: "toDosReducer",
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ text: action.payload, id: Date.now() });
        },
        remove: (state, action) => 
            state.filter((toDo) => toDo.id !== action.payload)
    }
})

/*
const reducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        // case ADD:
        case addToDo.type:
            //action.text ❌
            return [{ text: action.payload, id: Date.now() }, ...state];
        // case DELETE:
        case deleteToDo.type:
            //action.id ❌
            return state.filter((toDo) => toDo.id !== action.payload);
        default:
            return state;
    }
}
*/

// defualt 추가됨 zero configuration에서도 redux dev tools 사용 가능
// const store = configureStore({reducer});

// createSlice로 만든 toDos의 reducer를 export해서 store의 reducer를 재설정
const store = configureStore({reducer: toDos.reducer });
console.log(toDos.actions); // {add: f, remove:f}

// const store = legacy_createStore(reducer);

export const {
    add,
    remove,
} = toDos.actions;

/*
export const actionCreators = {
    addToDo,
    deleteToDo,
};
*/

export default store;