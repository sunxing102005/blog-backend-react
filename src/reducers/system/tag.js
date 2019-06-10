import { GET_ALL_TAGS } from "../../actionTypes/tag";
const initState = {
    data: {}
};
const tagReducer = (state = initState, action) => {
    const type = action.type;
    switch (type) {
        case GET_ALL_TAGS:
            return Object.assign({}, state, { data: action.data });
        default:
            return state;
    }
};
export default tagReducer;
