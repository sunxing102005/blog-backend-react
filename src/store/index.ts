import rootReducer from "../reducers";
import { createStore, applyMiddleware, compose, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(preloadedState?: object): Store {
    return createStore(
        rootReducer(),
        preloadedState,
        composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
    );
}
