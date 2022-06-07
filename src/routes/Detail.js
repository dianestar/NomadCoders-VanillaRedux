import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = ({toDos}) => {
    /* useParams를 통해 id를 조회할 수도 있음 */
    const id = useParams().id;
    const toDo = toDos.find(toDo => toDo.id === parseInt(id));

    return (
        <>
            <h1>Detail</h1>
            <h5>{toDo?.text}</h5>
            <h5>Created at: {toDo?.id}</h5>
        </>
    )
}

/* mapStateToProps를 통해 가져온 state에서 id를 조회할 수도 있음*/
/* cf. react-router-dom 6버전 이상부터는 history, location, match 등의 props를 component에서 받을 수 없음*/
function mapStateToProps(state, ownProps) {
    return {toDos: state};
}

export default connect(mapStateToProps)(Detail);