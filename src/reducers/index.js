import { combineReducers } from "redux";
import home from "./system/home";
import article from "./system/article";
import tag from "./system/tag";
export const rootReducer = asyncReducers => {
    return combineReducers({
        home,
        article,
        tag
    });
};

export default rootReducer;
