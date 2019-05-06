import { combineReducers } from "redux";
import home from "./system/home";
import article from "./system/article";

export const rootReducer = asyncReducers => {
    return combineReducers({
        home,
        article
    });
};

export default rootReducer;
