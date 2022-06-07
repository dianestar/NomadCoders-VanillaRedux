import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators, /*addToDo*/ } from "../store";
import ToDo from "../components/ToDo";

const Home = ({toDos, /*dispatch*/ addToDo }) => {
    // console.log(props);
    const [text, setText] = useState("");
    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(text);
        setText("");
        // dispatch(addToDo(text));
        addToDo(text);
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange}/>
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => <ToDo {...toDo} key={toDo.id} />)}
            </ul>
        </>
    )
}

// mapStateToProps (getState)
function mapStateToProps(state, ownProps) {
    // 첫 번째 argument는 redux store에서 온 state, 두 번째 argument는 component의 props
    console.log(state, ownProps);
    return { toDos: state };
}

// mapDispatchToProps (dispatch)
function mapDispatchToProps(dispatch, ownProps) {
    // return { dispatch };
    return {
        addToDo: (text) => dispatch(actionCreators.addToDo(text))
    };
}

// connect()는 component로 보내는 props에 추가될 수 있도록 허용함
export default connect(mapStateToProps, mapDispatchToProps)(Home);