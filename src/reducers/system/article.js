import { SEARCH_LIST } from "../../actionTypes/article";

const initState = {
    data: {}
};
const articleReducer = (state = initState, action) => {
    const type = action.type;
    switch (type) {
        case SEARCH_LIST:
            return Object.assign({}, state, { data: action.data });
        default:
            return state;
    }
};
export default articleReducer;
