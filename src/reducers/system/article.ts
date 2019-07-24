import {
    SEARCH_LIST,
    CHANGE_ARTICLE,
    CLEAR_ARTICLE,
    SET_TAGS
} from "../../actionTypes/article";
import {
    articleActionTypes,
    articleType,
    articleState
} from "../../storeTypes/article";
const initState: articleState = {
    data: {},
    singleArticle: {
        title: "",
        sign: "",
        thumb: "",
        date: null,
        status: "",
        tag: [],
        markdown: "",
        recommend: "",
        create_time: null
    },
    tags: []
};
const emptyArticle: articleType = {
    title: "",
    sign: "",
    thumb: "",
    date: null,
    status: "",
    tag: [],
    markdown: "",
    recommend: "",
    create_time: null
};
const articleReducer = (
    state: articleState = initState,
    action: articleActionTypes
) => {
    const type = action.type;
    switch (type) {
        case SEARCH_LIST:
            return Object.assign({}, state, { data: action.data });
        case CHANGE_ARTICLE: {
            const singleArticle = Object.assign({}, state.singleArticle, {
                ...action.data
            });
            return Object.assign({}, state, { singleArticle });
        }
        case CLEAR_ARTICLE:
            return Object.assign({}, state, {
                singleArticle: emptyArticle
            });
        case SET_TAGS:
            return Object.assign({}, state, { tags: action.data });
        default:
            return state;
    }
};
export default articleReducer;
