import { SEARCH_LIST } from "../../actionTypes/article";

const initState = {
    token: "",
    name: ""
};
const articleReducer = (state = initState, action) => {
    const type = action.type;
    switch (type) {
        case "SET_TOKEN":
            return Object.assign({}, state, { token: action.token });
        case "SET_NAME":
            return Object.assign({}, state, { token: action.name });
        default:
            return state;
    }
};
export default articleReducer;
