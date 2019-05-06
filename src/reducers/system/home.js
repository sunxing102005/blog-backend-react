import { HOME_UPDATE_NAME } from "../../actionTypes/home";

const ACTION_HANDLERS = {
    // 更新首页信息
    [HOME_UPDATE_NAME]: (state, action) => {
        state.name = action.payload.name;
        return { ...state };
    }
};

const initialState = {
    name: "hello"
};

export default function(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
