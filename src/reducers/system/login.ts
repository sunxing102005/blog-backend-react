import { ChatState } from "@/storeTypes/login";
import { loginTypes } from "@/storeTypes/login";
const initState: ChatState = {
    token: "",
    name: ""
};
const articleReducer = (state: ChatState = initState, action: loginTypes) => {
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
