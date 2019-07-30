import {
    SEARCH_LIST,
    CHANGE_ARTICLE,
    CLEAR_ARTICLE,
    SET_TAGS
} from "../../actionTypes/article";
import service from "../../axios/service";
import { action } from "typesafe-actions";
export function getData(params) {
    return service({
        url: "/api/content1",
        method: "get",
        data: params
    });
}
export function fetchListData(params) {
    return dispatch => {
        return service({
            url: "/api/content",
            method: "get",
            data: params
        })
            .then(res => {
                if (res.data instanceof Array) {
                    dispatch(action(SEARCH_LIST, res));
                } else {
                    dispatch(
                        action(CHANGE_ARTICLE, {
                            ...res,
                            tag: res.tag.map(item => item.id)
                        })
                    );
                }
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
export function setTags(params) {
    return dispatch => {
        return service({
            url: "/api/meta",
            method: "get",
            data: params
        })
            .then(res => {
                dispatch(action(SET_TAGS, res));
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
export function articleChange(data) {
    return dispatch => {
        dispatch(action(CHANGE_ARTICLE, data));
    };
}
export function articleClear(data) {
    return dispatch => {
        dispatch(action(CLEAR_ARTICLE, data));
    };
}
